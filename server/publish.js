Meteor.publish('posts', function() {
    var user = Meteor.users.findOne({_id: this.userId});

    if(user) {
        var postAuthors = (user.profile.friends ? user.profile.friends : []);
        postAuthors.push(this.userId);

        var posts = Posts.find({author: {$in: postAuthors}});
        return posts;
    }
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

Meteor.publish('requests', function() {
    var requests = Requests.find({});
    return requests;
});