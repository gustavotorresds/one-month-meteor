Template.Comment.onCreated(function() {
    let self = this;
    self.autorun(function() {
        self.subscribe('singleUser', self.data.author);
    });
});

Template.Comment.helpers({
    authorUsername: function() {
        let user = Meteor.users.findOne({_id: this.author});
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