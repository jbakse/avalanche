module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "globals" : {
        "Meteor": true,
        "Template": true,
        "Tracker": true,
        "FlowRouter": true,
        "SimpleSchema": true,
        "Cloudinary": true,
        "Isotope": true,
        "moment": true,
        "$": true,
        "Roles": true
    },
    "rules": {
        "no-console": "off",
        "no-var": "error",

        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
