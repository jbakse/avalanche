import "./posts.html";

Template.post.events({
	"click .remove-post": function() {
		Meteor.call("posts.remove", this._id);
	}
});

Template.post.rendered = function() {

	let post = this.find(".post");
	let image = this.find("img");

	console.log("rendered", this.data.i);

	window.isotope.addItems(post);

	//image.complete?
	if (image) {
		image.onload = function() {
			setTimeout(function() {
				window.isotope.reloadItems();
				window.isotope.arrange({sortBy: "original-order"});
				// window.isotope.layout();
				console.log("arrange");
			}, 100);
		};
	}

};
