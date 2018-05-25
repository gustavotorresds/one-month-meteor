Meteor.subscribe('posts');
Meteor.subscribe('likes');
Meteor.subscribe('users');
Meteor.subscribe('images');

Template.Post.onCreated(function() {
    this.commentMode = new ReactiveVar(false);
});

Template.Post.helpers({
    username: function() {
        var username = Meteor.users.findOne({_id: this.author}).username;
        return username;
    },
    time: function() {
        var post = this;
        var time = new Date(post.createdAt);
        return `${time.getDate()}/${time.getMonth() + 1}`; 
    },
    commentMode: function() {
        return Template.instance().commentMode.get();
    },
    commentInfo: function() {
        var comments = Comments.find({post: this._id});
        var count = comments.count();
        return {
            comments: comments,
            count: count
        };
    },
    likeCounter: function() {
        return this.likes;
    },
    userLiked: function() {
        var like = Likes.findOne({post: this._id, author: Meteor.userId()});
        return !!like;
    },
    imageInfo: function() {
        var image = Images.findOne({_id: this.imageId});
        return image;
    }
});

Template.Post.events({
    'click .comment-toggle': function(event, template) {
        template.commentMode.set(!template.commentMode.get());
    },
    'click .like-toggle': function(event, template) {
        Meteor.call('like', this._id, this.likes);
    },
    'click .unlike-toggle': function(event, template) {
        Meteor.call('unlike', this._id, this.likes);
    },
    'click .remove-button': function(event, template) {
        Meteor.call('deletePost', this._id);
    }
});
