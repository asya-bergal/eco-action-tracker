Template.Group.helpers({
  'admin': function(){
    if(this.admins){
      return this.admins.indexOf(Meteor.userId()) !== -1;
    } else{
      return false;
    }
  },
  'getUsers': function(){
    if(this.users){
        this.users.sort(function(a,b){return a.points - b.points;});
      return this.users.map(function(user){
        user_doc = Meteor.users.findOne(user.userId);
        user_doc.groupPoints = user.points;
        return user_doc;
      });
    }
  },
  'competitions': function(){
    if(this.competitions){
      return this.competitions.filter(function(c){return c.name});
    }
  },
  'notInGroup': function(){
    return $.grep(this.users, function(e){
        return e.userId === Meteor.userId();
    }).length !== 1;
  },
  'requestPending': function(){
    return $.grep(this.usersRequesting, function(e){return e === Meteor.userId();}).length === 1;
  }

});

Template.Group.events({
   'click #request': function(e){
       Meteor.call("requestToJoin", this._id);
   } 
});


Template.Group.rendered = function(){
  var data = [
    {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Riding Bike to School"
    },
    {
        value: 50,
        color: "#bfc1ca",
        highlight: "#e5e6e9",
        label: "Turn Off the Lights"
    },
    {
        value: 150,
        color: "#33b4ff",
        highlight: "#84d2ff",
        label: "Planting a Tree"
    },
    {
        value: 200,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Bought Local Goods"
    },        
    {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Using Reuseable Water Bottle"
    }
  ],
  donut_ctx = $("#donutChart").get(0).getContext("2d"),
  myDoughnutChart = new Chart(donut_ctx).Doughnut(data,{
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

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"


});

  var points_data = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [{
            label: "Points over the last week.",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        }]
    },
    line_ctx = $("#lineChart").get(0).getContext("2d"),
    myLineChart = new Chart(line_ctx).Line(points_data,{

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - Whether the line is curved between points
    bezierCurve : true,

    //Number - Tension of the bezier curve between points
    bezierCurveTension : 0.4,

    //Boolean - Whether to show a dot for each point
    pointDot : true,

    //Number - Radius of each point dot in pixels
    pointDotRadius : 4,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 20,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

  });
};

Template.competition.helpers({
  'humanify': function(date){
      return date.toDateString();
  }
})