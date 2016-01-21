Template.editGroup.helpers({

  'getActions': function(){
    if(this.actions){
      return this.actions.map(function(actionId){
         return Meteor.users.findOne(actionId);;
      });
    }
  },
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

Template.editGroup.events({
  'submit .add-action-form': function(e){
    e.preventDefault();
    var actionJson = {
      title: e.target.title.value,
      defaultPoints: e.target.points.value,
      dailyCap: e.target.cap.value
    }

  },
  'submit .add-user-form': function(e){
    e.preventDefault();
    var userId = Meteor.users.findOne({username:event.target.username.value})._id;
    Meteor.call("addUser",this._id,userId, function(err,res){
      if(err){
        console.log(err);
      }
    });
  },
  'submit .add-admin-form': function(e){
    e.preventDefault();
    var userId = Meteor.users.findOne({username:event.target.username.value})._id;
    Meteor.call("addAdmin",this._id,userId, function(err,res){
      if(err){
        console.log(err);
      }
    });
  }
});