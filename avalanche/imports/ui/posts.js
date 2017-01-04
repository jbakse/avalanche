import {getPrefs} from "../api/prefs.js";
import {Posts, postEditableBy} from "../api/posts.js";
import "./posts.html";

function updateMarker() {

	let last_visible = false;

	$(".post").each(function(i, post) {
		let y = $(post).offset().top;
		y = y - $(window).scrollTop();
		if (y > $(window).height()) {
			return false;
		}
		last_visible = $(post).attr("id");
	});

	if (!last_visible) return;

	let post = Posts.findOne(last_visible);
	if (!post) return;

	$(".posts-marker").html(post.lesson);
}

$(window).on("scroll", updateMarker);

//https://stackoverflow.com/questions/487073/check-if-element-is-visible-after-scrolling/488073#488073
function isScrolledIntoView(elem)
{
	let docViewTop = $(window).scrollTop();
	let docViewBottom = docViewTop + $(window).height();

	let elemTop = $(elem).offset().top;
	let elemBottom = elemTop + $(elem).height();

	// return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	return ((elemTop <= docViewBottom) && (elemBottom >= docViewTop));
}

function autoplayVideoPosters() {
	let videos = $("video");

	videos.each(function(e){
		if (isScrolledIntoView(this)) {

			this.play();
		} else {
			this.pause();
			this.currentTime = 0;
		}
	});

	setTimeout(autoplayVideoPosters, 100);
}
// https://bugs.chromium.org/p/chromium/issues/detail?id=593273
// $(window).on("scroll", autoplayVideoPosters);
setTimeout(autoplayVideoPosters, 1000);


function lazyLoadImages() {
	// console.log("loadem");
	$("img.lazy").lazyload({
		threshold: 200,
		effect: "fadeIn",
		failure_limit: 100000
	}).removeClass("lazy");

	setTimeout(lazyLoadImages, 1000);
}
setTimeout(lazyLoadImages, 1000);




Template.post_list.rendered = function() {

	let posts = this.find(".posts");

	window.isotope = new Isotope(posts, {
		itemSelector: ".post",
		sortBy: "original-order",
		transitionDuration: 0,
		masonry: {
			isFitWidth: true
		},
	});

	function relayoutIsotope() {
		window.isotope.reloadItems();
		window.isotope.arrange({sortBy: "original-order"});
	}
	setInterval(relayoutIsotope, 500);

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
		// subtree: true,,
	});
};

Template.post.helpers({
	mediaCount() {
		// console.log(this.cloudinary_media);
		let items = _.pluck(this.cloudinary_media, "resource_type");
		items = _.filter(items, function(item) {
			return item;
		});
		return items.length;
	},

	userCanEdit() {
		return postEditableBy(this, Meteor.userId());
		// return true;
	}
});

Template.post.events({
	"click .poster-link": function() {
		$("body").addClass("no-scroll");
		Session.set("previewing_post", this._id);
		event.preventDefault();
	},

	"click .remove-post": function() {
		let c = confirm("Delete post?");
		if (!c) {
			return;
		}
		Meteor.call("posts.remove", this._id);
	},

	"click .edit-post": function() {
		Session.set("editing_post", this._id);
	}
});


Template.post_overlay.helpers({
	post() {
		let _id = this.post_id;
		return Posts.findOne(_id);
	}
});

Template.post_overlay.events({
	"click .overlay, click .close-overlay": function(event) {
		if(event.target !== event.currentTarget) {
			return;
		}
		$("body").removeClass("no-scroll");
		Session.set("previewing_post", false);
	},


});

AutoForm.hooks({
	"updatePostForm": {
		"onSuccess": function(formType, result) {
			Meteor.call("posts.mark_posted", this.docId);
			Session.set("editing_post", false);
		},
		"onError": function(formType, result) {},
	},

	"updatePrefsForm": {
		"before": {
			update: function(doc) {
				// console.log("before", doc);
				// console.log(doc.$set.weeks);
				doc.$set.weeks = _.sortBy(doc.$set.weeks, "start");

				this.result(doc);
			}
		},
		"onError": function(insertDoc, updateDoc, currentDoc) {
			// console.log(JSON.stringify(this.updateDoc));
			this.event.preventDefault();
			return false;
		},
	},
});

function uploadFile(post, slot, files) {

	let maxImageFileSizeMB = 10 ;
	let maxVideoFileSizeMB = 20 ;

	let isImage = false;
	let isVideo = false;

	if(_.contains(["image/png","!image/gif","image/jpeg"], files[0].type)) {
		isImage = true;
	}

	if(_.contains(["video/mp4", "video/quicktime"], files[0].type)) {
		isVideo = true;
	}

	console.log(files[0].type, files[0].size/1024/1024, isImage,  isVideo);

	if (!isImage && !isVideo) {
		alert(`Your file is not of a recognized type.\nImages must be formatted as .png or .jpg.\nVideos must be formatted as .mp4., .m4v, .mov.\nDon't use .gif`);
		return;
	}

	if (isImage && (files[0].size > maxImageFileSizeMB * 1024 * 1024)) {
		alert(`Your file is too large.\nImages must be under ${maxImageFileSizeMB} mb.`);
		return;
	}

	if (isVideo && (files[0].size > maxVideoFileSizeMB * 1024 * 1024)) {
		alert(`Your file is too large.\nVideos must be under ${maxVideoFileSizeMB} mb.`);
		return;
	}


	Cloudinary.upload(files, {
		folder: "avalanche",
		resource_type: "auto"
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
		if (!this.posted) {
			Meteor.call("posts.remove", this._id);
		}
		Session.set("editing_post", false);
	},

	"click .submit": function() {
		// handled through autoform hooks
	},

	"click .remove-file-0": function() {
		Meteor.call("posts.updateMedia", this.post_id, 0, {});
	},

	"click .remove-file-1": function() {
		Meteor.call("posts.updateMedia", this.post_id, 1, {});
	},

	"click .remove-file-2": function() {
		Meteor.call("posts.updateMedia", this.post_id, 2, {});
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
	// },,,
});

Template.edit_post_form.helpers({
	post() {
		// console.log("hi", this.post_id);
		return Posts.findOne(this.post_id);
	},
	lessons() {

		let p = getPrefs();
		if (!p) {
			return {};
		}

		let lessons = _.pluck(p.weeks, "topic");
		lessons = _.object(lessons, lessons);
		return lessons;
	},
});
