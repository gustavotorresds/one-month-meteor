Template.EditProfile.onCreated(function() {
  let self = this;
  self.autorun(function() {
    self.subscribe('singleUser', Meteor.userId());
  });
});

Template.EditProfile.helpers({
  user: function() {
    return Meteor.users.findOne({_id: Meteor.userId()});
  }
});

Template.EditProfile.events({
    'submit .profileForm': function(event, template) {
      event.preventDefault();
      var bio = event.target.bio.value;
      var city = event.target.city.value;
      var name = event.target.name.value;

      Meteor.call('updateProfile', bio, city, name);

      FlowRouter.go(`/users/${Meteor.userId()}`);
    }
});
