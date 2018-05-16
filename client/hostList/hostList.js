import { URLToCheck } from '../../imports/api/urlsToCheck.js';
import { HostStatus } from '../../imports/api/hostStatus.js';

Template.hostList.onCreated(function() {
    this.subscribe("urlChecks");
    this.subscribe("hostStatuses");
});

Template.hostList.onRendered(function() {
    
});

Template.hostList.helpers({
    hostURL: function() {
        return URLToCheck.find({});
    },
    getStatus: function() {
        try {
            let url = this.url;

            let myHostStatus = HostStatus.findOne({ "url": url }, { sort: { "runOn": -1 }});
            let runOnDate = myHostStatus.runOn;
            if (runOnDate != "") {
                let momentOnDate = moment(runOnDate).format("MM/DD/YYYY HH:mm:ss");
                Session.set("lastRunOn", momentOnDate);
            } else {
                return "Not Run Yet.";
            }

            return myHostStatus;
        } catch (error) {
            console.log("Error in getStatus call: " + error);
        }
    },
    runOnDate: function() {
        return Session.get("lastRunOn");
    }
});

Template.hostList.events({

});
