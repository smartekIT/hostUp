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

            let thisHostStatus = {};

            let myHostStatus = HostStatus.findOne({ "url": url }, { sort: { "runOn": -1 }});
            let runOnDate = myHostStatus.runOn;
            if (runOnDate != "" && runOnDate != null) {
                var momentOnDate = moment(runOnDate).format("MM/DD/YYYY HH:mm:ss");
                Session.set("lastRunOn", momentOnDate);
            } else {
                return "Not Run Yet.";
                Session.set("lastRunOn", "");
            }

            if (myHostStatus.nextRun != "") {
                var nextRunAt = moment(myHostStatus.nextRun).format("MM/DD/YYYY HH:mm:ss");
                Session.set("nextRunOn", nextRunAt);
            } else {
                nextRunAt = "";
                Session.set("nextRunOn", nextRunAt);
            }

            thisHostStatus.lastRunOn = momentOnDate;
            thisHostStatus.nextRunOn = nextRunAt;
            thisHostStatus.status = myHostStatus.status;
            thisHostStatus.statusColor = myHostStatus.statusColor;

            return thisHostStatus;
        } catch (error) {
            console.log("Error in getStatus call: " + error);
        }
    },
    runOnDate: function() {
        return Session.get("lastRunOn");
    },
    nextRunIs: function() {
        return Session.get("nextRunOn");
    }
});

Template.hostList.events({
    'click .editHost' (event) {
        event.preventDefault();

    },
    'click .deleteHost' (event) {
        event.preventDefault();

        let hostId = this._id;
        // console.log("HOst id: " + hostId);
        
        Meteor.call('host.delete', hostId, function(err, result){
            if (err) {
                console.log("Error deleting host: " + err);
                showSnackbar("Error Deleting Host", "red");
            } else {
                showSnackbar("Host Deleted Successfully!", "green");
            }
        });
    }
});
