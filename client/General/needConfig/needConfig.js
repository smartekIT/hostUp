import { ConfigColl } from '../../../imports/api/configColl.js';

Template.needConfig.onCreated(function() {
    this.subscribe("configSettings");
});

Template.needConfig.onRendered(function() {
    let config = ConfigColl.find({});
    console.log("Config = " + config);
    if (typeof config == 'undefined' || config == "" || config == null) {
        Session.set("configSet", false);

        var toastHTML = '<span>You Need to Configure Site Deffaults!</span><button id="configSystem" class="btn-flat toast-action configSystem">set It Now</button>';
        Materialize.toast(toastHTML, 7000, 'red');
    } else {
        Session.set("configSet", true);
    }
});

Template.needConfig.helpers({

});

Template.needConfig.events({
    'click #configSystem' (event) {
        console.log("Clicked the config route button.");
        
        FlowRouter.go('/configSystem');
    },
});