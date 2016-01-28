Router.map(function () {
    this.route('txtFile', {
        where: 'server',
        path: '/userEmails',
        action: function () {            
            var userEmails = Meteor.users.find({}, {fields: {'emails':1}}).fetch().map(function(u){
                return u.emails;
            }).reduce(function(a, b) {
                return a.concat(b);
              }, []).map(function(e){
                  return e.address;
              }).join(', ');

            var filename = 'emails' + '.txt';

            var headers = {
                'Content-Type': 'text/plain',
                'Content-Disposition': "attachment; filename=" + filename
            };

            this.response.writeHead(200, headers);
            return this.response.end(userEmails);
        }
    });
});