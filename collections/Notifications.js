import SimpleSchema from 'simpl-schema'

Notifications = new Mongo.Collection('notifications');

NotificationSchema = new SimpleSchema({
    authorId: {
        type: String,
        label: "Author",
        autoValue: function() {
            return this.userId
        }
    },
    recipientId: {
        type: String,
        label: "Author"
    },
    actionType: {
        type: String,
        label: "Action",
        autoValue: function() {
            return "Follow"
        }
    },
    objectId: {
        type: String,
        label: "Object"
    }
});