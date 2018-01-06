// config
import "../imports/startup/accounts-config.js";

// global
import "./helpers.js";

// layouts
import "../imports/ui/layout_main.js";

// pages
import "../imports/ui/page_avalanche.js";
import "../imports/ui/page_post.js";
import "../imports/ui/page_user.js";
import "../imports/ui/page_prefs.js";

// modules
import "../imports/ui/main_nav.js";
import "../imports/ui/posts.js";
import "../imports/ui/users.js";

// libs
import "../imports/ui/classie.js";
import "../imports/ui/selectFx.js";

$.cloudinary.config({
	cloud_name: "jbakse"
});

AccountsTemplates.configure({
	enablePasswordChange: true,
	sendVerificationEmail: true,
	showForgotPasswordLink: true,
	// showResendVerificationEmailLink: true,
	continuousValidation: true,
	negativeValidation: true,
	positiveValidation: true,
	negativeFeedback: true,
	positiveFeedback: true,
	showValidating: true,
});

AccountsTemplates.addField({
	_id: "first_name",
	type: "text",
	displayName: "First Name / Prefered Name",
	required: true
});

AccountsTemplates.addField({
	_id: "last_name",
	type: "text",
	displayName: "Last Name",
	required: true
});


Meteor.subscribe("users");
Meteor.subscribe("prefs");

Meteor.subscribe("posts");

// Meteor.subscribe("recent_posts");

// setTimeout(function () {
// 	Meteor.subscribe("posts");
// }, 3000);