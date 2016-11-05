import './posts.html';

Template.post.events({
	'click .remove-post': function(event) {
		console.log(this);
		Cloudinary.delete(this.poster, (err, res) => {
			console.log(`Delete Error:`, err);
			console.log(`Delete Result:`, res);
			if (!err) {
				Meteor.call('posts.remove', this._id);
			}
		});

	}
});
