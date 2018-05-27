Meteor.subscribe('images');
Meteor.subscribe('users');

Template.EditProfile.helpers({
  image: function() {
    var image = Images.findOne({_id: userInfo().profile.avatarId});
    image = (image ? image : {});
    return image;
  },
  user: function() {
    return userInfo();
  }
});

Template.EditProfile.events({
  'change .profileFileInput': function(event, template) {
      FS.Utility.eachFile(event, function(file) {
          Images.insert(file, function (err, fileObj) {
            if (err) {
              // TODO: handle error appropriately
              console.log('ERRO: ', err);
            } else {
              Meteor.call('setUserAvatar', fileObj._id);
            }
          });
      });
    },
    'submit .profileForm': function(event, template) {
      event.preventDefault();
      var bio = event.target.bio.value;
      var city = event.target.city.value;
      var name = event.target.name.value;

      Meteor.call('updateProfile', bio, city, name);
    }
});

const userInfo = function() {
  return Meteor.users.findOne({_id: Meteor.userId()});
}