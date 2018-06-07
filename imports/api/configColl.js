import { Meter } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const ConfigColl = new Mongo.Collection('configColl');

ConfigColl.allow({
    insert: function(userId, doc){
        // if use id exists, allow insert
        return !!userId;
    },
});

Meteor.methods({
    'new.config' (emailHost, emailUser, emailPassword, emailSmtpServer, emailSmtpPort, minTimeFreeUser, maxNoOfSitesFree, allowChooseFreq, defaultFreq) {
        check(emailHost, String);
        check(emailUser, String);
        check(emailPassword, String);
        check(emailSmtpServer, String);
        check(emailSmtpPort, String);
        check(minTimeFreeUser, Number);
        check(maxNoOfSitesFree, Number);
        check(allowChooseFreq, Boolean);
        check(defaultFreq, Number);

        if (!this.userId) {
            throw new Meteor.Error('User is not allowed to setup admin values, make sure you are logged in.');
        }

        return ConfigColl.insert({
            emailHost: emailHost,
            emailUser: emailUser,
            emailPassword: emailPassword,
            emailSmtpServer: emailSmtpServer,
            emailSmtpPort: emailSmtpPort,
            minTimeFreeUser: minTimeFreeUser,
            maxNoOfSitesFree: maxNoOfSitesFree,
            allowChooseFreq: allowChooseFreq,
            defaultFreq: defaultFreq,
            addedOn: new Date(),
            addedBy: Meteor.user().emails[0].address,
        });
    },
    'edit.config' (configId, emailHost, emailUser, emailPassword, emailSmtpServer,emailSmtpPort, minTimeFreeUser, maxNoOfSitesFree, allowChooseFreq, defaultFreq) {

    },
    'delete.config' (collId) {

    },
});