import {Template} from 'meteor/templating';
import {Posts} from '../api/posts.js';
import './avalanche.html';


Template.avalanche.helpers({
    posts() {
        return Posts.find({}, {
            sort: {
                createdAt: -1
            }
        });
    }
});


Template.avalanche.events({
    'click #create-post': function(event) {
        event.preventDefault();

        Posts.insert({
            title: 'untitled' + Math.floor(Math.random() * 100),
            author: Meteor.user().username,
            author_id: Meteor.userId(),
            poster: "",
            description: "",
            time: "",
            lesson: "",
            createdAt: Date.now()
        });

    },

    'input .title-input': function(event) {
        console.log("input", event.target.value);

        let t = event.target.value;
        t = t.trim();
        Posts.update(this._id, {
            $set: {
                title: t
            }
        });
    },

    //
    // 'blur .post .title': function(event) {
    // 	let t = event.target.innerText;
    // 	t = t.trim();
    // 	console.log("edit", this);
    // 	Posts.update(this._id, {
    // 		$set: {title: t},
    // 	});
    // 	// event.target.innerText = t;
    //
    // },

    'click .kill-post': function(event) {
        console.log("kill kill kill", this);
        Posts.remove(this._id);
    }
});
