Meteor.methods({
   'addGlobalAdmin': function(userId){
       check(userId, String);
       Meteor.users.update(userId, {$set: {'profile.globalAdmin': true}});
   },
   'removeGlobalAdmin': function(userId){
       check(userId, String);
       Meteor.users.update(userId, {$set: {'profile.globalAdmin': false}});
   },
   'isGlobalAdmin': function(){
       return Meteor.user().profile.globalAdmin;
   }
});