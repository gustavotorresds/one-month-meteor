Meteor.subscribe('posts');
Meteor.subscribe('images');

Template.SinglePost.helpers({
    thisPost: function() {
        var postId = FlowRouter.getParam('id');
        return Posts.find({_id: postId});
    }
});