var getTopActionData = function (group) {
    var actionMap = {};
    group.history.forEach(function (action) {
        if (actionMap[action.actionId] !== undefined) {
            actionMap[action.actionId] += action.points;
        } else {
            actionMap[action.actionId] = 0;
        }
    });

    var topFive = [{points: 0}, {points: 0}, {points: 0}, {points: 0}, {points: 0}];

    Object.keys(actionMap).forEach(function (actionId) {
        if (actionMap[actionId] > topFive[0].points) {
            topFive.pop();
            topFive.splice(0, 0, {actionId: actionId, points: actionMap[actionId]});
        } else if (actionMap[actionId] > topFive[1].points) {
            topFive.pop();
            topFive.splice(1, 0, {actionId: actionId, points: actionMap[actionId]});
        } else if (actionMap[actionId] > topFive[2].points) {
            topFive.pop();
            topFive.splice(2, 0, {actionId: actionId, points: actionMap[actionId]});
        } else if (actionMap[actionId] > topFive[3].points) {
            topFive.pop();
            topFive.splice(3, 0, {actionId: actionId, points: actionMap[actionId]});
        } else if (actionMap[actionId] > topFive[4].points) {
            topFive.pop();
            topFive.splice(4, 0, {actionId: actionId, points: actionMap[actionId]});
        }
    });

    var colors = [
        {
            color: "#F7464A",
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

    return topFive.map(function (action, index) {
        if (action.actionId) {
            var actionDoc = Actions.findOne(action.actionId),
                    color = colors[index];
            return {
                label: actionDoc.title,
                color: color.color,
                highlight: color.highlight,
                value: action.points
            };
        } else {
            color = colors[index];
            return {
                color: color.color,
                highlight: color.highlight,
                value: action.points
            };

        }
    });
},
        getWeeklyData = function (group) {
            var weekMap = {"Monday": 0, "Tuesday": 0, "Wednesday": 0, "Thursday": 0, "Friday": 0, "Saturday": 0, "Sunday": 0};
            var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    now = new Date();
            group.history.forEach(function (action) {
                if (now - action.timestamp <= Meteor.App['SEVEN-DAYS']) {
                    var day = action.timestamp.getDay();
                    weekMap[weekDays[day]] += action.points;
                }
            });
            weekDays.rotate(now.getDay());
            weekDays.reverse();

            return {
                labels: weekDays,
                datasets: [{
                        label: "Points over the last week.",
                        fillColor: "rgba(255,99,71,0.2)",
                        strokeColor: "rgba(255,127,80,1)",
                        pointColor: "rgba(255,127,80,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: weekDays.map(function (key) {
                            return weekMap[key];
                        })
                    }]
            };
        },
        getWeekData = function (group) {
            var week = 1,
                    prev = group.creationDate,
                    weekData = [0];

            group.history.forEach(function (action) {
                if (prev - action.timestamp > Meteor.App['SEVEN-DAYS']) {
                    var weeks = Math.round((prev - action.timestamp) / Meteor.App['SEVEN-DAYS']);
                    for (week++; week < weeks; week++) {
                        weekData[week] = 0;
                    }

                }
                if (weekData[week]) {
                    weekData[week] += action.points;
                } else{
                    weekData[week] = action.points;                    
                }
            });

            return {
                labels: weekData.map(function (points, index) {
                    return index;
                }),
                datasets: [{
                        label: "Points over the last week.",
                        fillColor: "rgba(230,230,250,0.2)",
                        strokeColor: "rgba(216,191,216,1)",
                        pointColor: "rgba(216,191,216,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: weekData
                    }]
            };

        };

Template.GroupStats.rendered = function () {
    if (!this.data) {
        return;
    }
    var data = getTopActionData(this.data),
            donut_ctx = $("#donutChart").get(0).getContext("2d"),
            myDoughnutChart = new Chart(donut_ctx).Doughnut(data, Meteor.App.DONUTOPTIONS),
            donut_legend = myDoughnutChart.generateLegend();

    $("#donut-container").prepend(donut_legend);
    var points_data = getWeeklyData(this.data),
            line_ctx = $("#lineChart").get(0).getContext("2d"),
            myLineChart = new Chart(line_ctx).Line(points_data, Meteor.App.LINECHARTOPTIONS);
    var lifetime_data = getWeekData(this.data),
            lifetime_ctx = $("#lifetimeChart").get(0).getContext("2d"),
            myLifeTimeChart = new Chart(lifetime_ctx).Line(lifetime_data, Meteor.App.LINECHARTOPTIONS);

};

