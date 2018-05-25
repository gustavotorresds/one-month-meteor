// TODO: should have a way to get all friendshi/request info at start. Code is
// currently quite shitty.

var profileId;
var requestFrom;
var requestTo;

Meteor.subscribe('requests');
Meteor.subscribe('users');

Template.UserProfile.onCreated(function() {
    profileId = FlowRouter.getParam('id');
});

/*
 * TODO: custom user info seems to be store under .profile, which might
 * suboptimal. Verify permission stuff:
 * https://guide.meteor.com/accounts.html#dont-use-profile
 * TODO: should probably make another Post template specific for user view.
 */
Template.UserProfile.helpers({
    user: function() {
        var user = Meteor.users.findOne({_id: profileId});
        return user;
    },
    posts: function() {
        return Posts.find({author: profileId})
    },
    notSelf: function() {
        return profileId !== Meteor.userId();
    },
    hasRequest: function() {
        requestTo = Requests.findOne({from: profileId, to: Meteor.userId()});
        return !!requestTo;
    },
    hasRequested: function() {
        requestFrom = Requests.findOne({from: Meteor.userId(), to: profileId});
        return !!requestFrom;
    },
    notFriends: function() {
        var friends = Meteor.users.findOne({_id: Meteor.userId()}).profile.friends;
        if(friends) {
            return friends.indexOf(profileId) === -1;
        }
        return true;
    }
});

Template.UserProfile.events({
    'click .add': function(event, template) {
        Meteor.call('requestFriendship', profileId);
    },
    'click .accept': function(event, template) {
        requestTo = Requests.findOne({from: profileId, to: Meteor.userId()});
        Meteor.call('acceptFriendship', requestTo);
    },
    'click .reject': function(event, template) {
        requestTo = Requests.findOne({from: profileId, to: Meteor.userId()});
        Meteor.call('rejectFriendship', requestTo);
    },
    'click .delete': function(event, template) {
        requestFrom = Requests.findOne({from: Meteor.userId(), to: profileId});
        Meteor.call('rejectFriendship', requestFrom);
    },
});