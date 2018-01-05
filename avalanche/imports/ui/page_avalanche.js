import {
	Template
} from "meteor/templating";

import {
	getPrefs
} from "../api/prefs.js";

import {
	Posts
} from "../api/posts.js";


import "./page_avalanche.html";
// import {
// 	log
// } from "util";

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

function recent_posts(limit = 2) {
	let posts = Posts.find({
		posted: true
	}, {
		limit: limit,
		sort: {
			created_at: -1
		}
	});
	return posts;
}

function topic_posts(topic) {
	let posts = Posts.find({
		lesson: topic,
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
		let show_topic = Session.get("show_topic");
		if (!show_topic) {
			return recent_posts();
		}
		return topic_posts(show_topic);
		// return posts();

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
		let week = _.find(weeks, function (week) {
			return week.start < new Date() && week.end > new Date();
		});
		if (!week) {
			return;
		}



		let posts = Posts.find({

			"created_at": {
				$gte: week.start,
				$lt: week.end,
			}
		});

		return posts.count();
	},
	weeks() {
		let prefs = getPrefs();
		if (!prefs)
			return;



		let weeks = prefs.weeks;
		let counts = [];

		_.each(weeks, function (week) {
			let posts = Posts.find({
				"posted": true,
				"lesson": week.topic,
				// "created_at": {
				// 	$gte: week.start,
				// 	$lt: week.end,
				// }
			});

			counts.push({
				topic: week.topic,
				start: week.start,
				end: week.end,
				week_posts: posts,
				count: posts.count(),
			});
		});

		return counts;


	},

	this_week() {
		let prefs = getPrefs();
		if (!prefs)
			return;

		let week = _.find(prefs.weeks, (week) => {
			return week.topic === Session.get("show_topic");
		});

		if (!week) {
			return false;
		}

		let posts = Posts.find({
			"posted": true,
			"lesson": week.topic,
		});

		let result = {
			topic: week.topic,
			start: week.start,
			end: week.end,
			week_posts: posts,
			count: posts.count(),
		}

		console.log(result);

		return result;

	},


});


Template.page_avalanche.events({
	"click .show-week": function (event) {
		console.log("click week", this, event);
		Session.set("show_topic", this.topic);
	},

	"click .show-all": function (event) {
		console.log("click all", this, event);
		Session.set("show_topic", false);
	},
});