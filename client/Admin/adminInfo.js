import { URLToCheck } from '../../imports/api/urlsToCheck.js';
import { HostStatus } from '../../imports/api/hostStatus.js';
import { PingStatus } from '../../imports/api/pingStatus.js';
import { ConfigColl } from '../../imports/api/configColl.js';
 
Template.adminInfo.onCreated(function() {
    this.subscribe("allURLsToCheck");
    this.subscribe("allHostStatuses");
    this.subscribe("configSettings");
    this.subscribe("allUsers");
});

Template.adminInfo.onRendered(function() {
    
});

Template.adminInfo.helpers({
    totalNoUsers: function() {
        return Meteor.users.find().count();
    },
    totalURLs: function() {
        return URLToCheck.find().count();
    },
    upURLCount: function() {
        return HostStatus.find({ status: "Up" }).count();
    },
    downURLCount: function() {
        return HostStatus.find({ status: { $ne: "Up" }}).count()
    },
});

Template.adminInfo.events({

});
