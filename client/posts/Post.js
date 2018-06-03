Template.Post.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('singleUser', self.data.author);
        self.subscribe('postImages', self.data._id);
        self.subscribe('userImages', self.data.author);
        self.subscribe('comments', self.data._id);
    });
});

Template.Post.helpers({
    authorUsername: function() {
        var authorUsername = Meteor.users.findOne({_id: this.author}).username;
        return authorUsername;
    },
    comments: function() {
        var comments = Comments.find({post: this._id});
        var count = comments.count();
        return comments;
    },
    likeCounter: function() {
        if(this.likes) {
            return this.likes.length;
        }
        return 0;
    },
    userLiked: function() {
        if(this.likes) {
            var like = this.likes.indexOf(Meteor.userId());
            return (like !== -1);    
        }
        return false;
    },
    // Refactor. It'd be best if this was inside post.
    imageInfo: function() {
        // var image = Images.findOne({_id: this.imageId});
        // console.log('IMAGE: ', image.url);
        return this.image;
    },
    belongsToUser: function() {
        return this.author === Meteor.userId();
    }
});

Template.Post.events({
    'click .comment-toggle': function(event, template) {
        $(`#new-comment-field-${this._id}`).focus();
    },
    'click .like-toggle': function(event, template) {
        Meteor.call('like', this._id);
    },
    'click .unlike-toggle': function(event, template) {
        Meteor.call('unlike', this._id);
    },
    'click .remove-button': function(event, template) {
        Meteor.call('deletePost', this._id);
    }
});
