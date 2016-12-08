import {Posts} from "../api/posts.js";
import "./posts.html";

Template.post.events({
	"click .poster-link": function(event, template) {
		console.log(event, template, this._id);
		Session.set("previewing_post", this._id);
		event.preventDefault();
	},

	"click .remove-post": function() {
		Meteor.call("posts.remove", this._id);
	},
});

Template.post_overlay.helpers({
	post() {
		let _id = Session.get("previewing_post");
		console.log(_id);
		console.log(Posts.findOne(_id));
		return Posts.findOne(_id);
	}
});

Template.post_overlay.events({
	"click #post-overlay": function() {
		Session.set("previewing_post", false);
	}
});

AutoForm.hooks({
	"updatePostForm": {
		"onSuccess": function(formType, result) {
			console.log("success");
			console.log(formType, result);
			Session.set("creating_post", false);
		},
		"onError": function(formType, result) {
			console.log("error");
			console.log(formType, result);
		}
	}
});

function uploadFile(post, slot, files) {
	Cloudinary.upload(files, {
		folder: "avalanche",
		resource_type: "auto",
	}, (err, res) => {
		console.log("Upload Error:", err);
		console.log("Upload Result:", res);
		if (!err) {
			Meteor.call("posts.updateMedia", post, slot, res);
		}
	});
}


Template.create_post_form.events({
	"click .cancel": function() {
		Meteor.call("posts.remove", Session.get("creating_post"));
		Session.set("creating_post", false);
	},

	"click .submit": function() {
		// Session.set("creating_post", false);
	},

	"change .upload-file-0": function(event, template) {
		let post = Session.get("creating_post");
		let slot = 0;
		let files = template.find(".upload-file-0").files;
		uploadFile(post, slot, files);
	},

	"change .upload-file-1": function(event, template) {
		let post = Session.get("creating_post");
		let slot = 1;
		let files = template.find(".upload-file-1").files;
		uploadFile(post, slot, files);
	},

	"change .upload-file-2": function(event, template) {
		let post = Session.get("creating_post");
		let slot = 2;
		let files = template.find(".upload-file-2").files;
		uploadFile(post, slot, files);
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
	// },,
});

Template.create_post_form.helpers({
	post() {
		return Posts.findOne(Session.get("creating_post"));
	},
	lessons() {
		return {art: "art", design: "design", science: "science"};
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
		childList: true
	};

	if (window.isotope) {
		window.isotope.addItems(post);
		updateIsotope();
	}

	//console.log("rendered");
	handleMutation({type: "added"});
	observer.observe(post, config);

};
