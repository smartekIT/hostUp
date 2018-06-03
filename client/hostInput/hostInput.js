import { URLToCheck } from '../../imports/api/urlsToCheck.js';

Template.hostInput.onCreated(function() {
    this.subscribe("urlChecks");
});

Template.hostInput.onRendered(function() {

});

Template.hostInput.helpers({

});

Template.hostInput.events({
    'click #submitURL' (event) {
        event.preventDefault();

        let url = $("#urlToCheck").val();
        let often = $("#checkFrequency").val();
        let emailIsDown = $('#emailIfDown').prop('checked')
        let emailAddress = $("#emailAddress").val();

        // console.log(("Email If down if: " + emailIfDown));
        
        if (url == "" || url == null) {
            showSnackbar("URL is Required!", "red");
            return;
        } else if (emailIsDown == true) {
            if (emailAddress == "" || emailAddress == null) {
                showSnackbar("Email Address is Required!"), "red";
                return;
            }
        }
        
        if (often == "" || often == null) {
            often = 20;
        } else {
            often = parseInt(often);
        }

        Meteor.call("host.add", url, often, emailIsDown, emailAddress, function(err, result) {
            if (err) {
                console.log("Error adding host url: " + err);
                showSnackbar("Error Adding Host!", "red");
            } else {
                showSnackbar("Host Added Successfully!", "green");
                Meteor.call("hosts.call", url, often);
            }
        });
    },
});