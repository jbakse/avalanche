import {Posts} from "../api/posts.js";
import "./posts.html";

Template.post.events({
	"click .poster-link": function(event) {
		// console.log(event, template, this._id);
		Session.set("previewing_post", this._id);
		event.preventDefault();
	},

	"click .remove-post": function() {
		Meteor.call("posts.remove", this._id);
	},

	"click .edit-post": function() {
		// console.log("dedit", this);
		Session.set("editing_post", this._id);
	},
});

Template.post_overlay.helpers({
	post() {
		let _id = Session.get("previewing_post");
		// console.log(_id);
		// console.log(Posts.findOne(_id));
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
		"onSuccess": function(/*formType, result*/) {
			// console.log("success");
			// console.log(formType, result);
			// console.log(this);
			Meteor.call("posts.mark_posted", this.docId);
			Session.set("editing_post", false);
		},
		"onError": function(/*formType, result*/) {
			// console.log("error");
			// console.log(formType, result);
		}
	},

	"updatePrefsForm": {
		"onError": function(insertDoc, updateDoc, currentDoc) {
			console.log(JSON.stringify(this.updateDoc));
			this.event.preventDefault();
			return false;
		}
	}
});

function uploadFile(post, slot, files) {
	Cloudinary.upload(files, {
		folder: "avalanche",
		resource_type: "auto",
	}, (err, res) => {
		// console.log("Upload Error:", err);
		// console.log("Upload Result:", res);
		if (!err) {
			Meteor.call("posts.updateMedia", post, slot, res);
		}
	});
}


Template.edit_post_form.events({
	"click .cancel": function() {
		// console.log("hi cancel", this);
		// console.log(this);
		if (!this.posted) {
			Meteor.call("posts.remove", this._id);
		}
		Session.set("editing_post", false);
	},

	"click .submit": function() {
		// Session.set("editing_post", false);
	},

	"change .upload-file-0": function(event, template) {
		let post = this.post_id;
		let slot = 0;
		let files = template.find(".upload-file-0").files;
		uploadFile(post, slot, files);
	},

	"change .upload-file-1": function(event, template) {
		let post = this.post_id;
		let slot = 1;
		let files = template.find(".upload-file-1").files;
		uploadFile(post, slot, files);
	},

	"change .upload-file-2": function(event, template) {
		let post = this.post_id;
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

Template.edit_post_form.helpers({
	post() {
		// console.log("hi", this.post_id);
		return Posts.findOne(this.post_id);
	},
	lessons() {
		return {art: "art", design: "design", science: "science"};
	}
});
