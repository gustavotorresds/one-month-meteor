Template.Comment.helpers({
    commentText: function() {
        var text = Comments.find({_id: this});
        return text;
    },
    authorUsername: function() {
        var user = Meteor.users.findOne({_id: this.author});
        return user.username;
    }
});