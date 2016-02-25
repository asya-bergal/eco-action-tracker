Template.changePassword.events({
  'submit #new-password' : function(event) {
      event.preventDefault();
      var password = event.target.password.value;
      var confirm = event.target.confirm.value;

      if(password !== confirm) {
          humane.error("Passwords Do Not Match!");
          // TODO: Display error message on frontend
          return;
      }

      Accounts.resetPassword(this.token, password, function(err){
          if (err)
              humane.error("Resetting password failed. Server error.");
          else {
              Session.set('resetPasswordToken', null);
              humane.log("Password successfully changed!");
              Router.go('/user/profile');
          }
          Session.set('loading', false);
      });
      return false;
  }
});
