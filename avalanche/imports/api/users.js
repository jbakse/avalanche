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

	"users.updateDescription" (data) {
		if (userIsAdmin() || (data.user_id === this.userId)) {
			//okay
		} else {
			throw new Meteor.Error("unauthorized");
		}

		Meteor.users.update(data.user_id, {
			$set: {
				"profile.description": data.description
			}
		});
	},

	"toggleAdmin" () {
		// let userIsAdmin = Roles.userIsInRole(Meteor.userId(), ["admin"], Roles.GLOBAL_GROUP);

		let may_admin = Roles.userIsInRole(Meteor.userId(), ["may_admin"], Roles.GLOBAL_GROUP);

		if (!userIsAdmin() && may_admin) {
			Roles.addUsersToRoles(Meteor.userId(), "admin", Roles.GLOBAL_GROUP);
		} else {
			Roles.removeUsersFromRoles(Meteor.userId(), "admin", Roles.GLOBAL_GROUP);
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



if (Meteor.isServer) {
	// This code only runs on the server
	Meteor.publish("users", function usersPublication() {
		return Meteor.users.find();
	});
}
