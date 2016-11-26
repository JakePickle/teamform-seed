var profileApp = angular.module('teamform-profile-app', ['firebase']);

profileApp.controller('ProfileCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {

    initializeFirebase();

    $scope.uid = "";
    $scope.username = "";
    $scope.email = "";
    $scope.languages;
    $scope.country;
    $scope.city;

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

    $scope.uid = getCookie("uid");
    $scope.loadFunc();


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





    $scope.createNewUser = function()
    {
        var userInfo = groupFormValues();
        userInfo.EventOn = [];
        userInfo.EventOff = [];
        userInfo.History = [];
        //userInfo.ID = generateID();
        userInfo.Profile = null;
        userInfo.Type = "User";


        var refPath = "Users/" + getURLParameter("q") + $scope.uid;
        var ref = firebase.database().ref(refPath);

        ref.set(userInfo, function(){
            var search = new Search();
            search.indexNewUser(userInfo, ref);
            console.log("create new user successfully!");
            window.location.href= "dashboard.html";
        }).catch(function(error) {
            console.log("fail to create new user");
            console.log(error);
        });

        /*firebase.database().ref("Users").push(userInfo).then(function(userRef) {
            var search = new Search();
            search.indexNewUser(userInfo, userRef);
            console.log("create new user successfully!");
        }).catch(function(error) {
            console.log("fail to create new user");
            console.log(error);
        });*/
    }

    function groupFormValues()
    {
        var form = {};

        form.Name = $('#username').val();
        form.Email = $('#email').val();
        form.Gender = $('input[name=gender]:checked').val();
        form.Birthday = new Date($('#birthday').val()).getTime();
        //form.Languages = $('#language').val().split(/\W+/).filter(Boolean);//deprecated
        form.Languages = $scope.languages;
        //form.Country = $('input[name=country]').val();//deprecated
        //form.City = $('input[name=city]').val();//deprecated
        form.country = $scope.country;
        form.city = $scope.city;
        form.Education = $('input[name=education]:checked').val();
        form.Skills = $('#skill').val().split(/[^\w+|C\+\+]/).filter(Boolean);
        form.Introduction = $('#introduction').val();

        return form;
    }
}]);

// Frontend Validation Functions
// validate username
profileApp.directive('usernameDirective', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function usernameValidation(value) {
                if (value.length >= 5 && value.length <= 20 && /^[a-zA-Z0-9-_]*$/.test(value)) {
                    mCtrl.$setValidity('charE', true);
                } else {
                    mCtrl.$setValidity('charE', false);
                }
                return value;
            }
            mCtrl.$parsers.push(usernameValidation);
        }
    };
});
// validate city
profileApp.directive('cityDirective', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function cityValidation(value) {
                if (value.length > 1 && /^[a-zA-Z ]*$/.test(value)) {
                    mCtrl.$setValidity('charE', true);
                } else {
                    mCtrl.$setValidity('charE', false);
                }
                return value;
            }
            mCtrl.$parsers.push(cityValidation);
        }
    };
});
// validate introduction
profileApp.directive('introductionDirective', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function introductionValidation(value) {
                if (value.length <= 200) {
                    mCtrl.$setValidity('charE', true);
                } else {
                    mCtrl.$setValidity('charE', false);
                }
                return value;
            }
            mCtrl.$parsers.push(introductionValidation);
        }
    };
});

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
