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
		label: "Start Date",
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
		autoform: {
			rows: 10
		},
	},

	weeks: {
		type: [WeekSchema],
		label: "Weeks",
		optional: true,
		defaultValue: [],
	},
});




export const Prefs = new Mongo.Collection("prefs");

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
