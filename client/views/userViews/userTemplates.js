Template.register.events({
    // Handle registration
    "submit .registration-form": function (event) {
        event.preventDefault();

        var password = event.target.pw.value;
        var confirm = event.target.confirm.value;

        if(password !== confirm) {
            humane.error("Passwords do not match!");
            // TODO: Display error message on frontend
            return;
        }

        var username = event.target.user.value;
        var first = event.target.firstName.value;
        var last = event.target.lastName.value;
        var email = event.target.email.value;

        // TODO: Email verification
        // TODO: Error handling for createUser?
        Accounts.createUser({username: username, email: email, password: password, profile: {firstName: first, lastName: last}},
            function (error) {
                if (error) {
                    humane.error(error);
                }
                Router.go('/user/profile');
        });
    }
});

Template.login.events({
    // Handle login
    "submit .login-form": function (event) {
        event.preventDefault();

        var username = event.target.username.value;
        var password = event.target.password.value;

        // TODO: Error message if login fails (need to add a callback)
        Meteor.loginWithPassword(username, password, function (error) {
            if (error) {
                humane.error(error);
            } 
            Router.go('/user/profile');
        });
    }
});
