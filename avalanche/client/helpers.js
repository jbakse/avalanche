
Template.registerHelper("formatDate", function(date) {
	return moment(date).format("MMMM Do");
});

Template.registerHelper("formatTime", function(date) {
	return moment(date).format("h:mm a");
});

Template.registerHelper("equals", function (a, b) {
	return a === b;
});


Template.registerHelper("editing_post",()=>{return Session.get("editing_post");});
Template.registerHelper("editing_user",()=>{return Session.get("editing_user");});
Template.registerHelper("previewing_post",()=>{return Session.get("previewing_post");});

// Template.registerHelper("user_profile", function () {
// 	return Meteor.user().profile;
// });
