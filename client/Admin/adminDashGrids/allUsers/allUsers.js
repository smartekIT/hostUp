import { HostStatus } from '../../../../imports/api/hostStatus.js';
import { URLToCheck } from '../../../../imports/api/urlsToCheck.js';

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
    'change .adminUserActions' (event) {
        event.preventDefault();
        let selAction = event.currentTarget.value;
        // console.log("Selected action is: " + selAction);
        // console.log("-------------------------------");

        if (selAction == 'Delete') {
            let userId = this._id;
            console.log("User Id selected is: " + userId);
            
            Session.set('modalHeader', "Delete User");
            Session.set('modalBody', "You are about to delete a user. This cannot be undone once complete. If you wish to continue with this action, click 'Continue' below, otherwise click 'Cancel'.");
            Session.set('actionId', userId);
            Session.set('modalFrom', "deleteUser");
            
            var myCalledModal = document.getElementById('genModal');
            myCalledModal.style.display = 'block';
        } else if (selAction == 'Edit') {

        } else if (selAction == 'Send Email') {

        }
    },
});