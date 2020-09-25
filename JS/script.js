const API = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"

const canvasHeight = 800,
canvasWidth = 850,
padding =  150


const Header = d3.select("body").append("section").append("h3");
const CANVAS = d3.select("body").append("svg")
				.attr("class", "canvas")
				.attr("width", canvasWidth)
				.attr("height", canvasHeight)


/*const Tooltip = d3.select("body").append("div")
				.attr("id", "tooltip")
				.style("opacity", "0");

	
	  const mouseOver = (d)=>{
	  	Tooltip.transition()
	  	.duration(200);

	  	Tooltip.html(``)
	  }		

	  const mouseOut =()=>{
	  	Tooltip.transition()
	  	.duration(200)
	  	Tooltip.style("opacity", "0");
	  }*/

d3.json(API, (err, data)=>{
const minYear = d3.min(data.monthlyVariance, (d)=>d.year);
const maxYear = d3.max(data.monthlyVariance, (d)=>d.year);


Header.html(`${minYear} - ${maxYear}: 
base temperature: ${data.baseTemperature}\xB0C`)
.style("text-align", "center")
});



