import SimpleSchema from 'simpl-schema'

Requests = new Mongo.Collection('requests');

Requests.allow({
    insert: function(userId, doc) {
        return !!userId;
    },
    update: function(userId, doc) {
        return !!userId;
    }
});

RequestSchema = new SimpleSchema({
    from: {
        type: String,
        label: "From",
        autoValue: function() {
            return this.userId
        }
    },
    to: {
        type: String,
        label: "To",
    },
    hasAnswer: {
        type: Boolean,
        label: "Has Answer",
        defaultValue: false,
        optional: true
    },
    accepted: {
        type: Boolean,
        label: "Accepted",
        defaultValue: false,
        optional: true
    }
});

Requests.attachSchema(CommentSchema);

Meteor.methods({
    requestFriendship: function(userId) {
        var newComment = Requests.insert({text: commentText, post: postId});
    }
});