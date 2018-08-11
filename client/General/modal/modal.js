Template.myModal.onCreated(function() {

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

        $("#genModal").modal('close');
    }
});
