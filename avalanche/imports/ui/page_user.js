import {Template} from "meteor/templating";
import {Posts} from "../api/posts.js";
import {getPrefs} from "../api/prefs.js";

import "../api/users.js";
import "./page_user.html";

Template.page_user.helpers({
	user() {
		let id = FlowRouter.getParam("userId");
		// console.log(Meteor.users.findOne(id));
		return Meteor.users.findOne(id);
	},

	posts() {
		let id = FlowRouter.getParam("userId");
		return Posts.find({
			author_id: id
		}, {
			sort: {
				created_at: -1
			}
		});
	},

	sketch_count() {
		let id = FlowRouter.getParam("userId");
		let sketch_count = Posts.find({author_id: id}).count();

		return sketch_count;
	},

	weeks() {
		let prefs = getPrefs();
		if (!prefs)
			return;


		let userId = FlowRouter.getParam("userId");
		console.log(userId);

		let weeks = prefs.weeks;
		let counts = [];

		_.each(weeks, function(week) {

			let posts = Posts.find({
				"author_id": userId,
				"created_at":
				{
					$gte: week.start,
					$lt: week.end,
				}

			});

			counts.push({
				topic: week.topic,
				start: week.start,
				end: week.end,
				week_posts: posts,
				count: posts.count(),
			});
		});


		return counts;

		// return [{
		// 	name: "magic",
		// 	count: 3
		// }];
	},
});

Template.page_user.events({
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

	"click .edit-user": function(/*event*/) {

		Session.set("editing_user", this._id);

	},

	"click .remove-user": function(/*event*/) {
		console.log("dead", FlowRouter.getParam("userId"));
		Meteor.users.remove(FlowRouter.getParam("userId"));
	},

	"submit #updateUserForm": function(event, template) {
		event.preventDefault();
		console.log("submit #updateUserForm");

		let first_name = template.find(".first-name").value || "Unknown";
		let last_name = template.find(".last-name").value || "Author";

		Meteor.call("users.updateName", {
			user_id: this._id,
			first_name,
			last_name,
		});
	},
});

Template.page_user.rendered = function() {
	console.log("rendered posts");
	let posts = this.find(".posts");
	window.isotope = new Isotope(posts, {
		// options...
		itemSelector: ".post",
		sortBy: "original-order",
		transitionDuration: 0,
		masonry: {
			isFitWidth: true,
			// columnWidth: 250,
		},
	});

};
