import "./posts.html";

Template.post.events({
	"click .remove-post": function(event) {
		Meteor.call("posts.remove", this._id);
	}
});
