Meteor.subscribe('images');

Template.NewPost.onCreated(function() {
    this.file = new ReactiveVar(null);
});

/*
 * TODO: shouldn't be able to use Images.insert because it's a server-side op.
 */
Template.NewPost.events({
    'submit .newPost': function(event, template) {
        event.preventDefault();
        var text = event.target.text.value;
        var file = template.file.get();
        Images.insert(file, function (err, fileObj) {
          if (err){
            console.log('ERRO');
             // handle error
          } else {
             // handle success depending what you need to do
            Meteor.call('insertPost', text, fileObj._id);
          }
        });
     
    },
    'change .myFileInput': function(event, template) {
        FS.Utility.eachFile(event, function(file) {
            template.file.set(file);
        });
    }
});