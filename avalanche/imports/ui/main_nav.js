import './main_nav.html';

Template.main_nav.events({

	'change .create-post-file': function(event, template) {

		event.preventDefault();

		console.log("load");
		// create post
		let id = Posts.insert({
			author: Meteor.user().profile.first_name + " " + Meteor.user().profile.last_name,
			author_id: Meteor.userId(),
			lesson: "design",
			created_at: new Date()
		});

		// upload image + add to post
		let files = template.find('.create-post-file').files;
		let cid = Cloudinary.upload(files, {
			folder: "avalanche",
			resource_type: "auto"
		}, (err, res) => {
			console.log(`Upload Error:`, err);
			console.log(`Upload Result:`, res);
			if (!err) {
				Posts.update(id, {
					$set: {
						poster: res.public_id,
						resource_type: res.resource_type
					}
				});
			}
		});
	}
});
