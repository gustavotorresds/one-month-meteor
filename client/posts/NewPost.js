Template.NewPost.events({
    'change .myFileInput': function(event, template) {
        FS.Utility.eachFile(event, function(file) {
            Images.insert(file, function(err, fileObj) {
                if(err) {
                    // TODO: handle error
                } else {
                    var imagesURL = {
                        "profile.image": "/cfs/files/images/" + fileObj._id
                    };
                    console.log('IMAGE: ', imagesURL);
                }
            })
        });
    }
});