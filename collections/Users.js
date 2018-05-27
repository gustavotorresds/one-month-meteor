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
    }
});