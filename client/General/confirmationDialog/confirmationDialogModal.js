Template.confirmationDialogModal.onCreated(function() {

});

Template.confirmationDialogModal.onRendered(function() {

});

Template.confirmationDialogModal.helpers({
    modalHeader: function() {
        return Session.get("confirmationDialogTitle");
    },
    modalBody: function() {
        return Session.get("confirmationDialogContent");
    },
});

Template.confirmationDialogModal.events({
    "click #continue" (event) {
        event.preventDefault();
        let functionPassId = Session.get("eventConfirmNecessaryId");
        let callFunction = Session.get("eventConfirmCallbackFunction");

        $("#confirmationDialog").modal('close');

        console.log("Passed Function Name: " + callFunction); // <-- allows you to see teh function name passed.
        console.log("Passed Id: " + functionPassId); // <-- allows you to see what ID is being passed.

        window[callFunction](functionPassId);
    },
    "click #cancel" (event) {
        event.preventDefault();
        $("#confirmationDialog").modal('close');
    },
});