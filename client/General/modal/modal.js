import { HostStatus } from '../../../imports/api/hostStatus.js';
import { URLToCheck } from '../../../imports/api/urlsToCheck.js';
import { PingStatus } from '../../../imports/api/pingStatus.js';

Template.myModal.onCreated(function() {
    this.subscribe("allHostStatuses");
    this.subscribe("allURLsToCheck");
});

Template.myModal.onRendered(function() {
    $('.modal').modal();
});

Template.myModal.helpers({
    modalHeader: function() {
        return Session.get("modalHeader");
    },
    modalBody: function() {
        return Session.get("modalBody");
    }
});

Template.myModal.events({
    'click #continue' (event) {
        // event.preventDefault();
        // console.log("Clicked Continue.");

        let source = Session.get("modalFrom");
        let actionId = Session.get("actionId");

        var myCalledModal = document.getElementById('genModal');
        myCalledModal.style.display = 'none';

        window[source](actionId);
        
    },
    'click #cancel' (event) {
        event.preventDefault();

        var myCalledModal = document.getElementById('genModal');
        myCalledModal.style.display = 'none';
    },
});
