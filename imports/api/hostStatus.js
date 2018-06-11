import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { URLToCheck } from './urlsToCheck.js';

export const HostStatus = new Mongo.Collection('hostStatus');

HostStatus.allow({
    insert: function(userId, doc){
        // if use id exists, allow insert
        return !!userId;
    },
});

Meteor.methods({
    'hostStatus.add' (urlId, url, status, statusColor, nextRun) {
        check(urlId, String);
        check(url, String);
        check(status, String);
        check(statusColor, String);
        check(nextRun, String);

        let mine = URLToCheck.findOne({ _id: urlId });
        let me = mine.addedBy;

        // add the new findings
        return HostStatus.insert({
            urlId: urlId,
            url: url,
            status: status,
            statusColor: statusColor,
            nextRun: nextRun,
            active: true,
            runOn: new Date,
            runFor: me,
        });
    },
    'hostStatus.updateActive' (urlId) {
        check(urlId, String);

        return HostStatus.update({ urlId: urlId, active: true }, {
            $set: {
                active: false,
            }
        }, { multi: true });
    }
});