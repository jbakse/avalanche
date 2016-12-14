import {Template} from "meteor/templating";

import {Posts} from "../api/posts.js";
import "./page_avalanche.html";

Template.page_avalanche.helpers({
	posts() {
		let posts = Posts.find({
			posted: true
		}, {
			sort: {
				created_at: -1
			}
		});
		return posts;
	},
});
