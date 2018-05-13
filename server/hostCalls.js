import { URLToCheck } from '../imports/api/urlsToCheck.js';
import { HostStatus } from '../imports/api/hostStatus.js';

Meteor.methods({
    'hosts.call' (url) {
        HTTP.get(url, {mode: 'no-cors'}, function(err, result){
            if (err) {
                console.log("Error:" + url + " " + err);
            } else {
                // console.dir(result);
                if (result.statusCode == 200) {
                    let status = "Up";
                    // console.log("Success!");
                    Meteor.call('hostStatus.add', url, status);
                }
            }
        });
    }
});
