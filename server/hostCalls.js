import { URLToCheck } from '../imports/api/urlsToCheck.js';
import { HostStatus } from '../imports/api/hostStatus.js';

Meteor.methods({
    'hosts.call' (myURL) {
      HTTP.get(myURL, {mode: 'no-cors'}, function(err, result){
        if (err) {
            console.log("Error:" + myURL + " " + err);
        } else {
            // console.dir(result);
            switch (result.statusCode) {
              case 200:
                status = "Up";
                color = "#32CD32";
                break;
              case 400:
                status = "Bad Request: 400";
                color = "#32CD32";
                break;
              case 401:
                status = "Authorization Required";
                color = "#32CD32";
                break;
              case 402:
                status = "Payment Required";
                color = "#32CD32";
                break;
              case 403:
                status = "Access Forbidden";
                color = "#32CD32";
                break;
              case 404:
                status = "Not Found";
                color = "#ff0000";
                break;
              case 405:
                status = "Method Not Allowed";
                color = "#32CD32";
                break;
              case 406:
                status = "Not Acceptable";
                color = "#FFA500";
                break;
              case 407:
                status = "Proxy Authentication Required";
                color = "#FFA500";
                break;
              case 408:
                status = "Request Timeout";
                color = "#FFA500";
                break;
              case 409:
                status = "Conflict";
                color = "#FFA500";
                break;
              case 410:
                status = "Gone";
                color = "#FFA500";
                break;
              case 414:
                status = "Request URL Too Large";
                color = "#FFA500";
                break;
              case 500:
                status = "Internal Server Error";
                color = "#FF0000";
                break;
            }
  
            Meteor.call('hostStatus.add', myURL, status, color, nextCheck);
        // ping the host and get 5 ping times back, and average those times.
          }
        repeatChecks(nextCheck);
      });
    }
});
