const API="https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
const canvasHeight=520,
canvasWidth =670,
padding=100,
specifier = "%M:%S",
timeFormat = d3.timeFormat("%M:%S"),
color=d3.scaleOrdinal(d3.schemeCategory10);

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

const yScale = d3.scaleTime()
  .range([padding, canvasHeight-padding]);

yScale.domain(d3.extent(data, function(d) {
    return d.Time;
  }));

const yAxis = d3.axisLeft(yScale)
      .tickFormat(timeFormat)


  
  const CANVAS =  d3.select(".canvas")
   .append("svg")
   .attr("width", canvasWidth)
   .attr("height", canvasHeight)
   .style("background-color", "white");

   CANVAS.selectAll("circle")
   .data(data)
   .enter()
   .append("circle")
   .attr("cx", (d)=>xScale(d.Year))
   .attr("cy", (d)=>yScale(d.Time))
   .attr("r", "5")
   .attr("fill", d=>{return(color(d.Doping != ""))})
   ;
   
   CANVAS.append("g")
   .attr("id", "x-axis")
   .attr("transform", `translate(0, ${canvasHeight-padding})`)
   .call(xAxis);

   CANVAS.append("g")
   .attr("id", "y-axis")
   .attr("transform", `translate(${padding}, 0)`)
   .call(yAxis);

   CANVAS.append("text")
   .attr("transform", `rotate(-90)`)
   .attr("x", "-200")
   .attr("y", "0")
   .text("Time in Minutes")
});
