/*
 * TODO: Should image be stored as an ID, URL or both?
 */

Meteor.methods({
    setUserAvatar: function(imageId, imageUrl) {
        var imageUrl = Images.findOne().url();
        Meteor.users.update(this.userId, {
            $set: {
                'profile.avatarId': imageId,
                'profile.avatarUrl': imageUrl
            }
        });
    },
    updateProfile: function(bio, city, name) {
        Meteor.users.update(this.userId, {
            $set: {
                'profile.bio': bio,
                'profile.city': city,
                'profile.name': name
            }
        });    
    },
    followProfile: function(profileId) {
        Meteor.users.update(this.userId, {
            $addToSet: {
                'profile.following': profileId
            }
        });
        Meteor.users.update(profileId, {
            $addToSet: {
                'profile.followers': this.userId
            }
        });

        var username = Meteor.users.findOne({_id: this.userId}).username;
        
        var not = Notifications.insert({
            actorId: this.userId,
            subjectId: profileId,
            text: `${username} está te seguindo`,
            link: `/users/${this.userId}`
        });
    },
    unfollowProfile: function(profileId) {
        Meteor.users.update(this.userId, {
            $pull: {
                'profile.following': profileId
            }
        });
        Meteor.users.update(profileId, {
            $pull: {
                'profile.followers': this.userId
            }
        });
    },
    viewNotifications: function() {
        console.log('trying to view');
        Meteor.users.update(this.userId, {
            $set: {
                'hasNotifications': false
            }
        });
    }
});