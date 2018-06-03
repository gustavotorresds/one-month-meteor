/*
 * TODO: should we subscribe to 'images'?
 * TODO: check whether image load/update are ok, I feel like there's a better
 * way to implement this.
 */
Slingshot.fileRestrictions("myFileUploads", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited).
});
 
Template.NewPost.onCreated(function() {
    this.imageId = new ReactiveVar(null);
    this.imageUrl = new ReactiveVar(null);
    Meteor.subscribe('images');
});

Template.NewPost.helpers({
  authorUsername: function() {
      var authorUsername = Meteor.users.findOne({_id: Meteor.userId()}).username;
      return authorUsername;
  }
});

Template.NewPost.events({
    'submit .newPost': function(event, template) {
        event.preventDefault();
        var text = event.target.text.value;
        // var imageId = template.imageId.get();
        var imageUrl = template.imageUrl.get();

        Meteor.call('insertPost', text, imageUrl, "none");

        event.target.text.value = '';
        event.target.image.value = '';
        // template.imageId.set(null);
        template.imageUrl.set(null);
    },
    'change .myFileInput': function(event, template) {
      let uploader = new Slingshot.Upload("myFileUploads");
      let file = event.target.files[0];

      uploader.send(file, function (error, downloadUrl) {
        if (error) {
          // Log service detailed response.
          console.error('Error uploading', uploader.xhr.response);
          alert (error);
        }
        else {
          console.log('URL: ', downloadUrl);
          template.imageUrl.set(downloadUrl);
        }
      });
      // FS.Utility.eachFile(event, function(file) {
      //     var imageId = template.imageId.get();
      //     if(imageId) {
      //       Images.remove(imageId);
      //     }
      //     Images.insert(file, function (err, fileObj) {
      //       if (err) {
      //         // TODO: handle error appropriately
      //         console.log('ERRO: ', err);
      //       } else {
      //         Meteor.subscribe('singleImage', fileObj._id);
      //         template.imageId.set(fileObj._id);
      //       }
      //     });
      // });
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
