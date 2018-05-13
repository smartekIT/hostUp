import { URLToCheck } from '../imports/api/urlsToCheck.js';
import { ConfigColl } from '../imports/api/configColl.js';
import { HostStatus } from '../imports/api/hostStatus.js';

Meteor.publish("urlChecks", function() {
    return URLToCheck.find({});
});

Meteor.publish("hostStatuses", function() {
    return HostStatus.find({});
});