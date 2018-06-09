import { ConfigColl } from '../../imports/api/configColl.js';

Template.adminConfig.onCreated(function() {
    this.subscribe("configSettings");
});

Template.adminConfig.onRendered(function() {

});

Template.adminConfig.helpers({

});

Template.adminConfig.events({

});