import {
	Template
} from 'meteor/templating';

import {
	Posts
} from '../api/posts.js';

import './body.html';

Template.body.helpers({
	posts() {
		return Posts.find({}, {
			sort: {
				createdAt: -1
			}
		});
	}
});

Template.post.editableTitle = function () {
	console.log("editableTitle");
  return '<div class="title" contenteditable="true">' + this.title + '</div>';
};


Template.body.events({
	'click #create-post': function(event) {
		event.preventDefault();

		Posts.insert({
			title: 'untitled' + Math.floor(Math.random() * 100),
			author: "unauthored",
			poster: "",
			description: "",
			time: "",
			lesson: "",
			createdAt: Date.now()
		});

	},


	'blur .post .title': function(event) {
		let t = event.target.innerText;
		t = t.trim();
		console.log("edit", this);
		Posts.update(this._id, {
			$set: {title: t},
		});
		// event.target.innerText = t;

	},

	'click .kill-post': function(event) {
		console.log("kill kill kill", this);
		Posts.remove(this._id);
	}
});
