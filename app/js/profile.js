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
    userInfo.ID = generateID();
    userInfo.Profile = null;
    userInfo.Type = "User";
    var newNode = firebase.database().Ref("Users").child(userInfo.ID);
    newNode.set(userInfo).then(function() {
        console.log("create new user successfully");
    }).catch(function(error) {
        console.log("fail to create new user");
        console.log(error);
    });
    console.log(userInfo);
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