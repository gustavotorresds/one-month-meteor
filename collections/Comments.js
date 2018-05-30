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

        var username = Meteor.users.findOne({_id: this.userId}).username;
        var subjectId = Posts.findOne({_id: postId}).author;

        if(subjectId !== this.userId) {
            Notifications.insert({
                actorId: this.userId,
                subjectId: subjectId,
                text: `${username} comentou no seu post`,
                link: `/posts/${postId}`
            });

            Meteor.users.update(subjectId, {
                $set: {
                    hasNotifications: true
                }
            });   
        }
    },
    removeComment: function(commentId) {
        Comments.remove(commentId);
    }
});