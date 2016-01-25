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
  },
  'getUserRequests': function(){
    if(this.usersRequesting){
      return this.usersRequesting.map(function(userId){
        return Meteor.users.findOne(userId);
      });
    }    
  },
  diff: function(id){
      return id !== Meteor.userId();
  }
});

Template.editGroup.events({
  'click .add-actions': function(e){
    $('.add-action-form').toggleClass('visible');
  },
  'click .add-user': function(e){
    $('.add-user-form').toggleClass('visible');
  },
  'click .add-admin': function(e){
    $('.add-admin-form').toggleClass('visible');
  },

  'submit .add-action-form': function(e){
    e.preventDefault();
    var actionJson = {
      title: e.target.title.value,
      defaultPoints: e.target.points.value,
      dailyCap: e.target.cap.value
    };

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
  },
  'click .remove-user': function(e){
    var userId = e.target.getAttribute('id');
    Meteor.call('removeUser', this._id, userId, function(err){
      if(err){
        console.log(err);
      }
    });
  },
  'click .request-user': function(e){
    var userId = e.target.getAttribute('id');
    Meteor.call('addUser', this._id, userId, function(err){
      if(err){
        console.log(err);
      }
    });  
  },
  'click .global': function(e){
    var actionId = e.target.getAttribute('id');
    Meteor.call('submitForApproval', actionId, function(err){
      if(err){
        console.log(err);
      }
    });     
  },
  'click .edit-group-name': function(e){
      console.log('eyy');
   $('.group-name').toggleClass('hidden');
   $('.group-name-field').toggleClass('visible');
   Meteor.call('updateGroupName', this._id, $('.group-name-field').val(), function(err){
      if(err){
          console.log(err);
      } 
   });
  },
  'click .new-competition': function(e){
    console.log("Adding new competition");
    $('.add-competition-here').toggleClass('visible');
  }
});