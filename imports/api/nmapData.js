import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const NmapData = new Mongo.Collection('nmapData');

NmapData.allow({
    insert: function(userId, doc){
        // if use id exists, allow insert
        return !!userId;
    },
});

Meteor.methods({
    'nmap.add' (urlId, url, data) {
        check(urlId, String);
        check(url, String);
        check(data, String);

        // let's see if we have a previous entry, and if so make it inactive, then add our new entry.

        return NmapData.insert({
            urlId: urlId,
            url: url,
            xmlnmapdata: data,
            addedOn: new Date(),
            active: true,
        });
    },
    'nmap.deletePrevious' (urlId) {

        return NmapData.remove({});
    },
});