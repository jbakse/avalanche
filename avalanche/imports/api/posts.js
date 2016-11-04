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

Meteor.methods({
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
