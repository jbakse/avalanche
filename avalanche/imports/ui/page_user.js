import { Template } from 'meteor/templating';
import {Posts} from '../api/posts.js';

import '../api/users.js';

import './page_user.html';

Template.page_user.events({
	'click .log-out': function(event) {
        Meteor.logout();
    }

});
Template.page_user.helpers({
	user() {
		let id = FlowRouter.getParam("userId");

		console.log(Meteor.users.findOne(id));
		return Meteor.users.findOne(id);
	},


	posts() {
		let id = FlowRouter.getParam("userId");
		return Posts.find({author_id: id}, {
			sort: {
				createdAt: -1
			}
		});
	}


});
