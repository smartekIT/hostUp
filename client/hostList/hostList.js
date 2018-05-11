import { URLToCheck } from '../../imports/api/urlsToCheck.js';

Template.hostList.onCreated(function() {
    this.subscribe("urlChecks");
});

Template.hostList.onRendered(function() {

});

Template.hostList.helpers({
    hostURL: function() {
        console.log("Testing this function");
        
        return "Testing this";
    }
});

Template.hostList.events({

});