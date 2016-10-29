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

export const Posts = new Mongo.Collection('posts');
