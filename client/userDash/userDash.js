import { URLToCheck } from '../../imports/api/urlsToCheck.js';
import { HostStatus } from '../../imports/api/hostStatus.js';
import { PingStatus } from '../../imports/api/pingStatus.js';
import { ConfigColl } from '../../imports/api/configColl.js';
 
Template.userDash.onCreated(function() {
    this.subscribe("urlChecks");
    this.subscribe("hostStatuses");
    this.subscribe("configSettings");
    this.subscribe("pingStatuses");
});

Template.userDash.onRendered(function() {
    
});

Template.userDash.helpers({
    totalURLs: function() {
        return URLToCheck.find().count();
    },
    upURLCount: function() {
        return HostStatus.find({ active: true, status: "Up" }).count();
    },
    downURLCount: function() {
        let downHosts = HostStatus.find({ active: true, status: { $ne: "Up" }}).count()
        if (downHosts == 0) {
            Session.set("downHosts", false);
        } else {
            Session.set("downHosts", true);
        }
        return downHosts;
    },
    downCardColor: function() {
        return Session.get("downHosts");
    },
});

Template.userDash.events({
    'click #totalUsersCard' (event) {
        event.preventDefault();

        // now show a template to give the Users info grid
    
    },
    'click #totalURLsCard' (event) {
        event.preventDefault();

        // now show a template to display all URLs in a grid
        // need to think about paging this, and / or filtering

    },
    'click #totalURLsUpCard' (event) {
        event.preventDefault();

        // now show the UP URLs List - again think about pagin
        // show URL - email of owner, and email to send a message to

    },
    'click #totalURLsDownCard' (event) {
        event.preventDefault();

        // now show the Down URLs list - and page it
        // show URL - email of owner, and email to send a message to

    },
});