import {Template} from 'meteor/templating';
import {Posts} from '../api/posts.js';
import './post.html';

Template.post.helpers({
    post() {
        console.log("posthelper");
        var id = FlowRouter.getParam("postId");
        console.log(id);
        var cursor = Posts.findOne(id);
        return cursor;
    }
});
