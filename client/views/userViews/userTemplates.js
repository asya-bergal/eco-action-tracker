Template.register.events({
    "submit .registration-form": function (event) {
        event.preventDefault();

        var password = event.target.password.value;
        var confirm = event.target.confirm.value;

        if(password != confirm) {
            console.log("Passwords don't match.");
            // TODO: Display error message on frontend
            return;
        }

        var username = event.target.username.value;
        var first = event.target.firstName.value;
        var last = event.target.lastName.value;
        var email = event.target.email.value;

        // TODO: Email verification
        // TODO: Error handling for createUser?
        Accounts.createUser({username: username, email: email, password: password, profile: {firstName: first, lastName: last}},
            function (error) {
                if (error) {
                    console.log(error);
                }
        });
    }
});

Template.login.events({
    "submit .login-form": function (event) {
        event.preventDefault();

        var username = event.target.username.value;
        var password = event.target.password.value;

        // TODO: Error message if login fails (need to add a callback)
        Meteor.loginWithPassword(username, password,
            function (error) {
                if (error) {
                    console.log(error);
                }
        });
    }
});
