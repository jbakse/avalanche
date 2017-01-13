// import {Template} from "meteor/templating";
import {Prefs} from "../api/prefs.js";
import "./page_prefs.html";

window.Prefs = Prefs;


Template.page_prefs.helpers({
	userIsAdmin() {
		return Roles.userIsInRole(Meteor.userId(), ["admin"], Roles.GLOBAL_GROUP);
	},
	userMayAdmin() {
		return Roles.userIsInRole(Meteor.userId(), ["may_admin"], Roles.GLOBAL_GROUP);
	}

});
