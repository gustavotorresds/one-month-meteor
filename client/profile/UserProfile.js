Template.UserProfile.onCreated(function() {
    // var self = this;
    // self.autorun(function() {
    //     var id = FlowRouter.getParam('id');
    //     self.subscribe('singleRecipe', id);
    // });
});

/*
 * TODO: custom user info seems to be store under .profile, which is
 * suboptimal. Verify permission stuff:
 * https://guide.meteor.com/accounts.html#dont-use-profile
 * TODO: should probably make another Post template specific for user view.
 */
Template.UserProfile.helpers({
    user: function() {
        var userId = FlowRouter.getParam('id');
        var user = Meteor.users.findOne({_id: userId});
        console.log('USER: ', user);
        return user;
    },
    posts: function() {
        var userId = FlowRouter.getParam('id');
        return Posts.find({author: userId})
    }
});