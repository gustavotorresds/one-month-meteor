import SimpleSchema from 'simpl-schema'

Requests = new Mongo.Collection('requests');

Requests.allow({
    insert: function(userId, doc) {
        return !!userId;
    },
    update: function(userId, doc) {
        return !!userId;
    }
});

RequestSchema = new SimpleSchema({
    from: {
        type: String,
        label: "From"
    },
    to: {
        type: String,
        label: "To"
    }
});

Requests.attachSchema(RequestSchema);

function respondFriendship(request, accept) {
    if(accept) {
        Meteor.users.update(request.to, {
            $addToSet: {
                'profile.friends': request.from
            }
        });
        Meteor.users.update(request.from, {
            $addToSet: {
                'profile.friends': request.to
            }
        });
    }
    Requests.remove(request._id);
}

Meteor.methods({
    requestFriendship: function(userId) {
        Requests.insert({from: this.userId, to: userId});
    },
    acceptFriendship: function(request) {
        respondFriendship(request, true);
    },
    rejectFriendship: function(request) {
        respondFriendship(request, false);
    }
});