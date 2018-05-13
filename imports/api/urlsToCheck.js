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
    'host.add' (url, timeBetweenChecks, emailIfDown, emailAddress) {
        check(url, String);
        check(timeBetweenChecks, Number);
        check(emailIfDown, Boolean);
        check(emailAddress, String);

        // if (!this.userId) {
        //     throw new Meteor.Error('User is not allowed to add URLs to the system, make sure you are logged in.');
        // }

        return URLToCheck.insert({
            url: url,
            freqCheck: timeBetweenChecks,
            emailIfDown: emailIfDown,
            emailAddress: emailAddress,
        });
    },
    'host.edit' (urlId, url, timeBetweenChecks, emailIfDown, emailAddress, emailRepeat, emailRepeatHowOften) {

    },
    // ******************************************************************
    //
    //  Remove URLs
    //
    // ******************************************************************
    'host.delete' (urlId) {
        check(urlId, String);

        // if (!this.userId) {
        //     throw new Meteor.Error('User is not allowed to remove URls from the system, make sure you are logged in..');
        // }

        return URLToCheck.remove({ _id: urlId });
    },
});