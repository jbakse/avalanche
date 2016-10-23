 // {
 //    title: 'Currents',
 //    author: "George Constanza",
 //    poster: "https://autologousinteractive.files.wordpress.com/2010/10/htorsion104-m.jpg",
 //    description: "Should I make the waves bigger?",
 //    time: "7 hours ago",
 //    lesson: "Random"
 //  }


import { Mongo } from 'meteor/mongo';

export const Posts = new Mongo.Collection('posts');
