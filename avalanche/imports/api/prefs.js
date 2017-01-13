import {Mongo} from "meteor/mongo";
import {userIsAdmin} from "./users.js";

let WeekSchema = new SimpleSchema({
	topic: {
		type: String,
		label: "Topic",
		defaultValue: "lorem"
	},
	start: {
		type: Date,
		label: "Start Date",

		// autoform: {
		// 	type: "datetime-local"
		// },
	},
	end: {
		type: Date,
		label: "End Date",
		// defaultValue: new Date(),
		// autoform: {
		// 	type: "datetime-local"
		// },
	},
});

let PrefsSchema = new SimpleSchema({
	avalanche_message: {
		type: String,
		label: "Avalanche Message",
		defaultValue: "Hello, Avalanche!",
		optional: true,
		autoform: {
			rows: 10
		},
	},

	site_title: {
		type: String,
		label: "Site Title",
		defaultValue: "Avalanche",
		optional: false
	},

	weeks: {
		type: [WeekSchema],
		label: "Weeks",
		optional: true,
		defaultValue: [],
	},
});




export const Prefs = new Mongo.Collection("prefs");
export const getPrefs = function(){
	let prefs = Prefs.find({});
	prefs = prefs.fetch()[0];
	return prefs;
};

Prefs.attachSchema(PrefsSchema);

Meteor.methods({});

Prefs.allow({
	update: function() {
		if (userIsAdmin()) {
			return true;
		}
		return false;
	}
});

// export const currentWeek = function() {
// 	let prefs = getPrefs();
// 	if (!prefs) {
// 		return;
// 	}
//
// 	let weeks = prefs.weeks;
// 	let week = _.find(weeks, function(week) {
// 		return week.start < new Date() && week.end > new Date();
// 	});
// 	if (!week) {
// 		return;
// 	}
// 	return week;
// };
export const currentWeek = function() {
	return weekForDate(new Date());
};

export const weekForDate = function(_date) {
	let prefs = getPrefs();
	if (!prefs) {
		return;
	}

	let weeks = prefs.weeks;
	let i = 1;
	_.map(weeks, function(week) {
		week.num = i++;
		return week;
	});

	let week = _.find(weeks, function(week) {
		return week.start < _date && week.end > _date;
	});
	if (!week) {
		return;
	}
	return week;
};
