import {Template} from "meteor/templating";

import {Posts} from "../api/posts.js";
import "./page_avalanche.html";


function posts() {
	let posts = Posts.find({
		posted: true
	}, {
		sort: {
			created_at: -1
		}
	});
	return posts;
}
Template.page_avalanche.helpers({
	posts() {

		return posts();
	},
	postsCount() {
		return posts().count();
	}
});
