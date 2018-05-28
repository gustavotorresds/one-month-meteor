Meteor.publish('posts', function(userId) {
    var user = Meteor.users.findOne({_id: this.userId});

    var postAuthors = user.profile.following;
    postAuthors.push(this.userId);

    var posts = Posts.find({author: {$in: postAuthors}});
    return posts;
});

Meteor.publish('users', function() {
    var users = Meteor.users.find({});
    return users;
});

Meteor.publish('comments', function(postId) {
    var comments = Comments.find({post: postId});
    return comments;
});

// TODO: fix commented code.
Meteor.publish('images', function(postId) {
    // var post = Posts.findOne({_id: postId});
    // if(post) {
        // var images = Images.find({_id: post.imageId});
        // console.log('Images: ', images.count());
    // }
    var images = Images.find({});
    return images;
});
