Template.editGroup.helpers({
  'getUsers': function(){
    if(this.users){
      return this.users.map(function(user){
        user_doc = Meteor.users.findOne(user.userId);
        user_doc.groupPoints = user.points;
        return user_doc;
      });
    }
  },
  'getAdmins': function(){
    if(this.admins){
      return this.admins.map(function(user){
        user_doc = Meteor.users.findOne(user);
        return user_doc;
      });
    }
  }, 
  'competitions': function(){
    if(this.competitions){
      return this.competitions.filter(function(c){return c.name});
    }
  }
});