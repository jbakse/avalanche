import { getPrefs, weekForDate } from "../api/prefs.js";
import { Posts, postEditableBy, commentEditableBy } from "../api/posts.js";
import "./posts.html";

function updateMarker() {
  if ($(window).scrollTop() < 500) {
    $(".posts-marker").addClass("hidden");
    return;
  } else {
    $(".posts-marker").removeClass("hidden");
  }
  let last_visible = false;

  $(".post").each(function (i, post) {
    let y = $(post).offset().top;
    y = y - $(window).scrollTop();
    if (y > $(window).height()) {
      return false;
    }
    last_visible = $(post);
  });

  // console.log(last_visible);
  if (!last_visible) return;
  // $(".post").removeClass("debug-highlight");
  // last_visible.addClass("debug-highlight");
  let post = Posts.findOne(last_visible.attr("id"));
  if (!post) return;

  let week = weekForDate(post.created_at);
  if (!week) return;
  $(".posts-marker").html(`Week ${week.num}: ${week.topic}`);
}

$(window).on("scroll", updateMarker);

//https://stackoverflow.com/questions/487073/check-if-element-is-visible-after-scrolling/488073#488073
function isScrolledIntoView(elem) {
  let docViewTop = $(window).scrollTop();
  let docViewBottom = docViewTop + $(window).height();

  let elemTop = $(elem).offset().top;
  let elemBottom = elemTop + $(elem).height();

  // return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  return elemTop <= docViewBottom && elemBottom >= docViewTop;
}

// function autoplayVideoPosters() {
// 	console.log("autoplay");
// 	let videos = $("video");

// 	// let playCount = 0;
// 	// let pauseCount = 0;
// 	videos.each(function(e) {
// 		if (isScrolledIntoView(this)) {
// 			console.log("test");
// 			// playCount++;
// 			this.play().catch(function(e) {
// 				// console.log("caught", e);
// 				// getting a "The play() request was interrupted by a call to pause()." exception on live server but not local
// 				// flooding the console, but not impacting experience
// 				// just throw this exception away.
// 				// not sure if this is related to this problem:
// 				// https://bugs.chromium.org/p/chromium/issues/detail?id=593273
// 			});

// 		} else {
// 			// pauseCount++;
// 			this.pause();
// 			this.currentTime = 0;
// 		}
// 	});

// 	// console.log("p/p", playCount, pauseCount);

// }

// $(window).on("scroll", autoplayVideoPosters);
// setInterval(autoplayVideoPosters, 1000);

function lazyLoadImages() {
  // console.log("loadem");
  $("img.lazy")
    .lazyload({
      threshold: 200,
      effect: "fadeIn",
      failure_limit: 100000,
    })
    .removeClass("lazy");

  setTimeout(lazyLoadImages, 1000);
}
setTimeout(lazyLoadImages, 1000);

