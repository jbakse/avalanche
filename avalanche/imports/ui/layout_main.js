import "./layout_main.html";

Template.layout_main.events({

	"click .sign-out" : function(/*event*/) {
		console.log("logoyt");
		Meteor.logout();
	},

});
