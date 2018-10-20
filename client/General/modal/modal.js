import { HostStatus } from '../../../imports/api/hostStatus.js';
import { URLToCheck } from '../../../imports/api/urlsToCheck.js';
import { PingStatus } from '../../../imports/api/pingStatus.js';

Template.myModal.onCreated(function() {
    this.subscribe("allHostStatuses");
    this.subscribe("allURLsToCheck");
});

Template.myModal.onRendered(function() {
    $('.modal').modal();
});

Template.myModal.helpers({
    modalHeader: function() {
        return Session.get("modalHeader");
    },
    modalBody: function() {
        return Session.get("modalBody");
    }
});

Template.myModal.events({
    'click #continue' (event) {
        // event.preventDefault();
        // console.log("Clicked Continue.");

        let source = Session.get("modalFrom");
        let actionId = Session.get("actionId");

        switch (source) {
            case "deleteUser":
                Meteor.call("delete.User", actionId, function(err, result) {
                    if (err) {
                        console.log("Error deleting User: " + err);
                        showSnackbar("Error Removing User!", "red");
                    } else {
                        showSnackbar("User Successfully Removed!", "green");
                    }
                });
                break;
            case "deleteURL":
                Meteor.call("host.delete", actionId, function(err, result) {
                    if (err) {
                        console.log("Error deleting URL: " + err);
                        showSnackbar("Error Removing URL!", "red");
                    } else {
                        // now delete hostStatus info for this URL
                        console.log("Success on URL from URLToCheck.");
                        Meteor.call("hostStatus.deleteAll", actionId, function(err, result) {
                            if (err) {
                                console.log("Error deleting url statuses: " + err);
                                showSnackbar("Error Removing URL Statuses!",  "red");
                            } else {
                                // now remove the Ping Statuses as well.
                                console.log("Success on URL from HostStatus.");
                                Meteor.call("pingStatus.deleteAll", actionId, function(err, result) {
                                    if (err) {
                                        console.log("Error deleting Ping Statuses: " + err);
                                        showSnackbar("Error Removing URL Ping Statuses!", "red");
                                    } else {
                                        console.log("Success on URL from PingStatus");
                                    }
                                });
                            }
                        });
                        showSnackbar("URL Successfully Removed!", "green");
                    }
                });
                break;
            default:
                console.log("Action Passed Uknown: " + source + " with action id: " + actionId);
                showSnackbar("Couldn't Not Complete Action from " + source, "red");
        }

        var myCalledModal = document.getElementById('genModal');
        myCalledModal.style.display = 'none';
    },
    'click #cancel' (event) {
        event.preventDefault();

        var myCalledModal = document.getElementById('genModal');
        myCalledModal.style.display = 'none';
    },
});
