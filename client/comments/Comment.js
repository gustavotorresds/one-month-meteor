Meteor.subscribe('comments');

Template.Comment.helpers({
    commentText: function() {
        var text = Comments.find({_id: this});
        return text;
    }
});