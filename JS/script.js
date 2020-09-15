const API="https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
const canvasHeight=700,
canvasWidth =750,
padding=50;


d3.json(API, (err,data) => {
 const TIME = data.map(item=>item.Time);
 const YEAR= data.map(item=>item.Year);
  
 const Specifier = "%M:%S";
 console.log(TIME);

 const parseTime =TIME.map(time=>{
  return d3.timeParse(Specifier)(time);
})

const xScale = d3.scaleLinear();
xScale.domain([d3.min(YEAR), d3.max(YEAR)]);
xScale.range([padding, canvasWidth-padding])
 
const yScale = d3.scaleTime();
yScale.domain(d3.extent(parseTime))
.range([padding, canvasHeight-padding]);

const dataset = parseTime.map((item, index)=>{
  return([yScale(item), xScale(YEAR[index])]);
});

const xAxis = d3.axisBottom(xScale);
      

/*const gX = svg.append("g")
  .attr("transform", "translate(0,50)")
  .call(axis);*/

const yAxis = d3.axisLeft(yScale)
.tickValues(parseTime)
      .tickFormat((d,i)=>{
        return TIME[i]
      });

console.log(dataset);
  
  const CANVAS =  d3.select(".canvas")
   .append("svg")
   .attr("width", canvasWidth)
   .attr("height", canvasHeight)
   .style("background-color", "white");

   CANVAS.selectAll("circle")
   .data(dataset)
   .enter()
   .append("circle")
   .attr("cx", d => d[1])
   .attr("cy", d=>  d[0])
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
