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
    'new.config' (emailHost, emailUser, emailPassword, emailSmtpServer,emailSmtpPort) {

    },
    'edit.config' (configId, emailHost, emailUser, emailPassword, emailSmtpServer,emailSmtpPort) {

    },
    'delete.config' (collId) {

    },
});