Meteor.publish('posts', function() {
    var posts = Posts.find({});
    return posts;
});

Meteor.publish('users', function() {
    var users = Meteor.users.find({});
    return users;
});

Meteor.publish('comments', function() {
    var comments = Comments.find({});
    return comments;
});

Meteor.publish('images', function() {
    var images = Images.find({});
    return images;
});