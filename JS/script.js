const API="https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
const canvasHeight=550,
canvasWidth =700,
paddingLeft=70,
paddingTop=40,
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
xScale.range([paddingLeft, canvasWidth-paddingLeft])

const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d")); 

const yScale = d3.scaleTime()
  .range([paddingTop, canvasHeight-paddingTop]);

yScale.domain(d3.extent(data, function(d) {
    return d.Time;
  }));

const yAxis = d3.axisLeft(yScale)
      .tickFormat(timeFormat)


  
  const CANVAS =  d3.select("body")
   .append("svg")
   .attr("class", "canvas")
   .attr("width", canvasWidth)
   .attr("height", canvasHeight)
   .style("background-color", "white");

  const Tooltip =  d3.select("body")
  .append("div")
  .attr("id", 'tooltip')
  .style("opacity", "0");


  const mouseOver = (d)=>{
    Tooltip.transition()
    .duration(200)
    .style("opacity", "0.9")
    
    Tooltip.html(`${d.Name} : ${d.Nationality} 
      <br>Year     : ${d.Year}
      <br>Time  : ${timeFormat(d.Time)}
      <br>${d.Doping}`)
      .attr('data-year', d.Year)
      .style('left', `${xScale(d.Year)+4}px`)
      .style('top', `${yScale(d.Time)+150}px`);
  }

  const mouseOut=()=>{
    Tooltip.transition()
    .duration(200)
    .style("opacity", "0");
  }

   CANVAS.selectAll("circle")
   .data(data)
   .enter()
   .append("circle")
   .attr("class", "dot")
   .attr("cx", (d)=>xScale(d.Year))
   .attr("cy", (d)=>yScale(d.Time))
   .attr('data-xvalue', (d)=>d.Year)
   .attr('data-yvalue', (d)=>d.Time)
   .attr("r", "6")
   .style("opacity", 0.7)
   .attr("fill", d=>{return(color(d.Doping != ""))})
   .on("mouseover", mouseOver)
   .on("mouseout", mouseOut)
   ;
   
   CANVAS.append("g")
   .attr("id", "x-axis")
   .attr("transform", `translate(0, ${canvasHeight-paddingTop})`)
   .call(xAxis);

   CANVAS.append("g")
   .attr("id", "y-axis")
   .attr("transform", `translate(${paddingLeft}, 0)`)
   .call(yAxis);

   CANVAS.append("text")
   .attr("transform", `rotate(-90)`)
   .attr("x", "-200")
   .attr("y", "20")
   .text("Time in Minutes");

 /*  CANVAS.append("text")
   .attr("x","455")
   .attr("y", "200")
   .text("No doping allegations");

  CANVAS.append("rect")
   .attr("x","600")
   .attr("y", "186")
   .attr("width", 20)
  .attr("height", 20)
  .attr("fill", color(false));

   CANVAS.append("text")
   .attr("x","400")
   .attr("y", "230")
   .text("Riders with doping allegations");

   CANVAS.append("rect")
   .attr("x","600")
   .attr("y", "215")
   .attr("width", 20)
  .attr("height", 20)
  .attr("fill", color(true));
*/
const legendContainer = CANVAS.append("g")
.attr("id", "legend");

const legend = legendContainer.selectAll("#legend")
.data(color.domain())
.enter().append("g")
.attr("class", "legend-label")
.attr("transform", (d,i)=>`translate(0, ${canvasHeight/2-i*20})`)

  legend.append("rect")
    .attr("x", canvasWidth - 50)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

legend.append("text")
.attr("x", canvasWidth-60)
.attr("y", 9)
.style("text-anchor", "end")
.attr("dy", "0.35em")
.text((d)=>(d?"Riders with doping allegations"
  :"No doping allegations"));
});
