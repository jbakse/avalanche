
import {Template} from "meteor/templating";

import {getPrefs} from "../api/prefs.js";
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
	},
	posts_this_week() {
		let prefs = getPrefs();
		if (!prefs) {
			return;
		}
		let weeks = prefs.weeks;
		let week = _.find(weeks, function(week) {
			return week.start < new Date() && week.end > new Date();
		});
		if (!week) {
			return;
		}



		let posts = Posts.find({

			"created_at":
			{
				$gte: week.start,
				$lt: week.end,
			}
		});

		

		return posts.count();
	}
});
