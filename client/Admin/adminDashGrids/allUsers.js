import { HostStatus } from '../../../imports/api/hostStatus.js';
import { URLToCheck } from '../../../imports/api/urlsToCheck.js';

Template.allUsers.onCreated(function() {
    this.subscribe('allUsers');
    this.subscribe("allHostStatuses");
    this.subscribe("allURLsToCheck");
});

Template.allUsers.onRendered(function() {
    $("select").material_select();
});

Template.allUsers.helpers({
    userInfo: function() {
        return Meteor.users.find();
    },
    userEmail: function() {
        let userId = this._id;
        let emailname = Meteor.users.findOne({ _id: userId }).emails[0].address;
        Session.set("thisEmail", emailname);
        return emailname;
    },
    noUrls: function() {
        let userId = this._id;
        let userEmail = Meteor.users.findOne({ _id: userId }).emails[0].address;
        return URLToCheck.find({ addedBy: userEmail }).count();
    },
    upUrls: function() {
        let userId = this._id;
        let userEmail = Meteor.users.findOne({ _id: userId }).emails[0].address;
        return HostStatus.find({ runFor: userEmail, active: true, status: "Up" }).count();
    },
    downUrls: function() {
        let userId = this._id;
        let userEmail = Meteor.users.findOne({ _id: userId }).emails[0].address;
        return HostStatus.find({ runFor: userEmail, active: true, status: { $ne: "Up" }}).count();
    },
});

Template.allUsers.events({

});