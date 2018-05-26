// TODO: should have a way to get all friendshi/request info at start. Code is
// currently quite shitty.
var requestFrom;
var requestTo;

Meteor.subscribe('requests');
Meteor.subscribe('users');

/*
 * TODO: custom user info seems to be store under .profile, which might
 * suboptimal. Verify permission stuff:
 * https://guide.meteor.com/accounts.html#dont-use-profile
 * TODO: should probably make another Post template specific for user view.
 */
Template.UserProfile.helpers({
    user: function() {
        var profileId = FlowRouter.getParam('id');
        var user = Meteor.users.findOne({_id: profileId});
        return user;
    },
    posts: function() {
        var profileId = FlowRouter.getParam('id');
        return Posts.find({author: profileId})
    },
    notSelf: function() {
        var profileId = FlowRouter.getParam('id');
        return profileId !== Meteor.userId();
    },
    hasRequest: function() {
        var profileId = FlowRouter.getParam('id');
        requestTo = Requests.findOne({from: profileId, to: Meteor.userId()});
        return !!requestTo;
    },
    hasRequested: function() {
        var profileId = FlowRouter.getParam('id');
        requestFrom = Requests.findOne({from: Meteor.userId(), to: profileId});
        return !!requestFrom;
    },
    notFriends: function() {
        var profileId = FlowRouter.getParam('id');
        var friends = Meteor.users.findOne({_id: Meteor.userId()}).profile.friends;
        if(friends) {
            return friends.indexOf(profileId) === -1;
        }
        return true;
    }
});

Template.UserProfile.events({
    'click .add': function(event, template) {
        var profileId = FlowRouter.getParam('id');
        Meteor.call('requestFriendship', profileId);
    },
    'click .accept': function(event, template) {
        var profileId = FlowRouter.getParam('id');
        requestTo = Requests.findOne({from: profileId, to: Meteor.userId()});
        Meteor.call('acceptFriendship', requestTo);
    },
    'click .reject': function(event, template) {
        var profileId = FlowRouter.getParam('id');
        requestTo = Requests.findOne({from: profileId, to: Meteor.userId()});
        Meteor.call('rejectFriendship', requestTo);
    },
    'click .delete': function(event, template) {
        var profileId = FlowRouter.getParam('id');
        requestFrom = Requests.findOne({from: Meteor.userId(), to: profileId});
        Meteor.call('rejectFriendship', requestFrom);
    },
});