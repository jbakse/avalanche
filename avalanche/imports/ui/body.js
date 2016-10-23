import {
    Template
} from 'meteor/templating';

import {
    Posts
} from '../api/posts.js';

import './body.html';

Template.body.helpers({
    posts() {
        return Posts.find({}, {sort: {createdAt: -1}});
    }
});

Template.body.events({
    'click #create-post': function(event) {
        event.preventDefault();

        Posts.insert({
            title: 'untitled' + Math.floor(Math.random()*100),
            author: "unauthored",
            poster: "",
            description: "",
            time: "",
            lesson: "",
            createdAt: Date.now()
        });

    },
    'click .kill-post': function(event) {
      console.log("kill kill kill", this);
      Posts.remove(this._id);
    }
});
