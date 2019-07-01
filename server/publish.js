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
    
    // return HostStatus.find({ runFor: myUser, active: true });
    // return HostStatus.find({ runFor: myUser });
    return HostStatus.find({ 
        "runOn" : { 
          $lt: new Date(), 
          $gte: new Date(new Date().setDate(new Date().getDate()-1))
        },
        "runFor": myUser
      });
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
 
Meteor.publish("allUsers", function() {
    if (Roles.userIsInRole(this.userId, 'Admin')) {
        return Meteor.users.find({});
    }
});

Meteor.publish("allURLsToCheck", function() {
    if (Roles.userIsInRole(this.userId, 'Admin')) {
        return URLToCheck.find({});
    }
});

Meteor.publish("allHostStatuses", function() {
    if (Roles.userIsInRole(this.userId, 'Admin')) {
        return HostStatus.find({ active: true });
    }
});