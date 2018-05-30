Template.Timeline.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('posts');
    });
});

Template.Timeline.helpers({
    posts: function() {
        return Posts.find({}).fetch().reverse();
    }
});
