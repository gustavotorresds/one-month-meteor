/*
 * TODO: subscription doesn't make sense all over. Fix it throughout the app.
 */
// Meteor.subscribe('posts');
Meteor.subscribe('requests');

Template.Timeline.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('posts');
    });
});

Template.Timeline.helpers({
    posts: function() {
        return Posts.find({}).fetch().reverse();
    },
});
