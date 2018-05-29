import SimpleSchema from 'simpl-schema'

Notifications = new Mongo.Collection('notifications');

Notifications.allow({
    insert: function(userId, doc) {
        return !!userId;
    },
    update: function(userId, doc) {
        return !!userId;
    }
});

NotificationSchema = new SimpleSchema({
    actorId: {
        type: String,
        label: "Author",
        autoValue: function() {
            return this.userId
        }
    },
    subjectId: {
        type: String,
        label: "Author"
    },
    text: {
        type: String,
        label: "Text"
    },
    link: {
        type: String,
        label: "Link"
    }
});

Notifications.attachSchema(NotificationSchema);