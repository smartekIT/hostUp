import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const URLToCheck = new Mongo.Collection('urlToCheck');

URLToCheck.allow({
    insert: function(userId, doc){
        // if use id exists, allow insert
        return !!userId;
    },
});

Meteor.methods({
    // ******************************************************************
    //
    //  Add URLs to Check
    //
    // ******************************************************************
    'newUrl.add' (url, timeBetweenChecks, emailIfDown, emailAddress, emailRepeat, emailRepeatHowOften) {

    },
    'url.edit' (urlId, url, timeBetweenChecks, emailIfDown, emailAddress, emailRepeat, emailRepeatHowOften) {

    },
    'url.delete' (urlId) {

    },
});