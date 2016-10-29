import { Template } from 'meteor/templating';
import {Posts} from '../api/posts.js';

import './page_user.html';

Template.page_user.helpers({
	user() {
		let id = FlowRouter.getParam("userId");
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
