Template.Post.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('users');
        self.subscribe('images');
        self.subscribe('comments', self.data._id);
    });
    this.commentMode = new ReactiveVar(false);
});

Template.Post.helpers({
    authorUsername: function() {
        var authorUsername = Meteor.users.findOne({_id: this.author}).username;
        return authorUsername;
    },
    authorAvatar: function() {
        var author = Meteor.users.findOne({_id: this.author});
        var avatar = Images.findOne({_id: author.profile.avatarId});
    
        if(avatar) {
            return avatar;
        }
        return {url: 'https://s3.ap-south-1.amazonaws.com/weddingasia/website/images/default-userAvatar.png'};
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
        var image = Images.findOne({_id: this.imageId});
        return image;
    },
    belongsToUser: function() {
        return this.author === Meteor.userId();
    }
});

Template.Post.events({
    'click .comment-toggle': function(event, template) {
        template.commentMode.set(!template.commentMode.get());
        $('#new-comment-field').focus();
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
