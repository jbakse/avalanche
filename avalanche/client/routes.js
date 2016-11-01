FlowRouter.route('/', {
	name: 'avalanche',
    action: function() {
        BlazeLayout.render("layout_main", {content: "page_avalanche"});
    }
});

FlowRouter.route('/post/:postId', {
    name: 'post',
    action: function(params) {
        BlazeLayout.render("layout_main", {content: "page_post"});
    }
});


FlowRouter.route('/user/:userId', {
    name: 'user',
    action: function(params) {
        BlazeLayout.render("layout_main", {content: "page_user"});
    }
});
