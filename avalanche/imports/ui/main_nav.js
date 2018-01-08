import "./main_nav.html";



Template.main_nav.events({

	"change .create-post-file": function(event, template) {

		event.preventDefault();

		Meteor.call("posts.insert", {}, function(error, id) {
			if (error) {
				console.error(error);
				return;
			}
			// upload image + add to post
			let files = template.find(".create-post-file").files;
			Cloudinary.upload(files, {
				folder: Meteor.settings.public.cloudinary_folder,
				resource_type: "auto"
			}, (err, res) => {
				console.log("Upload Error:", err);
				console.log("Upload Result:", res);
				if (!err) {
					Meteor.call("posts.updateMedia", id, res);
				}
			});
		});


	},
	"click .create-post": function( /*event*/ ) {
		Meteor.call("posts.insert", {}, function(error, id) {
			Session.set("editing_post", id);
		});
	},

	"click .toggle-admin": function(event) {
		console.log("click");
		event.stopPropagation();
		event.preventDefault();

		Meteor.call("toggleAdmin");
	},

	"click #at-signIn, click #at-signUp": function(event) {
		console.log("click");
		event.stopPropagation();
		event.preventDefault();
	}
});

Template.main_nav.helpers({
	userIsAdmin() {
		return Roles.userIsInRole(Meteor.userId(), ["admin"], Roles.GLOBAL_GROUP);
	},
	userMayAdmin() {
		return Roles.userIsInRole(Meteor.userId(), ["may_admin"], Roles.GLOBAL_GROUP);
	}

});