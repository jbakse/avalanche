// Meteor.users.allow({
// 	remove: function() {return true;}
// });
import {Posts} from "../api/posts.js";

Meteor.methods({
	"users.updateName" (data) {
		Meteor.users.update(this.userId, {
			$set: {
				"profile.first_name": data.first_name,
				"profile.last_name": data.last_name
			}
		});

		Posts.update({
			author_id: this.userId
		}, {
			$set: {
				"author": data.first_name + " " + data.last_name
			}
		}, {multi: true});
	},

<<<<<<< Updated upstream
	"toggleAdmin" () {
		let userIsAdmin = Roles.userIsInRole(Meteor.userId(), ["admin"], Roles.GLOBAL_GROUP);

		if (userIsAdmin) {
			Roles.removeUsersFromRoles(Meteor.userId(), "admin", Roles.GLOBAL_GROUP);
		} else {
			Roles.addUsersToRoles(Meteor.userId(), "admin", Roles.GLOBAL_GROUP);
		}

=======
	"users.updateHeadshot" (data) {
		Meteor.users.update(this.userId, {
			$set: {
				"profile.headshot": data.res.public_id,
			}
		});
>>>>>>> Stashed changes
	}
});
