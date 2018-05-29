Template.Comment.helpers({
    commentText: function() {
        var text = Comments.find({_id: this});
        return text;
    },
    authorUsername: function() {
        var user = Meteor.users.findOne({_id: this.author});
        return user.username;
    },
    isAuthor: function() {
        return Meteor.userId() === this.author;
    }
});

Template.Comment.events({
    'click .remove': function removeComment(event, template) {
        Meteor.call('removeComment', this._id);
    }
});