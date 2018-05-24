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