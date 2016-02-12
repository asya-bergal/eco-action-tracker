Meteor.startup(function(){
	Accounts.emailTemplates.siteName = "Eco Action Tracker";
	Accounts.emailTemplates.verifyEmail.subject = function () {
	    return "Welcome to Eco Action Tracker - Verify your email";
	};
	Accounts.config({ sendVerificationEmail: true });
});
