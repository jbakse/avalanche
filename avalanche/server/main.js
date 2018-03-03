import "../imports/api/posts.js";
import "../imports/api/users.js";
import { Prefs } from "../imports/api/prefs.js";
import { Posts } from "../imports/api/posts.js";

function initPrefs() {
	let prefs = Prefs.find({});
	if (prefs.count() > 0) {
		return;
	}
	Prefs.insert({});
}


initPrefs();



Accounts.emailTemplates.from = "Justin Bakse <baksej@newschool.edu>";
// console.log("Accounts", Accounts);
// console.log("settings", Meteor.settings);

// this is dumb, but i'm not sure what the right way to set the env variable is
process.env.MAIL_URL = Meteor.settings.MAIL_URL;


// console.log("env", process.env);



//justin
// Accounts.setPassword("joe4aiE9joCw5nBDW", "!");



// import "./secrets.js";

Cloudinary.config({
	cloud_name: Meteor.settings.cloud_name,
	api_key: Meteor.settings.api_key,
	api_secret: Meteor.settings.api_secret,
});



// import { Meteor } from 'meteor/meteor';
//
// Meteor.startup(() => {
//   // code to run on server at startup
// });


Picker.route('/posts/:_id/code', function(params, req, res, next) {
	var post = Posts.findOne(params._id);
	res.setHeader('content-type', 'application/javascript');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.end(post.code);
});