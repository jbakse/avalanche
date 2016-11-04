import {Template} from 'meteor/templating';
import {Posts} from '../api/posts.js';
import '../api/users.js';
import './page_user.html';


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
	}
});



Template.page_user.events({
	'click .log-out': function(event) {
		Meteor.logout();
	},

	'click .remove-user': function(event) {
		console.log('dead', FlowRouter.getParam("userId"));
		Meteor.users.remove(FlowRouter.getParam("userId"));
	},

	'submit #updateUserForm': function(event, template) {
		event.preventDefault();

		let first_name = template.find('.first-name').value || "Unknown";
		let last_name = template.find('.last-name').value || "Author";

		Meteor.users.update(this._id, {
			$set: {
				"profile.first_name": first_name,
				"profile.last_name": last_name
			}
		});

		Meteor.call('posts.updateAuthor', this._id, first_name + " " + last_name);
	}
});
