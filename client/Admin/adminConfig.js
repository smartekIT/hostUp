import { ConfigColl } from '../../imports/api/configColl.js';

Template.adminConfig.onCreated(function() {
    this.subscribe("configSettings");
});

Template.adminConfig.onRendered(function() {

});

Template.adminConfig.helpers({
    configExists: function() {
        return ConfigColl.findOne({});
    },
    configMode: function() {
        let config = ConfigColl.findOne({});
        if (typeof config == 'undefined' || config == "" || config == null) {
            return "new";
        } else {
            return "edit";
        }
    },
});

Template.adminConfig.events({
    'click #submitConfig' (event) {
        event.preventDefault();

        let maxNo = $("#maxNoOfSitesPerUser").val();
        let maxNoSites = parseInt(maxNo);
        let freq = $("#standardFreq").val();
        let defaultFreq = parseInt(freq);
        let emailHost = $("#emailHost").val();
        let emailUser = $("#emailUser").val();
        let emailPass = $("#emailPass").val();
        let emailServer = $("#emailServer").val();
        let emailPort = $("#emailPort").val();

        if (maxNoSites == "" || maxNoSites == null) {
            maxNoSties = 5;
        }

        if (defaultFreq == "" || defaultFreq == null) {
            defaultFreq = 20;
        }

        Meteor.call('new.config', emailHost, emailUser, emailPass, emailServer, emailPort, maxNoSites, defaultFreq, function(err, result) {
            if (err) {
                console.log("Error adding Cofnig to db: " + err);
            } else {
                showSnackbar("Successfully Added Configuration!", "green");
            }
        });
    }
});