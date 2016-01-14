Template.Group.helpers({
  'admin': function(){
    console.log(this);
    if(this.admins){
      return this.admins.indexOf(Meteor.userId()) !== -1;
    } else{
      return false;
    }
  },
  'users': function(){
    return Meteor.Users.find({_id: {$in: this.users}});
  },
  'competitions': function(){
    if(this.competitions){
      return this.competitions.filter(function(c){return c.name});
    }
  }

});

Template.Group.rendered = function(){
  var data = [
    {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
    },
    {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
    }
  ],
  ctx = $("#myChart").get(0).getContext("2d"),
  myDoughnutChart = new Chart(ctx).Doughnut(data,{
    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke : true,

    //String - The colour of each segment stroke
    segmentStrokeColor : "#fff",

    //Number - The width of each segment stroke
    segmentStrokeWidth : 2,

    //Number - The percentage of the chart that we cut out of the middle
    percentageInnerCutout : 50, // This is 0 for Pie charts

    //Number - Amount of animation steps
    animationSteps : 100,

    //String - Animation easing effect
    animationEasing : "easeOutBounce",

    //Boolean - Whether we animate the rotation of the Doughnut
    animateRotate : true,

    //Boolean - Whether we animate scaling the Doughnut from the centre
    animateScale : false,

});

}

Template.competition.helpers({
  'humanify': function(date){
      return date.toDateString();
  }
})