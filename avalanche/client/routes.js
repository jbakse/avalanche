FlowRouter.route("/", {
	name: "avalanche",
	action: function() {
		BlazeLayout.render("layout_main", {content: "page_avalanche"});
	}
});


FlowRouter.route("/posts/:postId", {
	name: "post",
	action: function(/*params*/) {
		BlazeLayout.render("layout_main", {content: "page_post"});
	}
});


FlowRouter.route("/users/:userId", {
	name: "user",
	action: function(/*params*/) {
		BlazeLayout.render("layout_main", {content: "page_user"});
	}
});


FlowRouter.route("/prefs", {
	name: "user",
	action: function(/*params*/) {
		BlazeLayout.render("layout_main", {content: "page_prefs"});
	}
});
