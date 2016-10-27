FlowRouter.route('/', {
	name: 'avalanche',
    action: function() {
        BlazeLayout.render("mainLayout", {content: "avalanche"});
    }
});

FlowRouter.route('/post/:postId', {
    name: 'post',
    action: function(params) {
        BlazeLayout.render("mainLayout", {content: "post"});
    }
});
