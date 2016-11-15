/*
    version: 2.0
    Last modified date: 2016/11/15
    Author: Cao Shuyang(Lawrence)
    Description: The module is implemented for fuzzy search, advanced search and autocomplete.
                 This module assumes that firebase SDK has been referred  in a webpage.
                 This module assumes that jQuery has been referred in a webpage.
*/

//
// Declare the namespace for this module
//
function Search()
{
    this.configure();
    this.initializeFirebase();
}

//
// Initialize some firebase properties of Search
//
Search.prototype.initializeFirebase = function()
{
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();
}

//
// Configure Search arguments
//
Search.prototype.configure = function()
{
    this.diffTolerance = 3;
}

//
// Calculate the Edit Distance between two strings
// Reference: https://en.wikipedia.org/wiki/Edit_distance
// Instead of using a 2D matrix, this implemention use a 1D array to iterate a.length+1 times
// This will save space, hence, save the space allocation time.
//
Search.prototype.editDistance = function(a, b)
{
    if(a.length == 0) return b.length;
    if(b.length == 0) return a.length;

    var iter_len = b.length + 1;
    var iter_arr = new Array(iter_len);
    var iter_arr_tmp = new Array(iter_len);
    for(let i=0; i<iter_arr.length; ++i)    //initialize the iter_arr
        iter_arr[i] = i;
    
    var tmp = null;
    for(let i =1; i<=a.length; ++i)
    {
        iter_arr_tmp[0] = i;
        for(let j=1; j<=b.length; ++j)
        {
            if(a.charAt(i-1) == b.charAt(j-1))
                iter_arr_tmp[j] = iter_arr[j-1];
            else {
                iter_arr_tmp[j] = Math.min(iter_arr[j-1]+1, Math.min(iter_arr_tmp[j-1]+1, iter_arr[j]+1));
            }
        }
        tmp = iter_arr_tmp;
        iter_arr_tmp = iter_arr;
        iter_arr = tmp;
    }
    return iter_arr[b.length];
}

//
// Extrate words from a text, return an array
// The parameter is assumed to be a string, the elements in the returned array are all in lowercase
//
Search.prototype.extractWord = function(paragraph)
{
    // break paragraph into words
    var arr = paragraph.split(/\W+/);
    // strip every words and convert them into lowercase
    arr.forEach(function(val) {
        val = val.trim().toLowerCase();
    });
    // filter the empty string;
    arr = arr.filter(function(val) {
        return (val && val.length!=0);
    });
    arr.sort();
    arr = this.uniqueArray(arr);
    return arr;
}

//
// Unique an array, which must be sorted before this function is invoked
//
Search.prototype.uniqueArray = function(arr)
{
    var tmp_arr = [];
    var precedent = null;
    for(let val of arr)
    {
        if(val == precedent)
            continue;
        precedent = val;
        tmp_arr.push(val);
    }
    return tmp_arr;
}

//
// Fuzzy Search
//
Search.prototype.fuzzySearch = function(searchSentence)
{
    // break search sentence into words
    var that = this;
    var words = this.extractWord(searchSentence);

    var queryList = this.database.ref('index').orderByKey();
    queryList.once("value").then(function(snapshot) {
        var matchRefs = [];
        snapshot.forEach(function(childSnapshot) {
            var dist = that.matchSearchWords(childSnapshot.key, words);
            if(dist < that.diffTolerance)
            {
                for(let item of childSnapshot.val())
                    matchRefs.push(item);
            }
        });
        var matchPaths = that.reduceList(matchRefs);
        matchPaths.sort(function(a, b) {return b.count - a.count});
        var LoadingData = matchPaths.map(function(value) {
            return that.database.ref(value.Path).once('value').then(function(dataRef){return dataRef.val();});
        });
        Promise.all(LoadingData).then(function(data_arr) {
            that.renderSearchResult(data_arr);
        });
    });
}

//
// A helper function for fuzzySearch to determine whether JSON key matched with search words.
// This function return the minimum distance between key and all of search words
//
Search.prototype.matchSearchWords = function(key, words)
{
    var minDistance = 100000;   // Initialize the distance to a larger enough number
    for(let word of words)
        minDistance = Math.min(minDistance, this.editDistance(key, word));
    
    return minDistance;
}

//
// A helper function for fuzzySearch to reduce a map from word-array to a result list
//
Search.prototype.reduceList = function(matchRefs)
{
    var resultObj = {};
    for(let path of matchRefs)
    {
        if(resultObj.hasOwnProperty(path))
        {
            resultObj[path].count += 1;
        }else {
            resultObj[path] = {"Path": path, "count": 1};
        }
    }
    var resultList = Object.keys(resultObj).map(function(value) {return resultObj[value];});
    return resultList;
}

//
// Render the search results in search Result area
//
Search.prototype.renderSearchResult = function(resultArr)
{
    $(".recommendationView").hide();
    $(".searchResultView").show();
    $(".searchResultView").empty();
    var parent = $(".searchResultView");

    for(let result of resultArr)
    {
        let renderResult = null;
        switch(result.Type)
        {
            case "Team": renderResult = this.renderTeamElement(result); break;
            case "Event": renderResult = this.renderEventElement(result); break;
            default: renderResult = null;
        }
        if(renderResult)
            parent.append(renderResult);
    }
}

//
// Render team elements
//
Search.prototype.renderTeamElement = function(teamObj)
{
    var divEle = $("<div></div>").addClass("col-sm-offset-1 col-xs-11");
    divEle.append($("<h3></h3>").html(teamObj.EventName + "/" + teamObj.Name));
    divEle.append($("<p></p>").text(teamObj.Introduction).append($("<br/>")));
    divEle.append($("<p></p>").html('<span>Event Time:</span><span>Current Team Size: &nbsp;<span class="badge">' + teamObj.Members.length +'</span></span>'));

    var teamElement = divEle.wrap("<div></div>").addClass("row pendingTeam").wrap("<a></a>").attr("href", "teaminfo.html").wrap("<div></div>").addClass("teams");
    return teamElement;
}

//
// Render event elements
//
Search.prototype.renderEventElement = function(eventObj)
{
    var divEle = $("<div></div>").addClass("col-sm-offset-1 col-xs-11");
    divEle.append($("<h3></h3>").html(eventObj.Name));
    divEle.append($("<p></p>").text(eventObj.Introduction).append($("<br/>")));
    var eventTime = new Date(eventObj.Time);
    divEle.append($("<p></p>").html('Event Time: ' + eventTime.toLocaleDateString() + ' ' + eventTime.toLocaleTimeString() ));

    var eventElement = divEle.wrap("<div></div>").addClass("row openEvent").wrap("<a></a>").attr("href", "eventinfo.html").wrap("<div></div>").addClass("events");
    return eventElement;
}