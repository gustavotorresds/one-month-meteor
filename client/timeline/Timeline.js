/*
 * TODO: subscription doesn't make sense all over. Fix it throughout the app.
 */
// Meteor.subscribe('posts');
// Meteor.subscribe('likes');
Template.Timeline.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('posts');
        self.subscribe('likes');
    });
});

Template.Timeline.helpers({
    posts: function() {
        return Posts.find({}).fetch().reverse();
    },
});
