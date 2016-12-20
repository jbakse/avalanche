// import {Users} from "../api/users.js";
import "./users.html";

Template.user_summaries.helpers({
	users() {
		let users = Meteor.users.find({});
		// console.log(users);
		return users;
	}
});

Template.edit_user_form.helpers({
	user() {
		return Meteor.users.findOne(this.user_id);
	}
});





Template.edit_user_form.events({
	"click .cancel": function() {
		event.preventDefault();
		Session.set("editing_user", false);
	},

	"click .submit": function(event, template) {
		event.preventDefault();
		// console.log("submit", this._id);
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

	"change .upload-headshot-file": function(event, template) {

		event.preventDefault();
		console.log("upload", this);
		let files = template.find(".upload-headshot-file").files;
		Cloudinary.upload(files, {
			folder: "avalanche",
			resource_type: "image",
		}, (err, res) => {
			console.log("Upload Error:", err);
			console.log("Upload Result:", res);
			console.log(res);

			let data = {
				user_id: this._id,
				res,
			};
			if (!err) {
				console.log("data in", data);
				Meteor.call("users.updateHeadshot", data);
			}
		});

	},


	"change .upload-file": function(event, template) {
		event.preventDefault();
		console.log("upload", this);

		let files = template.find(".upload-file").files;
		Cloudinary.upload(files, {
			folder: "avalanche",
			resource_type: "image",
		}, (err, res) => {
			console.log("Upload Error:", err);
			console.log("Upload Result:", res);
			console.log(res);

			let data = {
				user_id: this.user_id,
				res,
			};
			if (!err) {
				console.log("data in", data);
				Meteor.call("users.updateHeadshot", data);
			}
		});


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

		// 	}
		// });

	},

});
