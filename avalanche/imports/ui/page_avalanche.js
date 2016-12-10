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
		});

		// add index to posts for debugging
		// posts = posts.fetch();
		// for (let i = 0; i < posts.length; i++) {
		// 	posts[i].i = i;
		// }

		return posts;

	},

	files() {

		return Cloudinary.collection.find({});
	}
});

Template.page_avalanche.rendered = function() {

	let posts = this.find(".posts");

	window.isotope = new Isotope(posts, {
		// options...
		itemSelector: ".post",
		sortBy: "original-order",
		transitionDuration: 0,
		masonry: {
			isFitWidth: true,
			// columnWidth: 250,
		}
	});

	function relayoutIsotope() {
		window.isotope.reloadItems();
		window.isotope.arrange({sortBy: "original-order"});
	}

	let observer = new MutationObserver(function(/*mutations*/) {
		relayoutIsotope();

		$(posts).find("video").on("loadeddata", function() {
			relayoutIsotope();
		});

		$(posts).find("img").on("load", function() {
			relayoutIsotope();
		});
	});

	observer.observe(posts, {
		childList: true,
		// subtree: true,
	});

};
