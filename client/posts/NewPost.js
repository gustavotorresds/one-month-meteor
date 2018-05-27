Template.NewPost.onCreated(function() {
    this.imageId = new ReactiveVar(null);
});

Template.NewPost.helpers({
  getImage: function() {
    var imageId = Template.instance().imageId.get();
    return (imageId ? Images.findOne({_id: imageId}) : {});
  }
});

/*
 * TODO: shouldn't be able to use Images.insert because it's a server-side op.
 */
Template.NewPost.events({
    'submit .newPost': function(event, template) {
        event.preventDefault();
        var text = event.target.text.value;
        var filter = document.querySelector('input[name=filter]:checked').value;
        var imageId = template.imageId.get();

        Meteor.call('insertPost', text, imageId, filter);

        event.target.text.value = '';
        event.target.text.value = '';

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