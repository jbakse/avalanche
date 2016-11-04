import './posts.html';


Template.post.events({
    'click .remove-post': function(event) {
        Posts.remove(this._id);
    }
});
