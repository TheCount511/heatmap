const API="https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
const canvasHeight=820,
canvasWidth =650,
padding=50,
specifier = "%M:%S",
timeFormat = d3.timeFormat("%M:%S");
var y = d3.scaleTime()
  .range([0, canvasHeight]);


d3.json(API, (err,data) => {
 const TIME = data.map(item=>item.Time);
 const YEAR= data.map(item=>item.Year);

data.forEach(function(d) {
    d.Place = +d.Place;
    var parsedTime = d.Time.split(':');
    d.Time = new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1]);
  });


const xScale = d3.scaleLinear();
xScale.domain([d3.min(YEAR)-1, d3.max(YEAR)+1]);
xScale.range([padding, canvasWidth-padding])

const xAxis = d3.axisBottom(xScale); 

y.domain(d3.extent(data, function(d) {
    return d.Time;
  }));
const parseTime =TIME.map(time=>{
  return d3.timeParse(specifier)(time);
})


 const yScale = d3.scaleTime();
yScale.domain(d3.extent(parseTime, (time)=>{console.log(time); return time}))
.range([padding, canvasHeight-padding]);

const yAxis = d3.axisLeft(y).tickFormat(timeFormat)

const dataset = parseTime.map((item, index)=>{
  return([xScale(YEAR[index]), yScale(item)]);
});





  
  const CANVAS =  d3.select(".canvas")
   .append("svg")
   .attr("width", canvasWidth)
   .attr("height", canvasHeight)
   .style("background-color", "white");

   CANVAS.selectAll("circle")
   .data(dataset)
   .enter()
   .append("circle")
   .attr("cx", d => d[0])
   .attr("cy", d=>  d[1])
   .attr("r", "6");
   
   CANVAS.append("g")
   .attr("id", "x-axis")
   .attr("transform", `translate(0, ${canvasHeight-padding})`)
   .call(xAxis);

   CANVAS.append("g")
   .attr("id", "y-axis")
   .attr("transform", `translate(${padding}, 0)`)
   .call(yAxis);

});
