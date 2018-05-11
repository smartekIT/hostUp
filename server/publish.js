import { URLToCheck } from '../imports/api/urlsToCheck.js';
import { ConfigColl } from '../imports/api/configColl.js';

Meteor.publish("urlChecks", function() {
    return URLToCheck.find({})
})