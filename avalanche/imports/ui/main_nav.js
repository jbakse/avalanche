import "./main_nav.html";

Template.registerHelper("creating_post",()=>{return Session.get("creating_post");});

Template.main_nav.events({

	"change .create-post-file": function(event, template) {

		event.preventDefault();

		Meteor.call("posts.insert", {}, function(error, id){
			if (error) {
				console.error(error);
				return;
			}
			// upload image + add to post
			let files = template.find(".create-post-file").files;
			Cloudinary.upload(files, {
				folder: "avalanche",
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
	"click .create-post": function(/*event*/){
		console.log("start");
		//Session.set("creating_post", true);
		Meteor.call("posts.insert", {}, function(error, id) {
			Session.set("creating_post", id);
		});
	},

	"click .toggle-admin": function(event) {
		console.log("click");
		event.stopPropagation();
		event.preventDefault();

		Meteor.call("toggleAdmin");
	},

	"click #at-signIn, click #at-signUp": function (event) {
		console.log("click");
		event.stopPropagation();
		event.preventDefault();
	}
});

Template.main_nav.helpers({
	userIsAdmin() {
		return Roles.userIsInRole(Meteor.userId(), ["admin"], Roles.GLOBAL_GROUP);
	}

});
