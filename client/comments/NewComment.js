Meteor.subscribe('notifications');

Template.NewComment.events({
    'submit .new-comment': function(event) {
        event.preventDefault();
        var commentText = event.target.comment.value;
        Meteor.call('insertComment', this.post._id, commentText);
        event.target.comment.value = '';
    }
});