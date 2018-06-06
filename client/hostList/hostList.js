import { URLToCheck } from '../../imports/api/urlsToCheck.js';
import { HostStatus } from '../../imports/api/hostStatus.js';
import { PingStatus } from '../../imports/api/pingStatus.js';

Template.hostList.onCreated(function() {
    this.subscribe("urlChecks");
    this.subscribe("hostStatuses");

    this.autorun(() => {
        this.subscribe("pingStatuses", Session.get("myUrl"));
    });
});

Template.hostList.onRendered(function() {
    $('.collapsible').collapsible();
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
            if (typeof runOnDate != 'undefined' && runOnDate != "" && runOnDate != null) {
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
    },
    pingVis: function() {
        return Session.get("pingVis");
    }
});

Template.hostList.events({
    'click .editHost' (event) {
        event.preventDefault();

        Session.set("urlId", this._id);
        Session.set("editUrl", this.url);
        Session.set("freq", this.freqCheck);
        Session.set("emailIfDown", this.emailIfDown);
        Session.set("emailAddress", this.emailAddress);

        // console.log("emailIfDown: " + emailIfDown);

        Session.set("inputMode", "edit");

        FlowRouter.go('/hostInput');
    },
    'click .deleteHost' (event) {
        event.preventDefault();

        let hostId = this._id;
        // console.log("Host id: " + hostId);
        
        Meteor.call('host.delete', hostId, function(err, result){
            if (err) {
                console.log("Error deleting host: " + err);
                showSnackbar("Error Deleting Host", "red");
            } else {
                showSnackbar("Host Deleted Successfully!", "green");
            }
        });
    },
    'click .getPingInfo' (event) {
        Session.set("myUrl", this.url);
        Materialize.updateTextFields();
        let thisId = this._id;

        // console.log('This URL is: ' + this.url);
        // console.log("-------- !!!!!!!!!!! -------------");

        let pingObj = [];

        pullPings(pingObj);
 
    },
});

pullPings = function(pingObj) {
    let pingTimes = PingStatus.find({}).fetch();
    // console.dir(pingTimes);
    setTimeout(function() {
        let modalPing = document.getElementById('modal-ping');
        modalPing.style.display = "block";
    }, 250);
}
