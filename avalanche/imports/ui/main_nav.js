import './main_nav.html';

Template.main_nav.events({

	'change .create-post-file': function(event, template) {

		event.preventDefault();

		Meteor.call('posts.insert', {
			author: Meteor.user().profile.first_name + " " + Meteor.user().profile.last_name,
			author_id: Meteor.userId(),
			lesson: "design",
		}, function(error, id){
			if (error) {
				console.error(error);
				return;
			}
			// upload image + add to post
			let files = template.find('.create-post-file').files;
			let cid = Cloudinary.upload(files, {
				folder: "avalanche",
				resource_type: "auto"
			}, (err, res) => {
				console.log(`Upload Error:`, err);
				console.log(`Upload Result:`, res);
				if (!err) {
					Meteor.call('posts.updateMedia', id, res);
				}
			});
		});


	}
});
