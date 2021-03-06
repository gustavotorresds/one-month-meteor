Template.Search.onCreated(function() {
    let self = this;
    self.autorun(function() {
        self.subscribe('users');
    });
});

Template.Search.onRendered(function() {
    Meteor.typeahead.inject();
});

Template.Search.helpers({
    items: function() {
        var users = Meteor.users.find({_id: {$ne: Meteor.userId()}}).fetch();
        return users.map(function(it) {
            return {id: it._id, value: it.profile.name};
        });
    },
    selected: function(event, suggestion, datasetName) {
        FlowRouter.go('userProfile', {id: suggestion.id});
    }
});
