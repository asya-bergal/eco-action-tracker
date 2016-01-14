Template.Group.helpers({
  'admin': function(){
    if(this.admins){
      return this.admins.indexOf(Meteor.userId()) !== -1;
    } else{
      return false;
    }
  },
  'users': function(){
    return Meteor.Users.find({_id: {$in: this.users}});
  }

});