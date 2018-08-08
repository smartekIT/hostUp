import { ConfigColl } from '../../imports/api/configColl.js';

Template.headerBar.onCreated(function() {
	this.subscribe("configSettings");
});

Template.headerBar.onRendered(function() {

});

Template.headerBar.helpers({
	needsConfig: function () {
		let configed = ConfigColl.findOne({});

		if (configed.emailUser == null || configed.emailUser == "" || typeof configed.emailUser == 'undefined') {
			return false;
		} else {
			return true;
		}
	},
});

Template.headerBar.events({
	"click #signIn": function() {
		var signInModal = document.getElementById('signInModal');
		signInModal.style.display = "block";
	}
});
