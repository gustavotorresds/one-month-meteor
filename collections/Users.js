Meteor.methods({
    setUserAvatar: function(imageId) {
        Meteor.users.update(this.userId, {
            $set: {
                'profile.avatarId': imageId
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
    initializeUserValues: function() {
        console.log('UPDATING USER VARS');
        Meteor.users.update(this.userId, {
            $set: {
                'profile.following': [],
                'profile.followers': []
            }
        });
    }
});