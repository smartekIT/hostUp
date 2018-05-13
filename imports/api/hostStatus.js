import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const HostStatus = new Mongo.Collection('hostStatus');

HostStatus.allow({
    insert: function(userId, doc){
        // if use id exists, allow insert
        return !!userId;
    },
});

Meteor.methods({
    'hostStatus.add' (url, status, statusColor) {
        check(url, String);
        check(status, String);
        check(statusColor, String);

        return HostStatus.insert({
            url: url,
            status: status,
            statusColor: statusColor,
            runOn: new Date,
        });
    }
});