import { Template } from 'meteor/templating';

import './body.html';

Template.body.helpers({
  posts: [
    { title: 'This is post 1', author: "Brinna Thomsen", poster: "https://upload.wikimedia.org/wikipedia/commons/0/06/Kitten_in_Rizal_Park,_Manila.jpg" },
    { title: 'This is post 2', author: "Brinna Thomsen", poster: "https://upload.wikimedia.org/wikipedia/commons/0/06/Kitten_in_Rizal_Park,_Manila.jpg" },
    { title: 'This is post 3', author: "Brinna Thomsen", poster: "https://upload.wikimedia.org/wikipedia/commons/0/06/Kitten_in_Rizal_Park,_Manila.jpg" },
  ],
});