Template.post_list.rendered = function () {
  let posts = this.find(".posts");

  window.isotope = new Isotope(posts, {
    itemSelector: ".post",
    sortBy: "original-order",
    transitionDuration: 0,
    masonry: {
      isFitWidth: true,
    },
  });

  function relayoutIsotope() {
    // console.log("isotope reload");
    window.isotope.reloadItems();
    window.isotope.arrange({ sortBy: "original-order" });
  }
  setInterval(relayoutIsotope, 500);

  let observer = new MutationObserver(function (/*mutations*/) {
    _.debounce(relayoutIsotope, 500, true);

    $(posts)
      .find("video")
      .on("loadeddata", function () {
        _.debounce(relayoutIsotope, 500, true);
      });

    $(posts)
      .find("img")
      .on("load", function () {
        _.debounce(relayoutIsotope, 500, true);
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
    items = _.filter(items, function (item) {
      return item;
    });
    return items.length;
  },

  userCanEdit() {
    return postEditableBy(this, Meteor.userId());
    // return true;
  },

  userCanComment() {
    return Meteor.userId() !== null;
    // return true;
  },

  votedPretty() {
    let post = Posts.findOne(this._id);
    if (
      !post ||
      _.where(post.votes, { voter_id: Meteor.userId(), category: "pretty" })
        .length === 0
    ) {
      return "";
    } else {
      return "voted";
    }
  },

  votedNerdy() {
    let post = Posts.findOne(this._id);
    if (
      !post ||
      _.where(post.votes, { voter_id: Meteor.userId(), category: "nerdy" })
        .length === 0
    ) {
      return "";
    } else {
      return "voted";
    }
  },

  votedFunny() {
    let post = Posts.findOne(this._id);
    if (
      !post ||
      _.where(post.votes, { voter_id: Meteor.userId(), category: "funny" })
        .length === 0
    ) {
      return "";
    } else {
      return "voted";
    }
  },

  server() {
    if (window) {
      return `http://${window.location.host}`;
    }
    return "http://localhost:3000";
  },
});

Template.post.events({
  "click .poster-link, click .votes": function (event) {
    $("body").addClass("no-scroll");
    Session.set("previewing_post", this._id);
    event.preventDefault();
  },

  "click .remove-post": function () {
    let c = confirm("Delete post?");
    if (!c) {
      return;
    }
    Meteor.call("posts.remove", this._id);
  },

  "click .edit-post": function () {
    Session.set("editing_post", this._id);
  },

  "click .comment-post": function () {
    Session.set("commenting_post", this._id);
  },

  "click .vote-pretty": function () {
    // console.log("vote pretty");
    Meteor.call("posts.vote", this._id, "pretty");
  },

  "click .vote-nerdy": function () {
    // console.log("vote nerdy");
    Meteor.call("posts.vote", this._id, "nerdy");
  },

  "click .vote-funny": function () {
    // console.log("vote funny");
    Meteor.call("posts.vote", this._id, "funny");
  },
});

Template.post_overlay.helpers({
  post() {
    let _id = this.post_id;
    return Posts.findOne(_id);
  },

  server() {
    if (window) {
      return `https://${window.location.host}`;
    }
    return "http://localhost:3000";
  },

  userCanDeleteComment(comment) {
    return commentEditableBy(comment, Meteor.userId());
  },
});

Template.post_overlay.events({
  "click .overlay, click .close-overlay": function (event) {
    if (event.target !== event.currentTarget) {
      return;
    }
    $("body").removeClass("no-scroll");
    Session.set("previewing_post", false);
  },

  "click .delete-comment": function (event, a, b) {
    console.log("delete", a.data.post_id, this);
    Meteor.call("posts.deleteComment", a.data.post_id, this);
  },
});

AutoForm.hooks({
  updatePostForm: {
    onSuccess: function (formType, result) {
      Meteor.call("posts.mark_posted", this.docId);
      Session.set("editing_post", false);
    },
    onError: function (formType, result) {},
  },

  updatePrefsForm: {
    before: {
      update: function (doc) {
        // console.log("before", doc);
        // console.log(doc.$set.weeks);
        doc.$set.weeks = _.sortBy(doc.$set.weeks, "start");

        this.result(doc);
      },
    },
    onError: function (insertDoc, updateDoc, currentDoc) {
      // console.log(JSON.stringify(this.updateDoc));
      this.event.preventDefault();
      return false;
    },
  },
});

function uploadFile(post, slot, files) {
  let maxImageFileSizeMB = 10;
  let maxVideoFileSizeMB = 20;

  let isImage = false;
  let isVideo = false;

  if (_.contains(["image/png", "!image/gif", "image/jpeg"], files[0].type)) {
    isImage = true;
  }

  if (_.contains(["video/mp4", "video/quicktime"], files[0].type)) {
    isVideo = true;
  }

  console.log(files[0].type, files[0].size / 1024 / 1024, isImage, isVideo);

  if (!isImage && !isVideo) {
    alert(
      `Your file is not of a recognized type.\nImages must be formatted as .png or .jpg.\nVideos must be formatted as .mp4., .m4v, .mov.\nDon't use .gif`
    );
    return;
  }

  if (isImage && files[0].size > maxImageFileSizeMB * 1024 * 1024) {
    alert(
      `Your file is too large.\nImages must be under ${maxImageFileSizeMB} mb.`
    );
    return;
  }

  if (isVideo && files[0].size > maxVideoFileSizeMB * 1024 * 1024) {
    alert(
      `Your file is too large.\nVideos must be under ${maxVideoFileSizeMB} mb.`
    );
    return;
  }

  Cloudinary.upload(
    files,
    {
      folder: Meteor.settings.public.cloudinary_folder,
      resource_type: "auto",
    },
    (err, res) => {
      // console.log("Upload Error:", err);
      // console.log("Upload Result:", res);
      if (!err) {
        Meteor.call("posts.updateMedia", post, slot, res);
      }
    }
  );
}

Template.edit_post_form.events({
  "click .cancel": function () {
    if (!this.posted) {
      Meteor.call("posts.remove", this._id);
    }
    Session.set("editing_post", false);
  },

  "click .submit": function () {
    // handled through autoform hooks
  },

  "click .remove-file-0": function () {
    Meteor.call("posts.updateMedia", this.post_id, 0, {});
  },

  "click .remove-file-1": function () {
    Meteor.call("posts.updateMedia", this.post_id, 1, {});
  },

  "click .remove-file-2": function () {
    Meteor.call("posts.updateMedia", this.post_id, 2, {});
  },

  "change .upload-file-0": function (event, template) {
    let post = this.post_id;
    let slot = 0;
    let files = template.find(".upload-file-0").files;
    uploadFile(post, slot, files);
  },

  "change .upload-file-1": function (event, template) {
    let post = this.post_id;
    let slot = 1;
    let files = template.find(".upload-file-1").files;
    uploadFile(post, slot, files);
  },

  "change .upload-file-2": function (event, template) {
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

Template.comment_post_form.events({
  "click .cancel": function () {
    Session.set("commenting_post", false);
  },

  "submit .comment-post": function (e) {
    e.preventDefault();

    const user_id = Meteor.userId();

    console.log(`Post comment by ${user_id} to ${this.post_id}`);
    console.log(e.target.comment.value); //["comment-text"].value

    Meteor.call(
      "posts.addComment",
      this.post_id,
      user_id,
      e.target.comment.value
    );

    Session.set("commenting_post", false);
  },
});

Template.comment_post_form.helpers({
  post() {
    // console.log("hi", this.post_id);
    console.log(Posts.findOne(this.post_id));
    return Posts.findOne(this.post_id);
  },
});
