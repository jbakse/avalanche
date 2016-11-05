import {Mongo} from 'meteor/mongo';

PostSchema = new SimpleSchema({
	author: {
		type: String,
		label: "Author",
		defaultValue: ""
	},
	author_id: {
		type: String,
		label: "Author ID",
		defaultValue: "",
		// optional: true,
		// regex: SimpleSchema.RegEx.Id,
	},
	created_at: {
		type: Date,
		label: "Created At"
	},
	poster: {
		type: String,
		label: "Poster Image",
		defaultValue: "",
		// regex: SimpleSchema.RegEx.Url,
	},
	resource_type: {
		type: String,
		label: "Resource Type",
		defaultValue: ""
	},
	cloudinary: {
		type: Object,
		label: "Cloudinary Data",
		blackbox: true,
		defaultValue: {}
	},
	lesson: {
		type: String,
		label: "Lesson",
		defaultValue: ""
	},
	title: {
		type: String,
		label: "Title",
		defaultValue: "",
		max: 10
	},
	description: {
		type: String,
		label: "Description",
		defaultValue: ""
	}
});

export const Posts = new Mongo.Collection('posts');
Posts.attachSchema(PostSchema);

Posts.allow({
	update: function() {
		console.log("validate");
		return true;
	}
});




Meteor.methods({
	'posts.insert' (data) {
		// create post
		let id = Posts.insert({author: data.author, author_id: data.author_id, lesson: data.lesson, created_at: new Date()});

		return id;

	},

	'posts.remove' (id) {
		console.error("verify!");
		Posts.remove(id);
	},

	'posts.updateMedia' (id, data) {
		Posts.update(id, {
			$set: {
				poster: data.public_id,
				resource_type: data.resource_type,
				cloudinary: data
			}
		});
	},


	'posts.updateAuthor' (author_id, name) {
		// console.log("update author", value);
		Posts.update({
			author_id: author_id
		}, {
			$set: {
				"author": name
			}
		}, {multi: true});
	}
});
