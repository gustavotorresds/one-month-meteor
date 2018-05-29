Meteor.subscribe('users');
Meteor.subscribe('notifications');

Template.Notifications.helpers({
    notifications: function() {
        return Notifications.find({subjectId: Meteor.userId()}).fetch();
    },
    notificationCount: function() {
        return Notifications.find({subjectId: Meteor.userId()}).fetch().count();
    }
});
