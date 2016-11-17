import "./users.html";

Template.user_summaries.helpers({
	users() {
		let users = Meteor.users.find({});
		console.log(users);
		return users;
	}
});
