import { URLToCheck } from '../imports/api/urlsToCheck.js';
import { ConfigColl } from '../imports/api/configColl.js';
import { HostStatus } from '../imports/api/hostStatus.js';
import { PingStatus } from '../imports/api/pingStatus.js';

Meteor.publish("urlChecks", function() {
    return URLToCheck.find({});
});

Meteor.publish("hostStatuses", function() {
    return HostStatus.find({});
});

Meteor.publish("pingStatuses", function(myUrl) {
    return PingStatus.find({ url: myUrl }, {sort: { runOn: -1 }, limit: 1000 });
});