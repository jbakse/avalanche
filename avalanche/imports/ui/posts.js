import "./posts.html";

Template.post.events({
	"click .remove-post": function() {
		Meteor.call("posts.remove", this._id);
	}
});

Template.post.rendered = function() {

	let post = this.find(".post");

	function updateIsotope() {
		window.isotope.reloadItems();
		window.isotope.arrange({sortBy: "original-order"});
		// window.isotope.layout();
		console.log("arrange");
	}

	function handleMutation(mutation) {

		console.log("mutation", mutation.type);

		let image = $(post).find("img")[0];
		let video = $(post).find("video")[0];
		console.log("info", post.innerHTML, image, video);

		//image.complete?
		if (image) {
			image.onload = updateIsotope;
		}

		if (video) {
			video.onloadeddata = updateIsotope;
		}



	}




	let observer = new MutationObserver(function(mutations) {
		mutations.forEach(handleMutation);
	});

	let config = {
		childList: true,
	};

	window.isotope.addItems(post);
	updateIsotope();


	console.log("rendered");
	handleMutation({type: "added"});
	observer.observe(post, config);


};
