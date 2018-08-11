Template.needConfig.onCreated(function() {

});

Template.needConfig.onRendered(function() {

});

Template.needConfig.helpers({

});

Template.needConfig.events({
    'click #configSystem' (event) {
        // console.log("Clicked the config button.");
        Session.set("configSet", true);
        FlowRouter.go('/configSystem');
    },
});
