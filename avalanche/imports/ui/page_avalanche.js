import { Template } from "meteor/templating";
import { getPrefs, currentWeek } from "../api/prefs.js";
import { Posts } from "../api/posts.js";


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

	active() {

		if (this.topic === Session.get("active_topic")) {
			return "active";
		}
	},

	posts() {
		let active_topic = Session.get("active_topic");
		if (!active_topic) {
			return recent_posts();
		}
		return topic_posts(active_topic);
		// return posts();

	},

	postsCount() {
		return posts().count();
	},

	// posts_this_week() {
	// 	let prefs = getPrefs();
	// 	if (!prefs) {
	// 		return;
	// 	}



	// 	let weeks = prefs.weeks;
	// 	let week = _.find(weeks, function (week) {
	// 		return week.start < new Date() && week.end > new Date();
	// 	});

	// 	if (!week) {
	// 		return;
	// 	}

	// 	let posts = Posts.find({

	// 		"created_at": {
	// 			$gte: week.start,
	// 			$lt: week.end,
	// 		}
	// 	});

	// 	return posts.count();
	// },


	weeks() {
		let prefs = getPrefs();
		if (!prefs) {
			return;
		}


		let weeks = prefs.weeks;
		let current_week = currentWeek();


		// set to the current week active if there is a current week
		if (current_week && current_week.topic) {
			Session.setDefault("active_topic", current_week.topic);
		}

		// console.log(weeks);
		// otherwise set most recent week active
		Session.setDefault("active_topic", _.first(weeks).topic);
		// Session.setDefault("active_topic", _.findLast(weeks, {}).topic);



		let counts = [];

		_.each(weeks, function(week) {
			let posts = Posts.find({
				"posted": true,
				"lesson": week.topic,
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

	active_week() {
		let prefs = getPrefs();
		if (!prefs)
			return;

		let week = _.find(prefs.weeks, (week) => {
			return week.topic === Session.get("active_topic");
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



		return result;

	},


});


Template.page_avalanche.events({
	"click .show-week": function(event) {
		Session.set("active_topic", this.topic);
	},

	"click .show-all": function(event) {

		Session.set("active_topic", false);
	},
});