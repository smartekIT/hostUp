import { URLToCheck } from '../imports/api/urlsToCheck.js';
import { ConfigColl } from '../imports/api/configColl.js';
import { HostStatus } from '../imports/api/hostStatus.js';
import { PingStatus } from '../imports/api/pingStatus.js';
import { Notify } from '../imports/api/notify.js';

Meteor.publish("urlChecks", function() {
    let me = Meteor.user().emails[0].address;

    return URLToCheck.find({ addedBy: me });
});

Meteor.publish("hostStatuses", function() {
    let myUser = Meteor.user().emails[0].address;
    
    return HostStatus.find({ runFor: myUser, active: true });

});

Meteor.publish("pingStatuses", function(myUrl) {
    return PingStatus.find({ url: myUrl }, {sort: { runOn: -1 }, limit: 1000 });
});

Meteor.publish("configSettings", function() {
    let isAdmin = Roles.userIsInRole(this.userId, 'Admin');

    if (isAdmin) {
        console.log("Is Admin");
        return ConfigColl.find({});
    } else {
        console.log("Is Not Admin!!!");
        return ConfigColl.find({}, { fields: { maxNoOfSitesFree: 1, defaultFreq: 1 }});
    }
});

Meteor.publish("myNotifications", function() {
    let myUser = Meteor.user().emails[0].address;

    return Notify.find({ ownerEmail: myUser, read: false });
});