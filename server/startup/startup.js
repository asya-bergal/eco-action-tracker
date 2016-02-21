Meteor.startup(function () {
    Accounts.emailTemplates.siteName = "Eco Action Tracker";
    Accounts.emailTemplates.verifyEmail = {
        subject: function () {
            return "Welcome to Eco Action Tracker - Verify your email";
        },
        text: function (user, url) {
            url = url.replace('#/', '');
            return "Hello " +user.profile.firstName+", \n Thanks for joining Eco Action Tracker! \n\n To verify your email please click the link \n\n " + url;
        }
    };
    Accounts.emailTemplates.resetPassword = {
        subject: function () {
            return "Reset your password in Eco Action Tracker";
        },
        text: function (user, url) {
            url = url.replace('#/', '');
            return "Hello " +user.profile.firstName+", \n Thanks for using Eco Action Tracker! \n\n To reset your password please click the link \n\n " + url;
        }
    };
    Accounts.config({sendVerificationEmail: true});
});
