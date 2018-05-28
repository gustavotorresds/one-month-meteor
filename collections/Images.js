/*
 * TODO: search the best way of having standard pictures for profile. Should
 * we do it on the backend of the frontend?
 */

var imageStore = new FS.Store.GridFS("images");

Images = new FS.Collection("images", {
    stores: [imageStore]
});

// TODO: review permissions
Images.allow({
    insert: function() {
        return true;
    },
    remove: function() {
        return true;
    },
    update: function() {
        return true;
    },
    download: function(){
        return true;
    }
});
