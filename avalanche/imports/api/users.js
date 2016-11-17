// Meteor.users.allow({
// 	remove: function() {return true;}
// });
import {Posts} from "../api/posts.js";

export const userIsAdmin = function() {
	return Roles.userIsInRole(Meteor.userId(), ["admin"], Roles.GLOBAL_GROUP);
};

Meteor.methods({
	"users.updateName" (data) {
		console.log("update name");
		if (userIsAdmin() || (data.user_id === this.userId)) {
			//okay
		} else {
			throw new Meteor.Error("unauthorized");
		}
		console.log("okay");
		Meteor.users.update(data.user_id, {
			$set: {
				"profile.first_name": data.first_name,
				"profile.last_name": data.last_name
			}
		});

		Posts.update({
			author_id: data.userId
		}, {
			$set: {
				"author": data.first_name + " " + data.last_name
			}
		}, {multi: true});
	},

	"toggleAdmin" () {
		// let userIsAdmin = Roles.userIsInRole(Meteor.userId(), ["admin"], Roles.GLOBAL_GROUP);

		if (userIsAdmin()) {
			Roles.removeUsersFromRoles(Meteor.userId(), "admin", Roles.GLOBAL_GROUP);
		} else {
			Roles.addUsersToRoles(Meteor.userId(), "admin", Roles.GLOBAL_GROUP);
		}
	},

	"users.updateHeadshot" (data) {
		if (userIsAdmin() || (data.user_id === Meteor.userId())) {
			//okay
		} else {
			throw new Meteor.Error("unauthorized");
		}
		console.log(data);

		Meteor.users.update(data.user_id, {
			$set: {
				"profile.headshot": data.res.public_id
			}
		});
	}
});
