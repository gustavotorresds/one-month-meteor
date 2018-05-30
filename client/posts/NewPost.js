/*
 * TODO: should we subscribe to 'images'?
 * TODO: check whether image load/update are ok, I feel like there's a better
 * way to implement this.
 */
Template.NewPost.onCreated(function() {
    this.imageId = new ReactiveVar(null);
    Meteor.subscribe('images');
});

Template.NewPost.helpers({
  authorUsername: function() {
      var authorUsername = Meteor.users.findOne({_id: Meteor.userId()}).username;
      return authorUsername;
  },
  getImage: function() {
    var imageId = Template.instance().imageId.get();
    return (imageId ? Images.findOne({_id: imageId}) : {});
  }
});

Template.NewPost.events({
    'submit .newPost': function(event, template) {
        event.preventDefault();
        var text = event.target.text.value;
        // var filter = document.querySelector('input[name=filter]:checked').value;
        var imageId = template.imageId.get();

        Meteor.call('insertPost', text, imageId, "none");

        event.target.text.value = '';
        event.target.image.value = '';
        template.imageId.set(null);
    },
    'change .myFileInput': function(event, template) {
      FS.Utility.eachFile(event, function(file) {
          var imageId = template.imageId.get();
          if(imageId) {
            Images.remove(imageId);
          }
          Images.insert(file, function (err, fileObj) {
            if (err) {
              // TODO: handle error appropriately
              console.log('ERRO: ', err);
            } else {
              Meteor.subscribe('singleImage', fileObj._id);
              template.imageId.set(fileObj._id);
            }
          });
      });
    },
    'click .filterLabel': function(event, template) {
      // TODO: refactor
      var filter = document.querySelector('input[name=filter]:checked').value;
      var img = $('#displayPostImage');
      var currentClass = img.attr('class');
      img.removeClass(currentClass);
      img.addClass('responsive-img ' + filter);
    }
});