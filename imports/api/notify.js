import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { URLToCheck } from './urlsToCheck.js';

export const Notify = new Mongo.Collection('notify');

Notify.allow({
    insert: function(userId, doc){
        // if use id exists, allow insert
        return !!userId;
    },
});

Meteor.methods({
    'add.notification' (urlId, ownerEmail, issue) {
        check(urlId, String);
        check(ownerEmail, String);
        check(issue, String);
        
        Notify.insert({
            urlId: urlId,
            ownerEmail: ownerEmail,
            issue: issue,
            read: false,
            issueFirstFoundOn: new Date(),
        });
    },
    'mark.notificationAsRead' (NotifyId) {
        check(NotifyId, String);

        Notify.update({ _id: NotifyId }, {
            $set: {
                read: true,
            }
        });
    },
});