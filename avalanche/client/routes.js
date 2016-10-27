FlowRouter.route('/', {
    action: function() {
        BlazeLayout.render("mainLayout", {content: "avalanche"});
    }
});

FlowRouter.route('/post/:postId', {
    name: 'post',
    action: function(params) {
        console.log("Show Post:", params.postId);
        BlazeLayout.render("mainLayout", {content: "post"});
    }
});
