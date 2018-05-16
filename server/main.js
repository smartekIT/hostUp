import { Meteor } from 'meteor/meteor';

import { URLToCheck } from '../imports/api/urlsToCheck.js';
import { HostStatus } from '../imports/api/hostStatus.js';
import shelljs from 'shelljs';
import { log } from 'shelljs/src/common';

Meteor.startup(() => {
  checkURLsRepeat();
});

checkURLsRepeat = function() {
  try {
    console.log("-------- --------- --------");
    console.log("Setting up the next Check.");
    let status = "";
    // code to run on server at startup
    let checkURLs = URLToCheck.find({}).fetch();

    if (typeof checkURLs != 'undefined' && checkURLs != "" && checkURLs != null) {
      for (i=0; i < checkURLs.length; i++) {
          let myURL = checkURLs[i].url;
          let freq = checkURLs[i].freqCheck;
          let now = new Date();
          let nowFormatted = moment(now).format('YYYY-MM-DD HH:mm:ss');
          let nowCompare = moment(nowFormatted).toISOString();
          

          let currStatus = HostStatus.findOne({ url: myURL }, { sort: { runOn: -1 }});

          
          
          
          if (typeof currStatus != 'undefined') {
            let nextRunISO = moment(currStatus.nextRun).toISOString();
            console.log("Now ISO is: " + nowCompare);
            
            console.log("Moment in ISO: " + nextRunISO);

            if (nowCompare >= nextRunISO) {
              console.log("Should run the check for " + myURL + " now.");

              let nextCheck = moment(nowFormatted).add(freq, 'minutes').format('YYYY-MM-DD HH:mm:ss');
              // console.log("Now is: " + nowFormatted);
              // console.log(("Next Check at: " + nextCheck));

              let status = "";
              let color = "";

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

                }
              });
              
            } else {
              console.log("SKipping run for " + myURL + " for now. It's not Time.");

              
            }
          } else {
            console.log("No run yet.");

            let nextCheck = moment(nowFormatted).add(freq, 'minutes').format('YYYY-MM-DD HH:mm:ss');
              // console.log("Now is: " + nowFormatted);
              // console.log(("Next Check at: " + nextCheck));

              let status = "";
              let color = "";

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

                }
              });
          }

            
      }
      repeatChecks();
    } else {
      console.log("Didn't find any URLs to Check at this time.");
    }
    
  } catch (error) {
    console.log("Error Occurred: " + error);
  }
  
}

repeatChecks = function() {
  Meteor.setTimeout(function() {
    checkURLsRepeat();
  }, 60000);
}
