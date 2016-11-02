// {
//	title: string
//	author: string
//	author_id: id
//	poster: url
//	description: string
//	lesson: string
//	createdAt: Date.now()
//  }


import {
	Mongo
} from 'meteor/mongo';


PostSchema = new SimpleSchema({
	title: {
		type: String,
		label: "Title",
        defaultValue: "",
		max: 200
	},
    last_name: {
        type: String,
        label: "Last Name",
        defaultValue: "",
        max: 200
    },
    email: {
        type: String,
        label: "Email",
        defaultValue: "",
        regEx: SimpleSchema.RegEx.Email,
        max: 200
    },
});





export const Posts = new Mongo.Collection('posts');
