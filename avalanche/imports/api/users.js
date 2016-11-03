UserSchema = new SimpleSchema({
	first_name: {
		type: String,
		label: "First Name",
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


Meteor.users.allow({
	remove: function() {return true;}
});
