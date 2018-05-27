// TODO: should have a way to get all friendshi/request info at start. Code is
// currently quite shitty.

Template.UserProfile.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('posts');
        self.subscribe('requests');
        self.subscribe('users');
        self.subscribe('images');
    });
});

/*
 * TODO: custom user info seems to be store under .profile, which might
 * suboptimal. Verify permission stuff:
 * https://guide.meteor.com/accounts.html#dont-use-profile
 * TODO: should probably make another Post template specific for user view.
 */
Template.UserProfile.helpers({
    hasRequest: function() {
        return !!request(false);
    },
    hasRequested: function() {
        return !!request(true);
    },
    avatarInfo: function() {
        var user = Meteor.users.findOne({_id: profileId()});
        var avatar = Images.findOne({_id: user.profile.avatarId});
        return avatar;
    },
    notFriends: function() {
        var friends = Meteor.users.findOne({_id: Meteor.userId()}).profile.friends;
        if(friends) {
            return friends.indexOf(profileId()) === -1;
        }
        return true;
    },
    notSelf: function() {
        return profileId() !== Meteor.userId();
    },
    posts: function() {
        return Posts.find({author: profileId()}).fetch().reverse();
    },
    user: function() {
        var user = Meteor.users.findOne({_id: profileId()});
        return user;
    }
});

Template.UserProfile.events({
    'click .add': function(event, template) {
        var profileId = FlowRouter.getParam('id');
        Meteor.call('requestFriendship', profileId);
    },
    'click .accept': function(event, template) {
        Meteor.call('acceptFriendship', request(false));
    },
    'click .reject': function(event, template) {
        Meteor.call('rejectFriendship', request(false));
    },
    'click .delete': function(event, template) {
        Meteor.call('rejectFriendship', request(true));
    },
});

const request = function(isFromCurrentUser) {
    var profileId = FlowRouter.getParam('id');
    var request = (isFromCurrentUser ? 
        Requests.findOne({from: Meteor.userId(), to: profileId}) :
        Requests.findOne({from: profileId, to: Meteor.userId()})
    );
    return request;
}

const profileId = function() {
    return FlowRouter.getParam('id');
}