import { HostStatus } from '../../../../imports/api/hostStatus.js';
import { URLToCheck } from '../../../../imports/api/urlsToCheck.js';

Template.allUrls.onCreated(function() {
    this.subscribe('allUsers');
    this.subscribe("allHostStatuses");
    this.subscribe("allURLsToCheck");
});

Template.allUrls.onRendered(function() {
    $("select").material_select();
});

Template.allUrls.helpers({
    URLStatus: function() {
        return HostStatus.find({ active: true }, { sort: { runFor: 1 }});
    },
});

Template.allUrls.events({
    'change .adminUrlActions' (event) {
        event.preventDefault();
        let selAction = event.currentTarget.value;

        if (selAction == "Delete") {
            // now we need to first delete the URLToCheck from the collection,
            // then we need to delete all of the host Statuses and Ping Statuses
            // from those collections

            let urlId = this.urlId;

            Session.set('modalHeader', "Delete URL");
            Session.set('modalBody', "You are about to delete a URL. This cannot be undone once complete. If you wish to continue with this action, click 'Continue' below, otherwise click 'Cancel'.");
            Session.set('actionId', urlId);
            Session.set('modalFrom', "deleteURL");
            
            var myCalledModal = document.getElementById('genModal');
            myCalledModal.style.display = 'block';
            
        } else if (selAction == "Edit") {

        } else if (selection == "Email Owner") {

        } else {
            showSnackbar("You Selection was not recognized! Please Try Again!");
        }
    },
});

deleteURL = function(actionId) {
    Meteor.call('host.delete', actionId, function(err, result) {
        if (err) {
            console.log("Error deleting host with Id: " + actionId + " - " + err);
            showSnackbar("Error Deleting Host URL!", "red");
        } else {
            showSnackbar("Host Deleted Successfully!", "green");
            // I should add something here to email the owner of the host URL and let them
            // know an admin deleted it.
        }
    });
}