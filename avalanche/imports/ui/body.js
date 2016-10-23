import { Template } from 'meteor/templating';

import { Posts } from '../api/posts.js';

import './body.html';

Template.body.helpers({
  posts() {
    return Posts.find({});
  }
});
