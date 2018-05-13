import { URLToCheck } from '../../imports/api/urlsToCheck.js';
import { HostStatus } from '../../imports/api/hostStatus.js';

Template.hostList.onCreated(function() {
    this.subscribe("urlChecks");
    this.subscribe("hostStatuses");
    Session.set("runOn", "");
});

Template.hostList.onRendered(function() {
    
});

Template.hostList.helpers({
    hostURL: function() {
        return URLToCheck.find({});
    },
    getStatus: function() {
        let url = this.url;

        let hostStatus = HostStatus.findOne({ url: url }, {sort: {runOn: -1, limit: 1 }});
        Session.set("runOn", hostStatus.runOn);
        return hostStatus;
    },
    lastRunOn: function() {
        let url = this.url;
        let hostStatus = HostStatus.findOne({ url: url }, {sort: {runOn: -1, limit: 1 }});
        let runOnDate = hostStatus.runOn;
        if (runOnDate != "") {
            let momentOnDate = moment(runOnDate).format("MM/DD/YYYY hh:mm:ss");
            return momentOnDate;
        } else {
            return "Not Run Yet.";
        }
        
    },
});

Template.hostList.events({

});
