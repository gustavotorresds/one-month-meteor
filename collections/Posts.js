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
    fileId: {
        type: String
    },
    // imageUrl: {
    //     type: String,
    //     label: "Image URL"
    // },
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
