import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const PingStatus = new Mongo.Collection('pingStatus');

PingStatus.allow({
    insert: function(userId, doc){
        // if use id exists, allow insert
        return !!userId;
    },
});

Meteor.methods({
    'pingCheck.add' (urlId, url, pingTime) {
        check(urlId, String);
        check(url, String);
        check(pingTime, String);

        let pingTimeSplit = (pingTime).split(' ');
        let newpingTime = parseFloat(pingTimeSplit[0]);

        let now = new Date();
        let runNow = moment(now).format("YYYY-MM-DD HH:MM:SS");

        return PingStatus.insert({
            urlId: urlId,
            url: url,
            pingTime: newpingTime,
            runOn: runNow,
        });
    },
    'pingStatus.deleteAll' (urlId) {
        check(urlId, String);

        if (!this.userId) {
            throw new Meteor.Error('User is not allowed to delete Ping Statuses from the system, make sure you are logged in.');
        }

        return PingStatus.remove({ urlId: urlId });
    },
});
