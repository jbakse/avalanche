import "../imports/api/posts.js";
import "../imports/api/users.js";
import {Prefs} from "../imports/api/prefs.js";

function initPrefs() {
	let prefs = Prefs.find({});
	if (prefs.count() > 0) {
		return;
	}
	Prefs.insert({});
}

initPrefs();

//justin
// Accounts.setPassword("joe4aiE9joCw5nBDW", "!");
//dorothy
//let x = Accounts.setPassword("k6gnCbB6zdzToxdPC", "cd_april_291");
//console.log("x" + x);


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
