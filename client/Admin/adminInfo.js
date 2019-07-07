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
    Session.set("adminDashGridView", "");
    $(".tooltipped").tooltip();
});

Template.adminInfo.helpers({
    totalNoUsers: function() {
        return Meteor.users.find().count();
    },
    totalURLs: function() {
        return URLToCheck.find().count();
    },
    upURLCount: function() {
        return HostStatus.find({ active: true, status: "Up" }).count();
    },
    downURLCount: function() {
        let downHosts = HostStatus.find({ active: true, status: { $ne: "Up" }}).count()
        if (downHosts == 0) {
            Session.set("down", false);
        } else {
            Session.set("down", true);
        }
        return downHosts;
    },
    downColor: function() {
        return Session.get("down");
    },
    adminDashGrid: function() {
        return Session.get("adminDashGridView");
    },
});

Template.adminInfo.events({
    'click #totalUsersCard' (event) {
        event.preventDefault();

        // now show a template to give the Users info grid
        Session.set("adminDashGridView", "userInfo");
    },
    'click #totalURLsCard' (event) {
        event.preventDefault();

        // now show a template to display all URLs in a grid
        // need to think about paging this, and / or filtering

        Session.set("adminDashGridView", "allUrls")

    },
    'click #totalURLsUpCard' (event) {
        event.preventDefault();

        // now show the UP URLs List - again think about paging
        // show URL - email of owner, and email to send a message to

        Session.set("adminDashGridView", "allUpUrls");
    },
    'click #totalURLsDownCard' (event) {
        event.preventDefault();

        // now show the Down URLs list - and page it
        // show URL - email of owner, and email to send a message to

        Session.set("adminDashGridView", "allDownUrls");
    },
});
