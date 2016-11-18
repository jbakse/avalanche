import {Posts} from "../api/posts.js";
import "./posts.html";

Template.post.events({
	"click .remove-post": function() {
		Meteor.call("posts.remove", this._id);
	}
});

Template.create_post_form.events({
	"click .cancel": function() {
		Meteor.call("posts.remove", Session.get("creating_post"));
		Session.set("creating_post", false);
	},

	"click .submit": function() {
		Session.set("creating_post", false);
	},

	"change .upload-file": function(event, template) {
		console.log("clicknow");

		let files = template.find(".upload-file").files;
		Cloudinary.upload(files, {
			folder: "avalanche",
			resource_type: "auto"
		}, (err, res) => {
			console.log("Upload Error:", err);
			console.log("Upload Result:", res);
			if (!err) {
				Meteor.call("posts.updateMedia", Session.get("creating_post"), res);
			}
		});

	},

	// "change .create-post-file": function(event, template) {
	//
	// 	event.preventDefault();
	//
	// 	Meteor.call("posts.insert", {}, function(error, id){
	// 		if (error) {
	// 			console.error(error);
	// 			return;
	// 		}
	// 		// upload image + add to post
	// 		let files = template.find(".create-post-file").files;
	// 		Cloudinary.upload(files, {
	// 			folder: "avalanche",
	// 			resource_type: "auto"
	// 		}, (err, res) => {
	// 			console.log("Upload Error:", err);
	// 			console.log("Upload Result:", res);
	// 			if (!err) {
	// 				Meteor.call("posts.updateMedia", id, res);
	// 			}
	// 		});
	// 	});
	//
	//
	// },
});

Template.create_post_form.helpers({
	post() {
		return Posts.findOne(Session.get("creating_post"));
	}
});

Template.post.rendered = function() {

	let post = this.find(".post");

	function updateIsotope() {
		window.isotope.reloadItems();
		window.isotope.arrange({sortBy: "original-order"});
		// window.isotope.layout();
		//console.log("arrange");
	}

	function handleMutation(/*mutation*/) {

		//console.log("mutation", mutation.type);

		let image = $(post).find("img")[0];
		let video = $(post).find("video")[0];
		//console.log("info", post.innerHTML, image, video);

		//image.complete?
		if (image) {
			image.onload = updateIsotope;
		}

		if (video) {
			video.onloadeddata = updateIsotope;
		}



	}




	let observer = new MutationObserver(function(mutations) {
		mutations.forEach(handleMutation);
	});

	let config = {
		childList: true,
	};

	if (window.isotope) {
		window.isotope.addItems(post);
		updateIsotope();
	}

	//console.log("rendered");
	handleMutation({type: "added"});
	observer.observe(post, config);


};
