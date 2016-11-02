angular.module('devcamp').controller('graphsCtrl', ['d3', '$scope', function (d3, $scope){
    $scope.drawBarChart = function(){ // Function for creating bar chart
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
        var x = d3.scaleBand()
            .rangeRound([0, width], .1)
            .paddingInner(0.1);
        var y = d3.scaleLinear()
            .range([height, 0]);
        var x2 = d3.scaleOrdinal()
            .range([0, width], 0);
        var xAxis = d3.axisBottom()
            .scale(x);
        var yAxis = d3.axisLeft()
            .scale(y)
            .ticks(5, "f");
        var svg = d3.select("#bar-chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        d3.tsv("assets/mockData/data.tsv", type, function(error, data) {
            if (error) throw error;
            x.domain(data.map(function(d) { return d.school; }));
            x2.domain(data.map(function(d) { return d.school; }));
            y.domain([0, d3.max(data, function(d) { return d.length; })]);
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);
            svg.append("text")             
                .attr("transform", "translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
                .style("text-anchor", "middle")
                .text("School");
            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("School");      
            svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return x(d.school); })
                .attr("width", x.bandwidth())
                .attr("y", function(d) { return y(d.length); })
                .attr("height", function(d) { return height - y(d.length); });

            var dataSum = d3.sum(data, function(d) { return d.length; }); 
 
            var line = d3.line()
                .x(function(d, i) { 
                  return x2(d.school) + i; })
                .y(function(d, i) { return y(dataSum/data.length); }); 
              
            svg.append("path")
                .datum(data)
                .attr("class", "line")
                .attr("d", line);

        });
        function type(d) {
          d.length = +d.length;
          return d;
        }
    }
    $scope.drawBarChart(); // Call to draw bar chart
}]);
  // svg.append("g")
  //     .call(d3.axisLeft(y));

  // // text label for the y axis
  // svg.append("text")
  //     .attr("transform", "rotate(-90)")
  //     .attr("y", 0 - margin.left)
  //     .attr("x",0 - (height / 2))
  //     .attr("dy", "1em")
  //     .style("text-anchor", "middle")
  //     .text("Value");      
