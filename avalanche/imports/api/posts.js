import { Mongo } from "meteor/mongo";
import { userIsAdmin } from "./users.js";

let PostSchema = new SimpleSchema({
  author: {
    type: String,
    label: "Author",
    defaultValue: ""
  },
  author_id: {
    type: String,
    label: "Author ID",
    defaultValue: ""
    // optional: true,
    // regex: SimpleSchema.RegEx.Id,,,,,,,,,,,,,
  },
  created_at: {
    type: Date,
    label: "Created At"
  },
  posted: {
    type: Boolean,
    label: "Posted",
    defaultValue: false
  },
  // poster: {
  // 	type: String,
  // 	label: "Poster Image",
  // 	defaultValue: "",
  // 	// regex: SimpleSchema.RegEx.Url,,,,,,,,,,,
  // },
  // resource_type: {
  // 	type: String,
  // 	label: "Resource Type",
  // 	defaultValue: ""
  // },
  cloudinary_media: {
    type: [Object],
    label: "Cloudinary Data",
    blackbox: true,
    defaultValue: [{}, {}, {}]
  },
  votes: {
    type: [Object],
    label: "Votes",
    blackbox: true,
    defaultValue: []
  },
  lesson: {
    type: String,
    label: "Lesson",
    defaultValue: ""
  },
  title: {
    type: String,
    label: "Title",
    defaultValue: "",
    max: 10
  },
  description: {
    type: String,
    label: "Description",
    defaultValue: "",
    optional: true
  },

  inspiration_name: {
    type: String,
    label: "Inspiration Name",
    optional: true,
    defaultValue: ""
  },

  inspiration_url: {
    type: String,
    label: "Inspiration URL",
    optional: true,
    defaultValue: ""
  },

  code: {
    type: String,
    label: "Code (Experimental)",
    optional: true,
    defaultValue: ""
  },

  comments: {
    type: [Object],
    label: "comments",
    blackbox: true,
    defaultValue: []
  }
});

export const Posts = new Mongo.Collection("posts");
Posts.attachSchema(PostSchema);

if (Meteor.isServer) {
  // This code only runs on the server

  // Meteor.publish("posts", function publishPosts() {
  // 	return Posts.find();
  // });

  // kinda silly hack, to allow loading just the most recent first, then all of them after a few seconds
  Meteor.publish("recent_posts", function publishRecentPosts() {
    return Posts.find(
      {
        posted: true
      },
      {
        sort: {
          created_at: -1
        },
        fields: {
          "cloudinary_media.tags": 0,
          "cloudinary_media.pages": 0,
          "cloudinary_media.bytes": 0,
          "cloudinary_media.type": 0,
          "cloudinary_media.etag": 0,
          "cloudinary_media.url": 0,
          "cloudinary_media.secure_url": 0,
          "cloudinary_media.audio": 0,
          "cloudinary_media.video": 0,
          "cloudinary_media.frame_rate": 0,
          "cloudinary_media.bit_rate": 0,
          "cloudinary_media.duration": 0,
          "cloudinary_media.rotation": 0
        },
        limit: 20
      }
    );
  });

  Meteor.publish("posts", function publishPostsMeta() {
    return Posts.find(
      {
        // posted: true
      },
      {
        sort: {
          created_at: -1
        },
        fields: {
          "cloudinary_media.tags": 0,
          "cloudinary_media.pages": 0,
          "cloudinary_media.bytes": 0,
          "cloudinary_media.type": 0,
          "cloudinary_media.etag": 0,
          "cloudinary_media.url": 0,
          "cloudinary_media.secure_url": 0,
          "cloudinary_media.audio": 0,
          "cloudinary_media.video": 0,
          "cloudinary_media.frame_rate": 0,
          "cloudinary_media.bit_rate": 0,
          "cloudinary_media.duration": 0,
          "cloudinary_media.rotation": 0
        }
      }
    );
  });
}

Posts.allow({
  update: function(userId, doc /*, fields, modifier*/) {
    if (userIsAdmin()) {
      return true;
    }
    if (userId === doc.author_id) {
      return true;
    }
    return false;
  }
});

export const postEditableBy = function(post, user_id) {
  if (!post) {
    return false;
  }
  return post.author_id === user_id || userIsAdmin();
};

import { currentWeek } from "../api/prefs.js";

Meteor.methods({
  "posts.insert"() {
    let topic = "";
    if (currentWeek()) {
      topic = currentWeek().topic;
    }

    // create post
    let data = {
      author_id: this.userId,
      author:
        Meteor.user().profile.first_name +
        " " +
        Meteor.user().profile.last_name,
      lesson: topic,
      created_at: new Date()
    };

    let id = Posts.insert(data);

    return id;
  },

  "posts.remove"(id) {
    console.log("id", id);
    let post = Posts.findOne(id);
    if (!postEditableBy(post, this.userId)) {
      throw new Meteor.Error("unauthorized");
    }

    console.log("killing " + id);
    if (Meteor.isServer) {
      // if (!post.poster) {
      // 	Posts.remove(id);
      // 	return;
      // }
      // Cloudinary.uploader.destroy(post.poster, Meteor.bindEnvironment((result) => {
      // 	if (result.result === "ok" || result.result === "not found") {
      // 		Posts.remove(id);
      // 	}
      // }));

      if (post.cloudinary_media[0].public_id) {
        Cloudinary.uploader.destroy(post.cloudinary_media[0].public_id);
      }
      if (post.cloudinary_media[1].public_id) {
        Cloudinary.uploader.destroy(post.cloudinary_media[1].public_id);
      }
      if (post.cloudinary_media[2].public_id) {
        Cloudinary.uploader.destroy(post.cloudinary_media[2].public_id);
      }
      Posts.remove(id);
    }
  },

  "posts.mark_posted"(id) {
    let post = Posts.findOne(id);
    if (!postEditableBy(post, this.userId)) {
      throw new Meteor.Error("unauthorized");
    }
    Posts.update(id, {
      $set: {
        posted: true
      }
    });
  },

  "posts.updateMedia"(id, slot, cloudinary_data) {
    let post = Posts.findOne(id);
    if (!postEditableBy(post, this.userId)) {
      throw new Meteor.Error("unauthorized");
    }

    // update slot with new data
    post.cloudinary_media[slot] = cloudinary_data;

    // shift media down to fill empty slots
    for (let n = 0; n < 2; n++) {
      if (
        _.isEmpty(post.cloudinary_media[n + 0]) &&
        !_.isEmpty(post.cloudinary_media[n + 1])
      ) {
        post.cloudinary_media[n + 0] = post.cloudinary_media[n + 1];
        post.cloudinary_media[n + 1] = {};
      }
    }

    Posts.update(id, {
      $set: {
        cloudinary_media: post.cloudinary_media
      }
    });
  },

  "posts.vote"(id, category) {
    let voter_id = this.userId;
    // console.log("hi");
    // console.log(`${voter_id} votes ${category} for ${id}`);
    let post = Posts.findOne(id);

    if (
      _.where(post.votes, {
        voter_id: voter_id,
        category: category
      }).length > 0
    )
      return;

    Posts.update(id, {
      $push: {
        votes: {
          voter_id: voter_id,
          category: category,
          created_at: new Date()
        }
      }
    });
  },

  "posts.addComment"(id, user_id, comment) {
    console.log("add a comment");
    console.log(id);
    console.log(user_id);
    console.log(comment);

    Posts.update(id, {
      $push: {
        comments: {
          commenter_id: user_id,
          comment: comment,
          created_at: new Date()
        }
      }
    });
  }
});
