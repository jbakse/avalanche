
Template.registerHelper("formatDate", function(date) {
	return moment(date).format("MMMM Do");
});

Template.registerHelper("formatTime", function(date) {
	return moment(date).format("h:mm a");
});

Template.registerHelper("equals", function (a, b) {
	return a === b;
});

// Template.registerHelper("user_profile", function () {
// 	return Meteor.user().profile;
// });
