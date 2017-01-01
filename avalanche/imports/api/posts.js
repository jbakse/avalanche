import {Mongo} from "meteor/mongo";
import {userIsAdmin} from "./users.js";

let PostSchema = new SimpleSchema({
	author: {
		type: String,
		label: "Author",
		defaultValue: "",
	},
	author_id: {
		type: String,
		label: "Author ID",
		defaultValue: "",
		// optional: true,
		// regex: SimpleSchema.RegEx.Id,,,,,,,,,,,,
	},
	created_at: {
		type: Date,
		label: "Created At",
	},
	posted: {
		type: Boolean,
		label: "Posted",
		defaultValue: false,
	},
	// poster: {
	// 	type: String,
	// 	label: "Poster Image",
	// 	defaultValue: "",
	// 	// regex: SimpleSchema.RegEx.Url,,,,,,,,,,,
	// },
	// resource_type: {
	// 	type: String,
	// 	label: "Resource Type",
	// 	defaultValue: ""
	// },
	cloudinary_media: {
		type: [Object],
		label: "Cloudinary Data",
		blackbox: true,
		defaultValue: [
			{}, {}, {},
		],
	},
	lesson: {
		type: String,
		label: "Lesson",
		defaultValue: "",
	},
	title: {
		type: String,
		label: "Title",
		defaultValue: "",
		max: 10,
	},
	description: {
		type: String,
		label: "Description",
		defaultValue: "",
		optional: true
	},

	inspiration_name: {
		type: String,
		label: "Inspiration Name",
		optional: true,
		defaultValue: "",
	},

	inspiration_url: {
		type: String,
		label: "Inspiration URL",
		optional: true,
		defaultValue: "",
	}
});

export const Posts = new Mongo.Collection("posts");
Posts.attachSchema(PostSchema);

Posts.allow({
	update: function(userId, doc/*, fields, modifier*/) {
		if (userIsAdmin()) {
			return true;
		}
		if (userId === doc.author_id) {
			return true;
		}
		return false;
	}
});

export const postEditableBy = function(post, user_id) {
	if (!post) {
		return false;
	}
	return (post.author_id === user_id) || userIsAdmin();
};

Meteor.methods({
	"posts.insert" () {
		// create post
		let data = {
			author_id: this.userId,
			author: Meteor.user().profile.first_name + " " + Meteor.user().profile.last_name,
			lesson: "design",
			created_at: new Date(),
		};

		let id = Posts.insert(data);

		return id;
	},

	"posts.remove" (id) {
		console.log("id", id);
		let post = Posts.findOne(id);
		if (!postEditableBy(post, this.userId)) {
			throw new Meteor.Error("unauthorized");
		}

		console.log("killing " + id);
		if (Meteor.isServer) {
			// if (!post.poster) {
			// 	Posts.remove(id);
			// 	return;
			// }
			// Cloudinary.uploader.destroy(post.poster, Meteor.bindEnvironment((result) => {
			// 	if (result.result === "ok" || result.result === "not found") {
			// 		Posts.remove(id);
			// 	}
			// }));

			if (post.cloudinary_media[0].public_id) {
				Cloudinary.uploader.destroy(post.cloudinary_media[0].public_id);
			}
			if (post.cloudinary_media[1].public_id) {
				Cloudinary.uploader.destroy(post.cloudinary_media[1].public_id);
			}
			if (post.cloudinary_media[2].public_id) {
				Cloudinary.uploader.destroy(post.cloudinary_media[2].public_id);
			}
			Posts.remove(id);
		}
	},

	"posts.mark_posted" (id) {
		let post = Posts.findOne(id);
		if (!postEditableBy(post, this.userId)) {
			throw new Meteor.Error("unauthorized");
		}
		Posts.update(id, {
			$set: {
				posted: true
			}
		});
	},

	"posts.updateMedia" (id, slot, cloudinary_data) {
		let post = Posts.findOne(id);
		if (!postEditableBy(post, this.userId)) {
			throw new Meteor.Error("unauthorized");
		}

		// update slot with new data
		post.cloudinary_media[slot] = cloudinary_data;

		// shift media down to fill empty slots
		for (let n = 0; n < 2; n++) {
			if (_.isEmpty(post.cloudinary_media[n + 0]) && !_.isEmpty(post.cloudinary_media[n + 1])) {
				post.cloudinary_media[n + 0] = post.cloudinary_media[n + 1];
				post.cloudinary_media[n + 1] = {};
			}
		}

		Posts.update(id, {
			$set: {
				cloudinary_media: post.cloudinary_media
			}
		});
	}
});
