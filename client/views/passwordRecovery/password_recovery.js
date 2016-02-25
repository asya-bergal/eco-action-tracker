Template.passwordRecovery.events({
    'submit #recovery-form' : function(e, t) {
        e.preventDefault();
        var email = t.find('#recovery-email').value;

        Session.set('loading', true);
        Accounts.forgotPassword({email: email}, function(err){
          if (err)
              humane.error('Error. You may have an invalid email.');
          else {
              humane.log('Please check your email for a reset link.');
          }
          Session.set('loading', false);
        });
        t.find("form").reset();

    }
});
