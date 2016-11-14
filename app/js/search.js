/*
    version: 1.0
    Modified date: 2016/11/14
    Author: Cao Shuyang(Lawrence)
    Description: The module is implemented for fuzzy search, advanced search and autocomplete.
                 This module assumes that firebase SDK has been referred  in a webpage.
*/


//
// Calculate the Edit Distance between two strings
// Reference: https://en.wikipedia.org/wiki/Edit_distance
// Instead of using a 2D matrix, this implemention use a 1D array to iterate a.length+1 times
// This will save space, hence, save the space allocation time.
//
function editDistance(a, b)
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
function extractWord(paragraph)
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
    arr = uniqueArray(arr);
    return arr;
}

//
// Unique an array, which must be sorted before this function is invoked
//
function uniqueArray(arr)
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