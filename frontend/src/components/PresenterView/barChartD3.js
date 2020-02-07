const d3 = require('d3')
const barChartD3 = {};

barChartD3.placeholder = function(el, configs) {
  d3.select(el).append('svg')
    .attr('class', 'd3').attr('width', configs.width)
    .attr('height', configs.height + configs.margin.bottom)
    .style('border', '1px solid black')
}

barChartD3.create = function(el, data, configs) {  

  const svg = d3.select(el).append('svg')
    .attr('class', 'd3').attr('width', configs.width)
    .attr('height', configs.height + configs.margin.bottom)
    .style('border', '1px solid black')

  svg.append('g')
    .attr('class', 'd3-bars')

  // this.update(el, data, configs)
}

// http://nicolashery.com/integrating-d3js-visualizations-in-a-react-app/
// scaling points - for window resizing... deal with later
// var pointScale = d3.scalePoint()
// 	.domain(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
// 	.range([0, 600]);
// barChartD3._scales = function(data, classSize) {
//   // scale col width and height based on [canvas size relative to screen size] and number of cols and a guess at max col height...
//   return {x: 10, y: 10}
// }
// scaling: based on document.getElementById('bar_chart').offsetWidth (offsetWidth universal? check fe-nc-news scrolling)
// also: number of question responses
// also: number of people in room (maybe... think about this)

barChartD3._scales = function(labels, configs) {
  const { height, nAttendees } = configs
  return {
    y: height * .95 / nAttendees,
    // determine transform for rotating text based on pixel size
  }
}

barChartD3.update = function(el, data, configs) {
  const scales = this._scales({}, configs)
  this._drawBars(el, data, configs, scales)
}

barChartD3.destroy = function(el, data) {
  // anything to clean up?
  // https://stackoverflow.com/questions/11091865/how-does-dom-node-cleanup-work-in-d3
  // if the same data is displayed both before and after the update, then you may not need to recompute all of its attributes
  d3.selectAll('.d3-bars').data([]).enter()
  d3
    .selectAll('g.tick')
    .exit().remove();
}


// data: x labels must be unique (and orderable?)
barChartD3._drawBars = function(el, data, configs, scales) {
  const x = d3.scaleBand()
    .domain(data.map(d => `${d.label}: ${d.y}`))
    .range([ 0, configs.width ])
    .padding(0.2)

  d3.select(el).selectAll('.d3-bars')
    .append('g')
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + configs.height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    // .attr("transform", "translate(-10,0)rotate(-45)")
    .attr("transform", "translate(0,0)")
    // .style("text-anchor", "end")
    // .style("text-align", "center")
    // .style('border', '1px solid black');

      //Create labels
  


  const g = d3.select(el).selectAll('.d3-bars')

  const bars = g.selectAll('.bar')
  // each point should have an id
    .data(data, function(d) { return d.id })

  
  bars.enter().append('rect')
  .attr('class', 'bar')
      .attr('x', function(d) { return x(d.label)})
      .attr('width', x.bandwidth)
      .attr('y', function(d) { return configs.height - scales.y * d.oldY})
      .attr('height', function(d) { return scales.y * d.oldY })
      .attr('fill', '#cdc6ff')
      
  // const anotherG = d3.select(el).append('g').attr("class", "tot")

  // const moreText = anotherG.selectAll('text')
  //   .data(data, function(d) { return d.id })


  //   moreText
  //     // .data(data, function(d) { return d.id })
  //     .enter()
  //     .append("text")
  //     .attr('x', function(d) { console.log(x(d.label), '\n\nXXXx label');return x.bandwidth()/2 + x(d.label)})
  //     .attr("y", function(d) {
  //       // console.log('height of text', scales.y * (d.y) - 14)
  //         return configs.height - (scales.y * (d.y) - 30);
  //     })
  //     .text(function(d) {
  //         return d.y;
  //     })
  //     // .attr("text-anchor", "middle")
  //     .attr("font-family", "sans-serif")
  //     .attr("font-size", "30px")
  //     .attr("color", "white"); 


  d3.selectAll('.d3-bars rect').transition()
      .duration(1000)
      .attr('y', function(d) {console.log('starting transition'); return configs.height - scales.y * d.y })
      .attr('height', function(d) {console.log(scales.y, d.y); return scales.y * d.y })
      .attr('fill', '#ffb347')
      .delay((d, i) => {return i * 30})

     
}



// //Create labels
// d3.selectAll("text")
// .data(dataset)
// .enter()
// .append("text")
// .text(function(d) {
//     return d;
// })
// .attr("text-anchor", "middle")
// .attr("x", function(d, i) {
//     return xScale(i) + xScale.bandwidth() / 2;
// })
// .attr("y", function(d) {
//     return yScale(d) + 14;
// })
// .attr("font-family", "sans-serif")
// .attr("font-size", "11px")
// .attr("fill", "white"); 

// //Define sort order flag
// var sortOrder = false;

// //Define sort function
// var sortBars = function() {

// //Flip value of sortOrder
//   sortOrder = !sortOrder;

// svg.selectAll("rect")
//   .sort(function(a, b) {
//       if (sortOrder) {
//         return d3.ascending(a, b);
//       } else { 
//         return d3.descending(a, b);
//       }
//     })
//   .transition()
//   .delay(function(d, i) {
//     return i * 50;
//   })
//   .duration(1000)
//   .attr("x", function(d, i) {
//       return xScale(i);
//   });

// svg.selectAll("text")
//   .sort(function(a, b) {
//       if (sortOrder) {
//         return d3.ascending(a, b);
//       } else { 
//         return d3.descending(a, b);
//       }
//     })
//   .transition()
//   .delay(function(d, i) {
//     return i * 50;
//   })
//   .duration(1000)
//   .attr("x", function(d, i) {
//       return xScale(i) + xScale.bandwidth()/2;
//   });

// };			


// barChartD3.update = function(el, data, configs) {
//   const scales = this._scales({}, configs)
//   console.log('updating, scales:', scales)
//   this._updateBars(configs, scales)
// }

// barChartD3._updateBars = function(configs, scales) {
    
//     d3.selectAll('.d3-bars rect').transition()
//       .duration(1000)
//       .attr('y', function(d) {console.log('starting transition'); return configs.height - scales.y * d.y })
//       .attr('height', function(d) {console.log(scales.y, d.y); return scales.y * d.y })
//       .attr('fill', '#ffb347')
//       .delay((d, i) => {return i * 30})

// }




barChartD3.newChart = function(el, data, configs, scales) {

  // Select the section we want to apply our changes to
  const svg = d3.select(el).transition();

  const x = d3.scaleBand()
    .domain(data.map(d => d.label))
    .range([ 0, configs.width ])
    .padding(0.2)


  // Make the changes
      svg.select("g.x-axis")   // change the line
          .duration(750) 
          .attr("transform", "translate(0," + configs.height + ")")
          .call(d3.axisBottom(x))
          .selectAll("text")
          // .attr("transform", "translate(-10,0)rotate(-45)")
          .attr("transform", "translate(0,0)")      
      
      // svg.select("rect") // change the x axis
      //     .duration(750)
      //     .call(xAxis);
      // svg.select(".y.axis") // change the y axis
      //     .duration(750)
      //     .call(yAxis);

  
}

export default barChartD3