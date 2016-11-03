import '../imports/startup/accounts-config.js';

import '../imports/ui/layout_main.js';
import '../imports/ui/page_avalanche.js';
import '../imports/ui/page_post.js';
import '../imports/ui/page_user.js';

$.cloudinary.config( {
    cloud_name:"jbakse"
});


AccountsTemplates.configure( {
    enablePasswordChange: true,
    sendVerificationEmail: true,
    showForgotPasswordLink: true,
    // showResendVerificationEmailLink: true,
    continuousValidation: true,
    negativeValidation: true,
    positiveValidation: true,
    negativeFeedback: true,
    positiveFeedback: true,
    showValidating: true,
});

AccountsTemplates.removeField('email');

AccountsTemplates.addField({
    _id: "username",
    type: "text",
    displayName: "username",
    required: true,
    minLength: 5,
});

AccountsTemplates.removeField('password');
AccountsTemplates.addField({
    _id: 'password',
    type: 'password',
    required: true,
    minLength: 6,
    re: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
    errStr: 'At least 1 digit, 1 lowercase and 1 uppercase',
});
