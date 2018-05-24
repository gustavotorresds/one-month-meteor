import SimpleSchema from 'simpl-schema'

Comments = new Mongo.Collection('comments');

Comments.allow({
    insert: function(userId, doc) {
        return !!userId;
    },
    update: function(userId, doc) {
        return !!userId;
    }
});

CommentSchema = new SimpleSchema({
    author: {
        type: String,
        label: "Author",
        autoValue: function() {
            return this.userId
        }
    },
    text: {
        type: String,
        label: "Text"
    },
    post: {
        type: String,
        label: "Post"
    }
});

Comments.attachSchema(CommentSchema);

Meteor.methods({
    insertComment: function(postId, commentText) {
        var newComment = Comments.insert({text: commentText, post: postId});
    }
});