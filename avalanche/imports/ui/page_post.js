import {Template} from "meteor/templating";
import {Posts} from "../api/posts.js";
import "./page_post.html";

window.Posts = Posts;

Template.page_post.helpers({
	post() {
		let id = FlowRouter.getParam("postId");
		let post = Posts.findOne(id);
		console.log(post);
		return post;
	},

	lessons() {
		return {art: "art", design: "design", science: "science"};
	}
});
