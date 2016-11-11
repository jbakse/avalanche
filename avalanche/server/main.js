import "../imports/api/posts.js";
import "../imports/api/users.js";
// import "./secrets.js";

Cloudinary.config ({
	cloud_name: Meteor.settings.cloud_name,
	api_key: Meteor.settings.api_key,
	api_secret: Meteor.settings.api_secret,
});


// import { Meteor } from 'meteor/meteor';
//
// Meteor.startup(() => {
//   // code to run on server at startup
// });
