import {
	Template
} from 'meteor/templating';
import {
	Posts
} from '../api/posts.js';
import './page_avalanche.html';


Template.page_avalanche.helpers({
	posts() {
		return Posts.find({}, {
			sort: {
				createdAt: -1
			}
		});
	}
});


Template.post_create.events({
	'submit .post-create': function(event, template) {
		event.preventDefault();
		let title = template.find('.title').value || "untitled";
		Posts.insert({
			title: title,
			author: Meteor.user().username,
			author_id: Meteor.userId(),
			poster: "",
			description: "",
			time: "",
			lesson: "",
			createdAt: Date.now()
		});
	},
});


Template.post_summary.events({
	'click .kill-post': function(event) {
		console.log("kill kill kill", this);
		Posts.remove(this._id);
	}
});
