angular.module('teamform-profile-app', ['firebase'])
.controller('ProfileCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {

    initializeFirebase();

    $scope.uid = "";
    $scope.username = "";
    $scope.email = "";

    $scope.loadFunc = function() {
        if($scope.uid != "")
        {
            var refPath = "Users/" + getURLParameter("q") + $scope.uid;
            retrieveOnceFirebase(firebase, refPath, function(data) {
                                
                if ( data.child("name").val() != null ) {
                    $scope.username = data.child("name").val();
                } else {
                    $scope.username = "";
                }

                if ( data.child("email").val() != null ) {
                    $scope.email = data.child("email").val();
                } else {
                    $scope.email = "";
                }

                $scope.$apply();
            });
        }  
    }

    function getCookie(cname) { //Copied from w3schools.com
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    $scope.uid = getCookie("uid");
    $scope.loadFunc();
}]);


/*
    version: 1.0
    Last modified date: 2016/11/15
    Author: Cao Shuyang(Lawrence)
    Description: The module is implemented for register.
                 This module assumes that firebase SDK has been referred  in a webpage.
                 This module assumes that jQuery has been referred in a webpage.
*/

//
// Create new user on database
// User's image is null defaultly now.
//

function createNewUser()
{
    var userInfo = groupFormValues();
    userInfo.EventOn = [];
    userInfo.EventOff = [];
    userInfo.History = [];
    //userInfo.ID = generateID();
    userInfo.Profile = null;
    userInfo.Type = "User";
    firebase.database().ref("Users").push(userInfo).then(function(userRef) {
        var search = new Search();
        search.indexNewUser(userInfo, userRef);
        console.log("create new user successfully!");
    }).catch(function(error) {
        console.log("fail to create new user");
        console.log(error);
    });
}

function groupFormValues()
{
    var form = {};
    
    form.Name = $('#username').val();
    form.Email = $('#email').val();
    form.Gender = $('input[name=gender]:checked').val();
    form.Birthday = new Date($('#birthday').val()).getTime();
    form.Languages = $('#language').val().split(/\W+/).filter(Boolean);
    form.Country = $('input[name=country]').val();
    form.City = $('input[name=city]').val();
    form.Education = $('input[name=education]:checked').val();
    form.Skills = $('#skill').val().split(/[^\w+|C\+\+]/).filter(Boolean);
    form.Introduction = $('#introduction').val();
    
    return form;
}

//
// Generate unique ID for new users, new events, new teams
//
var ID_scale = Math.pow(10,20);
function generateID()
{
    return Math.floor(Math.random() * ID_scale).toString();
}

/*
//
// This function is used to auto complete form for debug when page is loaded
//
$(document).ready(function() {
    function autoFillForm()
    {
        $('#username').val("Cao Shuyang");
        $('#email').val("demo@example.com");

        //$('input[name=gender]:checked').val();
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var date = today.getDate();
        $('#birthday').val(year+'-'+month+'-'+date);
        $('#language').val('Chinese, English');
        $('input[name=country]').val('China');
        $('input[name=city]').val('Beijing');
        
        //$('input[name=education]:checked').val();
        
        $('#skill').val('Java,C,C++');

        $('#introduction').val('A test and dumb introduction');
    }
    autoFillForm();
});
*/