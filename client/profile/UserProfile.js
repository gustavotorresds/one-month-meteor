Template.UserProfile.onCreated(function() {
    var self = this;
    self.autorun(function() {
        let id = profileId();
        self.subscribe('userPosts', id);
        self.subscribe('singleUser', id);
        self.subscribe('userImages', id);
    });
});

/*
 * TODO: custom user info seems to be store under .profile, which might
 * suboptimal. Verify permission stuff:
 * https://guide.meteor.com/accounts.html#dont-use-profile
 * TODO: should probably make another Post template specific for user view.
 */
Template.UserProfile.helpers({
    avatarInfo: function() {
        var user = Meteor.users.findOne({_id: profileId()});
        var avatar = Images.findOne({_id: user.profile.avatarId});
        if(avatar) {
            return avatar;
        }
        return {url: 'https://s3.ap-south-1.amazonaws.com/weddingasia/website/images/default-userAvatar.png'};
    },
    follows: function() {
        var following = Meteor.users.findOne({_id: Meteor.userId()}).profile.following;
        return following.indexOf(profileId()) !== -1;
    },
    posts: function() {
        return Posts.find({author: profileId()}).fetch().reverse();
    },
    self: function() {
        return profileId() === Meteor.userId();
    },
    user: function() {
        var user = Meteor.users.findOne({_id: profileId()});
        return user;
    }
});

Template.UserProfile.events({
    'click .follow': function(event, template) {
        Meteor.call('followProfile', profileId());
    },
    'click .unfollow': function(event, template) {
        Meteor.call('unfollowProfile', profileId());
    }
});

const profileId = function() {
    return FlowRouter.getParam('id');
}