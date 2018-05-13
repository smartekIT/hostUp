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
        let url = this.url;

        let hostStatus = HostStatus.findOne({ url: url }, {sort: {runOn: -1 }});
        Session.set("runOn", hostStatus.runOn);
        return hostStatus;
    },
    lastRunOn: function() {
        let runOnDate = Session.get("runOn");

        let momentOnDate = moment(runOnDate).format("MM/DD/YYYY hh:mm:ss");
        return momentOnDate;
    },
});

Template.hostList.events({

});
