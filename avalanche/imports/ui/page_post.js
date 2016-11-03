import {
	Template
} from 'meteor/templating';
import {
	Posts
} from '../api/posts.js';
import './page_post.html';

window.Posts = Posts;

Template.registerHelper('formatDate', function(date) {
	return moment(date).format('MMMM Do');
});

Template.registerHelper('equals', function (a, b) {
    return a === b;
});


Template.registerHelper('formatTime', function(date) {
	return moment(date).format('h:mm a');
});



Template.page_post.helpers({
	post() {
		console.log("posthelper");
		var id = FlowRouter.getParam("postId");
		console.log(id);
		var cursor = Posts.findOne(id);
		return cursor;
	},
	lessons() {
        return {
            art: "art",
            design: "design",
            science: "science"
        };
	}
});
