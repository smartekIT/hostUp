import { URLToCheck } from '../imports/api/urlsToCheck.js';
import { ConfigColl } from '../imports/api/configColl.js';
import { HostStatus } from '../imports/api/hostStatus.js';
import { PingStatus } from '../imports/api/pingStatus.js';

Meteor.publish("urlChecks", function() {
    return URLToCheck.find({});
});

Meteor.publish("hostStatuses", function() {
    let myUser = Meteor.user().emails[0].address;
    console.log("********************************************");
    console.log("********************************************");
    console.log("");
    console.log("My User aggregate is: " + myUser);
    console.log("");
    console.log("********************************************");
    console.log("********************************************");
    
    return HostStatus.find({ runFor: myUser, active: true });

    // var pipeline = [
    //     {
    //         $group: {
    //             _id: "$urlId",
    //             runOn: {$last: '$runOn'},
    //         }
    //     },
    //     {  $project: {
    //             "urlId": "$urlId",
    //             "status": "$status",
    //             "statusColor": "$statusColor",
    //             "runOn": "$runOn",
    //             "nextRun": "$nextRun",
    //             "runFor": "$runFor",
    //         }
    //     },
    //     {    $sort: {
    //             "runOn": -1
    //         }
    //     }
    // ]
    // var result = HostStatus.aggregate(pipeline);
    // return result;
});

Meteor.publish("pingStatuses", function(myUrl) {
    return PingStatus.find({ url: myUrl }, {sort: { runOn: -1 }, limit: 1000 });
});