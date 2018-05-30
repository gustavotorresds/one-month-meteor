Meteor.publish('posts', function() {
    let user = Meteor.users.findOne({_id: this.userId});
    let postAuthors = user.profile.following;
    postAuthors.push(this.userId);

    let posts = Posts.find({author: {$in: postAuthors}});
    return posts;
});

Meteor.publish('userPosts', function(userId) {
    let posts = Posts.find({author: userId});
    return posts;
});

Meteor.publish('singlePost', function(postId) {
    let post = Posts.find({_id: postId});
    return post;
});

// TODO: check this. Apparently, all fields are being published.
Meteor.publish('users', function() {
    let users = Meteor.users.find({}, {fields: {_id: 1, username: 1, profile: 1 }});
    return users;
});

Meteor.publish('singleUser', function(userId) {
    let user = Meteor.users.find({_id: userId});
    return user;
});

Meteor.publish('comments', function(postId) {
    let comments = Comments.find({post: postId});
    return comments;
});

// TODO: fix commented code.
Meteor.publish('images', function(postId) {
    let images = Images.find({});
    return images;
});

Meteor.publish('singleImage', function(imageId) {
    let images = Images.find({_id: imageId});
    return images;
});

Meteor.publish('postImages', function(postId) {
    let post = Posts.findOne({_id: postId});
    let images = Images.find({_id: post.imageId});
    return images;
});

Meteor.publish('userImages', function(userId) {
    let user = Meteor.users.findOne({_id: userId});
    let images = Images.find({_id: user.profile.avatarId});
    return images;
});

Meteor.publish('notifications', function() {
    return Notifications.find({subjectId: this.userId});
});