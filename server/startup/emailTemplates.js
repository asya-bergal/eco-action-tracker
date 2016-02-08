Accounts.emailTemplates.siteName = "Eco Action Tracker";
// Accounts.emailTemplates.from = "Eco Action Tracker Admin <accounts@example.com>";
Accounts.emailTemplates.verifyEmail.subject = function (user) {
    return "Welcome to Eco Action Tracker, " + user.profile.name;
};
// Accounts.emailTemplates.enrollAccount.text = function (user, url) {
//    return "You're one step closer to helping the environment!"
//      + " To activate your account, simply click the link below:\n\n"
//      + url;
// };