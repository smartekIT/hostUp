import { Notify } from '../../../imports/api/notify.js';

Template.notificationList.onCreated(function() {
    this.subscribe("myNotifications");
});

Template.notificationList.onRendered(function() {

});

Template.notificationList.helpers({
    notifications: function() {
        return Notify.find({});
    },
});

Template.notificationList.events({
    'click .myModalClose, click .clearAndClose' (event) {
        event.preventDefault();

        Meteor.call('mark.notificationAsRead', function(err, result) {
            if (err) {
                console.log("Error marking notifications read: " + err);
                showSnackbar("Unable to Mark Notifications Read! Please Try Again.", "red");
            } else {
                showSnackbar("Notifications Marked Read!", "green");
                let modalNotify = document.getElementById('modal-notify');
                modalNotify.style.display = "none";
            }
        });
    },
});