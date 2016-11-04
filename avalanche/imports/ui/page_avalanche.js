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

Template.page_avalanche.rendered = function() {};
