import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { HostStatus } from './hostStatus.js';

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

        if (!this.userId) {
            throw new Meteor.Error('User is not allowed to add URLs to the system, make sure you are logged in.');
        }

        return URLToCheck.insert({
            url: url,
            freqCheck: timeBetweenChecks,
            emailIfDown: emailIfDown,
            emailAddress: emailAddress,
            addedBy: Meteor.user().emails[0].address,
        });
    },
    // ******************************************************************
    //
    //  Edit URLs to check
    //
    // ******************************************************************
    'host.edit' (urlId, url, timeBetweenChecks, emailIfDown, emailAddress, emailRepeat, emailRepeatHowOften) {
        check(urlId, String);
        check(url, String);
        check(timeBetweenChecks, Number);
        check(emailIfDown, Boolean);
        check(emailAddress, String);

        if (!this.userId) {
            throw new Meteor.Error('User is not allowed to edit URLs to the system, make sure you are logged in.');
        }

        return URLToCheck.update({ _id: urlId }, {
            $set: {
                url: url,
                freqCheck: timeBetweenChecks,
                emailIfDown: emailIfDown,
                emailAddress: emailAddress,
                updatedBy:  Meteor.user().emails[0].address,
            }
        });
    },
    // ******************************************************************
    //
    //  Remove URLs
    //
    // ******************************************************************
    'host.delete' (urlId) {
        check(urlId, String);

        if (!this.userId) {
            throw new Meteor.Error('User is not allowed to remove URls from the system, make sure you are logged in..');
        }

        // first we delete all of the statuses for this host - get rid of db clutter
        HostStatus.remove({ urlId: urlId }, { multi: true});

        // now we return and get rid of the host entry itself
        return URLToCheck.remove({ _id: urlId });
    },
});
