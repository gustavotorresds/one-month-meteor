import SimpleSchema from 'simpl-schema'
SimpleSchema.extendOptions(['autoform']);

Posts = new Mongo.Collection('posts');

Posts.allow({
    insert: function(userId, doc) {
        return userId === doc.author;
    },
    update: function(userId, doc) {
        return userId === doc.author;
    },
    remove: function(userId, doc) {
        return userId === doc.author;
    }
});

ImageSchema = new SimpleSchema({
    id: {
        type: String,
        label: "Image ID",
        optional: true
    },
    url: {
        type: String,
        label: "Image URL",
        optional: true
    }
});

PostSchema = new SimpleSchema({
    text: {
        type: String,
        label: "Text"
    },
    filter: {
        type: String,
        label: "Text",
        optional: true,
        defaultValue: "none"
    },
    image: {
        type: ImageSchema,
        optional: true
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
    insertPost: function(text, imageUrl, filter) {
        Posts.insert({
            text: text,
            image: {url: imageUrl},
            author: this.userId,
            filter: filter
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

        var username = Meteor.users.findOne({_id: this.userId}).username;
        var subjectId = Posts.findOne({_id: postId}).author;

        if(subjectId !== this.userId) {
            Notifications.insert({
                actorId: this.userId,
                subjectId: subjectId,
                text: `${username} curtiu seu post`,
                link: `/posts/${postId}`
            });

            Meteor.users.update(subjectId, {
                $set: {
                    hasNotifications: true
                }
            });
        }
    },
    unlike: function(postId) {
        Posts.update(postId, {
            $pull: {
                likes: this.userId
            }
        });
    }
});
