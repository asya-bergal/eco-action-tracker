var getTopActionData = function(group){
 
    var users = Meteor.users.find({_id: {$in: group.users.map(function(u){return u.userId;})}}).fetch();
    var actionMap = {};

    users.forEach(function(user){
        user.profile.history.forEach(function(action){
            if(actionMap[action.actionId] !== undefined){
                actionMap[action.actionId] += action.points;
            }else {
                actionMap[action.actionId] = 0;
            }
        });     
    });
    
    var topFive = [{points: 0},{points: 0},{points: 0},{points: 0},{points: 0}];
    
    Object.keys(actionMap).forEach(function(actionId){
        if(actionMap[actionId] > topFive[0].points){
            topFive.pop();
            topFive.splice(0,0,{actionId: actionId, points: actionMap[actionId]});
        } else if (actionMap[actionId] > topFive[1].points){
            topFive.pop();
            topFive.splice(1,0,{actionId: actionId, points: actionMap[actionId]});            
        } else if (actionMap[actionId] > topFive[2].points){
            topFive.pop();
            topFive.splice(2,0,{actionId: actionId, points: actionMap[actionId]});            
        } else if (actionMap[actionId] > topFive[3].points){
            topFive.pop();
            topFive.splice(3,0,{actionId: actionId, points: actionMap[actionId]});          
        } else if (actionMap[actionId] > topFive[4].points){
            topFive.pop();
            topFive.splice(4,0,{actionId: actionId, points: actionMap[actionId]});            
        }
    });

    var colors = [
    {
        color:"#F7464A",
        highlight: "#FF5A5E"
    },
    {
        color: "#bfc1ca",
        highlight: "#e5e6e9"
    },
    {
        color: "#33b4ff",
        highlight: "#84d2ff"
    },
    {
        color: "#46BFBD",
        highlight: "#5AD3D1"
    },        
    {
        color: "#FDB45C",
        highlight: "#FFC870"
    }
  ];

    var data = topFive.map(function(action, index){
        if(action.actionId){
            var actionDoc = Actions.findOne(action.actionId),
            color = colors[index];
            return {
                label: actionDoc.title,
                color: color.color,
                highlight: color.highlight,
                value: action.points
            };
        }else {
            color = colors[index];
            return {
                color: color.color,
                highlight: color.highlight,
                value: action.points
            };
            
        }
    });
    return data;
},
    getWeeklyData = function(group){
        var users = Meteor.users.find({_id: {$in: group.users.map(function(u){return u.userId;})}}).fetch();
        var weekMap = {"Monday":0, "Tuesday":0, "Wednesday":0, "Thursday":0, "Friday":0, "Saturday":0, "Sunday":0 };
        var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        users.forEach(function(user){
            user.profile.history.forEach(function(action){
                var day = action.timestamp.getDay();
                weekMap[weekDays[day]] += action.points;
            });     
        });


        return {
            labels: weekDays,
            datasets: [{
            label: "Points over the last week.",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: weekDays.map(function(key){return weekMap[key];})
        }]
    };
        
    };

Template.GroupStats.rendered = function(){
  if(!this.data){
      return;
  }
  var data = getTopActionData(this.data),
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

  var points_data = getWeeklyData(this.data),
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

