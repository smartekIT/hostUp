import { ConfigColl } from '../../imports/api/configColl.js';
import { Notify } from '../../imports/api/notify.js';

Template.headerBar.onCreated(function() {
	this.subscribe("configSettings");
	this.subscribe("myNotifications");
});

Template.headerBar.onRendered(function() {

});

Template.headerBar.helpers({
	needsConfig: function () {
		let configed = ConfigColl.findOne({});

		if (typeof configed == 'undefined' || configed.emailUser == null || configed.emailUser == "" || typeof configed.emailUser == 'undefined') {
			return false;
		} else {
			return true;
		}
	},
	emailAdd: function() {
		return Meteor.user().emails[0].address;
	},
	notifications: function() {
		return Notify.find({});
	},
	hasNotifications: function() {
		let notify = Notify.find({}).count();

		if (notify >= 1) {
			return true;
		} else {
			return false;
		}
	},
	noOfUnreadNotifications: function() {
		return Notify.find({}).count();
	},
});

Template.headerBar.events({
	"click #signIn": function() {
		var signInModal = document.getElementById('signInModal');
		signInModal.style.display = "block";
	}
});
