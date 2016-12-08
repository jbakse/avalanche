import {Template} from "meteor/templating";

import {Posts} from "../api/posts.js";
import "./page_avalanche.html";




Template.page_avalanche.helpers({
	posts() {
		let posts = Posts.find({
			posted: true
		}, {
			sort: {
				created_at: -1
			}
		}).fetch();

		for (let i = 0; i < posts.length; i++) {
			posts[i].i = i;
		}
		return posts;
		// return Posts.find({}, {
		// 	sort: {
		// 		created_at: -1
		// 	}
		// });
	},

	files() {
		// {{#each files}}
		//     {{percent_uploaded}}<br/>
		// {{/each}}
		return Cloudinary.collection.find({});
	},
});

Template.page_avalanche.rendered = function() {
	// console.log("rendered posts");
	let posts=  this.find(".posts");
	window.isotope = new Isotope(posts, {
		// options...
		itemSelector: ".post",
		sortBy: "original-order",
		transitionDuration: 0,
		masonry: {
			isFitWidth: true,
			// columnWidth: 250
		},
	});



};
