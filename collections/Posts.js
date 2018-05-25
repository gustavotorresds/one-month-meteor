import SimpleSchema from 'simpl-schema'
SimpleSchema.extendOptions(['autoform']);

Posts = new Mongo.Collection('posts');

Posts.allow({
    insert: function(userId, doc) {
        return !!userId;
    },
    update: function(userId, doc) {
        return !!userId;
    }
});

PostSchema = new SimpleSchema({
    text: {
        type: String,
        label: "Text"
    },
    imageId: {
        type: String,
        label: "Image ID"
    },
    author: {
        type: String,
        label: "Author"
    },
    createdAt: {
        type: Date,
        label: "Created At",
        autoValue: function() {
            return new Date()
        }
    },
    likes: {
        type: Array,
        label: "Likes",
        defaultValue: [],
        optional: true
    },
    'likes.$': {
        type: String
    }
});

Posts.attachSchema(PostSchema);

Meteor.methods({
    insertPost: function(text, imageId) {
        Posts.insert({
            text: text,
            imageId: imageId,
            author: this.userId
        });
    },
    // TODO: remove image associated with the post.
    deletePost: function(postId) {
        Posts.remove(postId);
    },
    like: function(postId) {
        Posts.update(postId, {
            $addToSet: {
                likes: this.userId
            }
        });
    },
    unlike: function(postId) {
        Posts.update(postId, {
            $pull: {
                likes: this.userId
            }
        });
    }
});
