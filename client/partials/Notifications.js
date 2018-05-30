Template.Notifications.onCreated(function() {
    let self = this;
    self.autorun(function() {
        self.subscribe('notifications');
        self.subscribe('singleUser', Meteor.userId());
    });
});

Template.Notifications.helpers({
    hasNotifications() {
        let user = Meteor.users.findOne({_id: Meteor.userId()});
        let has = !!user.hasNotifications;
        return has;
    },
    notifications: function() {
        return Notifications.find({subjectId: Meteor.userId()}).fetch().reverse();
    },
    notificationCount: function() {
        return Notifications.find({subjectId: Meteor.userId()}).fetch().count();
    }
});

Template.Notifications.events({
    'click .notifications-button': function(event, template) {
        Meteor.call('viewNotifications');
    }
});