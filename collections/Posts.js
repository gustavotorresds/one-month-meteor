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

Image = new SimpleSchema({
    id: {
        type: String,
        label: "ID"
    },
    imageURL: {
        type: String,
        label: "URL"
    }
});

PostSchema = new SimpleSchema({
    text: {
        type: String,
        label: "Text"
    },
    // picture: {
    //     type: String,
    //     autoform: {
    //         afFieldInput: {
    //             type: "fileUpload",
    //             collection: "Images"
    //         }
    //     },
    //     optional: true
    // },
    imageId: {
        type: String,
        label: "Image ID"
    },
    author: {
        type: String,
        label: "Author",
        autoValue: function() {
            return this.userId
        }
    },
    createdAt: {
        type: Date,
        label: "Created At",
        autoValue: function() {
            return new Date()
        }
    },
    likes: {
        type: Number,
        label: "Likes",
        defaultValue: 0,
        optional: true
    }
});

Posts.attachSchema(PostSchema);

Meteor.methods({
    insertPost: function(text, imageId) {
        Posts.insert({
            text: text,
            imageId: imageId
        });
    },
    // TODO: remove image associated with the post.
    deletePost: function(postId) {
        Posts.remove(postId);
    }
});