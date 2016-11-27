import {Users} from "../api/users.js";
import "./users.html";

Template.user_summaries.helpers({
	users() {
		let users = Meteor.users.find({});
		console.log(users);
		return users;
	}
});

Template.edit_user_form.helpers({
	user() {
		return Meteor.users.findOne(Session.get("editing_user"));
	}
});





Template.edit_user_form.events({
	"click .cancel": function() {
		console.log("cancel");
		//Meteor.call("posts.remove", Session.get("creating_post"));
		Session.set("editing_user", false);
	},

	"click .submit": function(event, template) {
		console.log("submit", this._id);
		let first_name = template.find("#first-name").value || "Unknown";
		let last_name = template.find("#last-name").value || "Author";
		let description = template.find("#description").value || "";

		Meteor.call("users.updateName", {
			user_id: this._id,
			first_name: first_name,
			last_name: last_name
		});

		Meteor.call("users.updateDescription", {
			user_id: this._id,
			description: description
		});

		//make sure it worked!
		Session.set("editing_user", false);
	},

	"change .upload-file": function(event, template) {
		// console.log("clicknow");
		//
		// let files = template.find(".upload-file").files;
		// Cloudinary.upload(files, {
		// 	folder: "avalanche",
		// 	resource_type: "auto"
		// }, (err, res) => {
		// 	console.log("Upload Error:", err);
		// 	console.log("Upload Result:", res);
		// 	if (!err) {
		// 		Meteor.call("posts.updateMedia", Session.get("creating_post"), res);
		// 	}
		// });

	},

});
