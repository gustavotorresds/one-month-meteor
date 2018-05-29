Template.SinglePost.onCreated(function() {
    let self = this;
    self.autorun(function() {
        var postId = FlowRouter.getParam('id');
        self.subscribe('singlePost', postId);
        self.subscribe('images');
    });
});

Template.SinglePost.helpers({
    thisPost: function() {
        var postId = FlowRouter.getParam('id');
        return Posts.find({_id: postId});
    }
});