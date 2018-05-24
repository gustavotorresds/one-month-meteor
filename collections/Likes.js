import SimpleSchema from 'simpl-schema'

Likes = new Mongo.Collection('likes');

Likes.allow({
    insert: function(userId, doc) {
        return !!userId;
    },
    update: function(userId, doc) {
        return !!userId;
    }
});

LikeSchema = new SimpleSchema({
    author: {
        type: String,
        label: "Author",
        autoValue: function() {
            return this.userId
        }
    },
    post: {
        type: String,
        label: "Post"
    }
});

Likes.attachSchema(LikeSchema);

Meteor.methods({
    like: function(postId, currentCount) {
        Likes.insert({post: postId});
        Posts.update(postId, {
            $set: {
                likes: currentCount + 1
            }
        });
    },
    unlike: function(postId, currentCount) {
        Likes.remove({author: this.userId, post: postId});
        Posts.update(postId, {
            $set: {
                likes: currentCount - 1
            }
        });
    }
});