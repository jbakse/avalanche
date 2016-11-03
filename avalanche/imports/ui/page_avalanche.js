import {Template} from 'meteor/templating';
import {Posts} from '../api/posts.js';
import './page_avalanche.html';

Template.page_avalanche.helpers({
    posts() {
        return Posts.find({}, {
            sort: {
                created_at: -1
            }
        });
    },

    files() {
        // {{#each files}}
        //     {{percent_uploaded}}<br/>
        // {{/each}}
        return Cloudinary.collection.find({});
    }
});

Template.page_avalanche.events({
    // 'dropped #dropzone': function(event, template) {
    // 	console.log("drop");
    // 	console.log(event.originalEvent.dataTransfer.files);
    // 	template.find('.poster').files = event.originalEvent.dataTransfer.files;
    // },
    'change .post-create-file': function(event, template) {

        event.preventDefault();
        // console.log("file");

        // let title = template.find('.title').value || "untitled";

        let id = Posts.insert({
            // title: "untitled",
            author: Meteor.user().username,
            author_id: Meteor.userId(),
            // poster: "",
            // description: "",
            // time: "",
            // lesson: "",
            created_at: new Date(), //Date.now()
        });
        // console.log("id", id);

        let files = template.find('.post-create-file').files;
        // console.log(files);

        let cid = Cloudinary.upload(files, {
            folder: "avalanche"
        }, (err, res) => {
            console.log(`Upload Error:`, err);
            console.log(`Upload Result:`, res);
            if (!err) {
                Posts.update(id, {
                    $set: {
                        poster: res.public_id
                    }
                });
            }
        });



    },
    // 'change .poster': function(event) {
    // 	files = event.currentTarget.files;
    // 	console.log(files);
    // 	Cloudinary.upload(files, {
    // 			folder: "avalanche"
    // 		},
    // 		(err, res) => {
    // 			console.log(`Upload Error:`, err);
    // 			console.log(`Upload Result:`, res);
    // 		}
    // 	);
    // }
});



Template.page_avalanche.rendered = function() {


};

Template.avalanche_post.events({
    'click .kill-post': function(event) {
        console.log("kill kill kill", this);
        Posts.remove(this._id);
    }
});
