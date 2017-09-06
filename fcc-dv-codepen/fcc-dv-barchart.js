
////////////////////////////////////////////////////////////////
// refactored example from https://bl.ocks.org/mbostock/3885304
////////////////////////////////////////////////////////////////
var data0 = `letter	frequency
A	.08167
B	.01492
C	.02782
D	.04253
E	.12702
F	.02288
G	.02015
H	.06094
I	.06966
J	.00153
K	.00772
L	.04025
M	.02406
N	.06749
O	.07507
P	.01929
Q	.00095
R	.05987
S	.06327
T	.09056
U	.02758
V	.00978
W	.02360
X	.00150
Y	.01974
Z	.00074`;

var data1 = d3.tsvParse(data0);
var data2 = data1.map(function(d) {
  d.frequency = +d.frequency;
  return d;
});



// WITH TOOLTIP
(function(data) {
  var svg = d3.select("svg.second"),
      margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

  var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);

  var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var tooltip = d3.select('body')
     .append('div')
     .style('position', 'absolute')
     .style('padding', '0 10px')
     .style('background', 'white')
     .style('opacity', 0);
 
  x.domain(data.map(function(d) { return d.letter; }));
  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "%"))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");

  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("y", function(d) { return y(d.frequency); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.frequency); })
      .on('mouseover', function(d) {
        var opacity = parseInt(tooltip.style("opacity"));
        if (opacity == 0) {
          tooltip.transition().style('opacity', .9)
          tooltip.html(
            '<div style="font-size: 2rem; font-weight: bold">' +
              (d.frequency*100).toFixed(2) + '%</div>'
          )
            .style('left', (d3.event.pageX -35) + 'px')
            .style('top', (d3.event.pageY -30) + 'px')
            .style('pointer-events', 'none')


          }
      })

      .on('mouseout', function(d) {
    console.log("out");
        tooltip.html('')
      });
   ;
})(data2);



// FROM LYNDA.COM
var forecast = {"cod":"200","message":0.0077,"cnt":40,"list":[{"dt":1490994000,"main":{"temp":93.58,"temp_min":80.82,"temp_max":93.58,"pressure":1021.6,"sea_level":1024.42,"grnd_level":1021.6,"humidity":59,"temp_kf":7.09},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":0},"wind":{"speed":9.28,"deg":238.501},"rain":{"3h":0.21},"sys":{"pod":"d"},"dt_txt":"2017-03-31 21:00:00"},{"dt":1491004800,"main":{"temp":86.72,"temp_min":77.15,"temp_max":86.72,"pressure":1022.46,"sea_level":1025.25,"grnd_level":1022.46,"humidity":55,"temp_kf":5.32},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":9.55,"deg":263.001},"rain":{},"sys":{"pod":"n"},"dt_txt":"2017-04-01 00:00:00"},{"dt":1491015600,"main":{"temp":75.65,"temp_min":69.26,"temp_max":75.65,"pressure":1024.72,"sea_level":1027.56,"grnd_level":1024.72,"humidity":74,"temp_kf":3.54},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":9.13,"deg":269.001},"rain":{},"sys":{"pod":"n"},"dt_txt":"2017-04-01 03:00:00"},{"dt":1491026400,"main":{"temp":67.26,"temp_min":64.07,"temp_max":67.26,"pressure":1025.34,"sea_level":1028.19,"grnd_level":1025.34,"humidity":96,"temp_kf":1.77},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":7.25,"deg":265.003},"rain":{},"sys":{"pod":"n"},"dt_txt":"2017-04-01 06:00:00"},{"dt":1491037200,"main":{"temp":61.69,"temp_min":61.69,"temp_max":61.69,"pressure":1025.46,"sea_level":1028.3,"grnd_level":1025.46,"humidity":99,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":0},"wind":{"speed":5.77,"deg":265.002},"rain":{"3h":0.0025000000000002},"sys":{"pod":"n"},"dt_txt":"2017-04-01 09:00:00"},{"dt":1491048000,"main":{"temp":61.14,"temp_min":61.14,"temp_max":61.14,"pressure":1027.23,"sea_level":1030.17,"grnd_level":1027.23,"humidity":96,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":4.27,"deg":268.502},"rain":{},"sys":{"pod":"d"},"dt_txt":"2017-04-01 12:00:00"},{"dt":1491058800,"main":{"temp":76.58,"temp_min":76.58,"temp_max":76.58,"pressure":1028.59,"sea_level":1031.49,"grnd_level":1028.59,"humidity":57,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":4.88,"deg":319.508},"rain":{},"sys":{"pod":"d"},"dt_txt":"2017-04-01 15:00:00"},{"dt":1491069600,"main":{"temp":82.18,"temp_min":82.18,"temp_max":82.18,"pressure":1027.72,"sea_level":1030.5,"grnd_level":1027.72,"humidity":45,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":4.09,"deg":335.001},"rain":{},"sys":{"pod":"d"},"dt_txt":"2017-04-01 18:00:00"},{"dt":1491080400,"main":{"temp":84.27,"temp_min":84.27,"temp_max":84.27,"pressure":1026.08,"sea_level":1028.9,"grnd_level":1026.08,"humidity":36,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":4.05,"deg":307.502},"rain":{},"sys":{"pod":"d"},"dt_txt":"2017-04-01 21:00:00"},{"dt":1491091200,"main":{"temp":76.11,"temp_min":76.11,"temp_max":76.11,"pressure":1026.5,"sea_level":1029.37,"grnd_level":1026.5,"humidity":45,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":2.75,"deg":301.5},"rain":{},"sys":{"pod":"n"},"dt_txt":"2017-04-02 00:00:00"},{"dt":1491102000,"main":{"temp":65.76,"temp_min":65.76,"temp_max":65.76,"pressure":1028.19,"sea_level":1031.1,"grnd_level":1028.19,"humidity":63,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":3.47,"deg":49.0031},"rain":{},"sys":{"pod":"n"},"dt_txt":"2017-04-02 03:00:00"},{"dt":1491112800,"main":{"temp":61.21,"temp_min":61.21,"temp_max":61.21,"pressure":1028.62,"sea_level":1031.45,"grnd_level":1028.62,"humidity":91,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"02n"}],"clouds":{"all":8},"wind":{"speed":3.2,"deg":129.502},"rain":{},"sys":{"pod":"n"},"dt_txt":"2017-04-02 06:00:00"},{"dt":1491123600,"main":{"temp":58.28,"temp_min":58.28,"temp_max":58.28,"pressure":1028.13,"sea_level":1031.04,"grnd_level":1028.13,"humidity":93,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"clouds":{"all":36},"wind":{"speed":2.06,"deg":167},"rain":{},"sys":{"pod":"n"},"dt_txt":"2017-04-02 09:00:00"},{"dt":1491134400,"main":{"temp":59.4,"temp_min":59.4,"temp_max":59.4,"pressure":1028.7,"sea_level":1031.67,"grnd_level":1028.7,"humidity":90,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"clouds":{"all":20},"wind":{"speed":2.62,"deg":109.501},"rain":{},"sys":{"pod":"d"},"dt_txt":"2017-04-02 12:00:00"},{"dt":1491145200,"main":{"temp":79.93,"temp_min":79.93,"temp_max":79.93,"pressure":1029.78,"sea_level":1032.57,"grnd_level":1029.78,"humidity":49,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"clouds":{"all":24},"wind":{"speed":4.61,"deg":141.507},"rain":{},"sys":{"pod":"d"},"dt_txt":"2017-04-02 15:00:00"},{"dt":1491156000,"main":{"temp":86.2,"temp_min":86.2,"temp_max":86.2,"pressure":1028.19,"sea_level":1031.1,"grnd_level":1028.19,"humidity":40,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"clouds":{"all":68},"wind":{"speed":6.06,"deg":136},"rain":{},"sys":{"pod":"d"},"dt_txt":"2017-04-02 18:00:00"},{"dt":1491166800,"main":{"temp":87.83,"temp_min":87.83,"temp_max":87.83,"pressure":1026.42,"sea_level":1029.29,"grnd_level":1026.42,"humidity":35,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":7.74,"deg":128.005},"rain":{},"sys":{"pod":"d"},"dt_txt":"2017-04-02 21:00:00"},{"dt":1491177600,"main":{"temp":81.06,"temp_min":81.06,"temp_max":81.06,"pressure":1026.64,"sea_level":1029.49,"grnd_level":1026.64,"humidity":36,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"clouds":{"all":20},"wind":{"speed":10.54,"deg":116.5},"rain":{},"sys":{"pod":"n"},"dt_txt":"2017-04-03 00:00:00"},{"dt":1491188400,"main":{"temp":72.4,"temp_min":72.4,"temp_max":72.4,"pressure":1027.98,"sea_level":1030.8,"grnd_level":1027.98,"humidity":56,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"02n"}],"clouds":{"all":8},"wind":{"speed":11.1,"deg":118},"rain":{},"sys":{"pod":"n"},"dt_txt":"2017-04-03 03:00:00"},{"dt":1491199200,"main":{"temp":67.39,"temp_min":67.39,"temp_max":67.39,"pressure":1027.15,"sea_level":1030.06,"grnd_level":1027.15,"humidity":78,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"clouds":{"all":12},"wind":{"speed":9.17,"deg":126.003},"rain":{},"sys":{"pod":"n"},"dt_txt":"2017-04-03 06:00:00"},{"dt":1491210000,"main":{"temp":64.18,"temp_min":64.18,"temp_max":64.18,"pressure":1026.96,"sea_level":1029.77,"grnd_level":1026.96,"humidity":92,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"clouds":{"all":20},"wind":{"speed":6.93,"deg":135.501},"rain":{},"sys":{"pod":"n"},"dt_txt":"2017-04-03 09:00:00"},{"dt":1491220800,"main":{"temp":64.85,"temp_min":64.85,"temp_max":64.85,"pressure":1026.78,"sea_level":1029.6,"grnd_level":1026.78,"humidity":91,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"02d"}],"clouds":{"all":8},"wind":{"speed":8.66,"deg":133.503},"rain":{},"sys":{"pod":"d"},"dt_txt":"2017-04-03 12:00:00"},{"dt":1491231600,"main":{"temp":79.1,"temp_min":79.1,"temp_max":79.1,"pressure":1026.76,"sea_level":1029.57,"grnd_level":1026.76,"humidity":57,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"clouds":{"all":12},"wind":{"speed":13,"deg":144.51},"rain":{},"sys":{"pod":"d"},"dt_txt":"2017-04-03 15:00:00"},{"dt":1491242400,"main":{"temp":87.6,"temp_min":87.6,"temp_max":87.6,"pressure":1024.57,"sea_level":1027.38,"grnd_level":1024.57,"humidity":40,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":12.97,"deg":155.503},"rain":{},"sys":{"pod":"d"},"dt_txt":"2017-04-03 18:00:00"},{"dt":1491253200,"main":{"temp":90.2,"temp_min":90.2,"temp_max":90.2,"pressure":1021.73,"sea_level":1024.4,"grnd_level":1021.73,"humidity":33,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"clouds":{"all":12},"wind":{"speed":12.33,"deg":180.501},"rain":{},"sys":{"pod":"d"},"dt_txt":"2017-04-03 21:00:00"},{"dt":1491264000,"main":{"temp":82.93,"temp_min":82.93,"temp_max":82.93,"pressure":1020.59,"sea_level":1023.34,"grnd_level":1020.59,"humidity":51,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"clouds":{"all":64},"wind":{"speed":13.13,"deg":186.002},"rain":{},"sys":{"pod":"n"},"dt_txt":"2017-04-04 00:00:00"},{"dt":1491274800,"main":{"temp":78.15,"temp_min":78.15,"temp_max":78.15,"pressure":1020.84,"sea_level":1023.61,"grnd_level":1020.84,"humidity":60,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"clouds":{"all":20},"wind":{"speed":9.86,"deg":181.505},"rain":{},"sys":{"pod":"n"},"dt_txt":"2017-04-04 03:00:00"},{"dt":1491285600,"main":{"temp":76.13,"temp_min":76.13,"temp_max":76.13,"pressure":1020.84,"sea_level":1023.56,"grnd_level":1020.84,"humidity":61,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"clouds":{"all":36},"wind":{"speed":11.77,"deg":190.001},"rain":{},"sys":{"pod":"n"},"dt_txt":"2017-04-04 06:00:00"},{"dt":1491296400,"main":{"temp":74.3,"temp_min":74.3,"temp_max":74.3,"pressure":1019.48,"sea_level":1022.2,"grnd_level":1019.48,"humidity":70,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"clouds":{"all":20},"wind":{"speed":15.79,"deg":185.501},"rain":{},"sys":{"pod":"n"},"dt_txt":"2017-04-04 09:00:00"},{"dt":1491307200,"main":{"temp":72.83,"temp_min":72.83,"temp_max":72.83,"pressure":1019.98,"sea_level":1022.98,"grnd_level":1019.98,"humidity":81,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":80},"wind":{"speed":16.69,"deg":199.501},"rain":{"3h":0.785},"sys":{"pod":"d"},"dt_txt":"2017-04-04 12:00:00"},{"dt":1491318000,"main":{"temp":71.15,"temp_min":71.15,"temp_max":71.15,"pressure":1021.47,"sea_level":1024.23,"grnd_level":1021.47,"humidity":94,"temp_kf":0},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"clouds":{"all":32},"wind":{"speed":10.45,"deg":226.002},"rain":{"3h":7.15},"sys":{"pod":"d"},"dt_txt":"2017-04-04 15:00:00"},{"dt":1491328800,"main":{"temp":76.81,"temp_min":76.81,"temp_max":76.81,"pressure":1020.73,"sea_level":1023.53,"grnd_level":1020.73,"humidity":82,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":48},"wind":{"speed":12.01,"deg":242.001},"rain":{"3h":0.039999999999999},"sys":{"pod":"d"},"dt_txt":"2017-04-04 18:00:00"},{"dt":1491339600,"main":{"temp":79.79,"temp_min":79.79,"temp_max":79.79,"pressure":1019.43,"sea_level":1022.34,"grnd_level":1019.43,"humidity":66,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":12.35,"deg":253.006},"rain":{},"sys":{"pod":"d"},"dt_txt":"2017-04-04 21:00:00"},{"dt":1491350400,"main":{"temp":73.62,"temp_min":73.62,"temp_max":73.62,"pressure":1020.56,"sea_level":1023.39,"grnd_level":1020.56,"humidity":60,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":9.35,"deg":252.505},"rain":{},"sys":{"pod":"n"},"dt_txt":"2017-04-05 00:00:00"},{"dt":1491361200,"main":{"temp":67,"temp_min":67,"temp_max":67,"pressure":1022.73,"sea_level":1025.55,"grnd_level":1022.73,"humidity":80,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":7.87,"deg":256.504},"rain":{},"sys":{"pod":"n"},"dt_txt":"2017-04-05 03:00:00"},{"dt":1491372000,"main":{"temp":63.31,"temp_min":63.31,"temp_max":63.31,"pressure":1023.36,"sea_level":1026.23,"grnd_level":1023.36,"humidity":95,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"clouds":{"all":20},"wind":{"speed":6.62,"deg":258.002},"rain":{},"sys":{"pod":"n"},"dt_txt":"2017-04-05 06:00:00"},{"dt":1491382800,"main":{"temp":61.98,"temp_min":61.98,"temp_max":61.98,"pressure":1023.54,"sea_level":1026.44,"grnd_level":1023.54,"humidity":97,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"clouds":{"all":24},"wind":{"speed":4.63,"deg":260.503},"rain":{},"sys":{"pod":"n"},"dt_txt":"2017-04-05 09:00:00"},{"dt":1491393600,"main":{"temp":60.57,"temp_min":60.57,"temp_max":60.57,"pressure":1024.58,"sea_level":1027.53,"grnd_level":1024.58,"humidity":93,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"clouds":{"all":32},"wind":{"speed":2.62,"deg":261.001},"rain":{},"sys":{"pod":"d"},"dt_txt":"2017-04-05 12:00:00"},{"dt":1491404400,"main":{"temp":74.96,"temp_min":74.96,"temp_max":74.96,"pressure":1025.93,"sea_level":1028.76,"grnd_level":1025.93,"humidity":72,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"clouds":{"all":20},"wind":{"speed":3.96,"deg":271.001},"rain":{},"sys":{"pod":"d"},"dt_txt":"2017-04-05 15:00:00"},{"dt":1491415200,"main":{"temp":80,"temp_min":80,"temp_max":80,"pressure":1025.54,"sea_level":1028.35,"grnd_level":1025.54,"humidity":58,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"clouds":{"all":36},"wind":{"speed":4,"deg":246.003},"rain":{},"sys":{"pod":"d"},"dt_txt":"2017-04-05 18:00:00"}],"city":{"id":4167147,"name":"Orlando","coord":{"lat":28.5383,"lon":-81.3793},"country":"US"}};


(function(d) {

  var temperatures = [],
      dates = [],
      margin = { top: 0, right: 0, bottom: 30, left: 20 }
      height = 400 - margin.top - margin.bottom,
      width = 600 - margin.left - margin.right;

  var   tempColor,
        yScale,
        yAxisValues,
        yAxisTicks,
        yGuide,
        xScale,
        xAxisValues,
        xAxisTicks,
        xGuide,
        colors,
        tooltip,
        myChart;

  for (var i = 0; i<d.list.length; i++) {
    temperatures.push(d.list[i].main.temp);
    dates.push( new Date(d.list[i].dt_txt) );
  }

  yScale = d3.scaleLinear()
    .domain([0, d3.max(temperatures)])
    .range([0,height]);

  yAxisValues = d3.scaleLinear()
    .domain([0, d3.max(temperatures)])
    .range([height,0]);

  yAxisTicks = d3.axisLeft(yAxisValues)
  .ticks(10)

  xScale = d3.scaleBand()
    .domain(temperatures)
    .paddingInner(.1)
    .paddingOuter(.1)
    .range([0, width])

  xAxisValues = d3.scaleTime()
    .domain([dates[0],dates[(dates.length-1)]])
    .range([0, width])

  xAxisTicks = d3.axisBottom(xAxisValues)
    .ticks(d3.timeDay.every(1))

  colors = d3.scaleLinear()
    .domain([0, 65, d3.max(temperatures)])
    .range(['#FFFFFF', '#2D8BCF', '#DA3637'])

  tooltip = d3.select('body')
    .append('div')
    .style('position', 'absolute')
    .style('padding', '0 10px')
    .style('background', 'white')
    .style('opacity', 0)
    .style('pointer-events', 'none');

  myChart = d3.select('#viz').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.right + ')')
    .selectAll('rect').data(temperatures)
    .enter().append('rect')
      .attr('fill', colors)
      .attr('width', function(d) {
        return xScale.bandwidth();
      })
      .attr('height', 0)
      .attr('x', function(d) {
        return xScale(d);
      })
      .attr('y', height)
      
      .on('mouseover', function(d) {
        tooltip.transition().duration(200)
          .style('opacity', .9)
        tooltip.html(
          '<div style="font-size: 2rem; font-weight: bold">' +
            d + '&deg;</div>'
        )
          .style('left', (d3.event.pageX -35) + 'px')
          .style('top', (d3.event.pageY -30) + 'px')
        tempColor = this.style.fill;
        d3.select(this)
          .style('fill', 'yellow')
      })

      .on('mouseout', function(d) {
        tooltip.html('')
        d3.select(this)
          .style('fill', tempColor)
      });

  yGuide = d3.select('#viz svg').append('g')
            .attr('transform', 'translate(20,0)')
            .call(yAxisTicks)

  xGuide = d3.select('#viz svg').append('g')
            .attr('transform', 'translate(20,'+ height + ')')
            .call(xAxisTicks)

  myChart.transition()
    .attr('height', function(d) {
      return yScale(d);
    })
    .attr('y', function(d) {
      return height - yScale(d);
    })
    .delay(function(d, i) {
      return i * 20;
    })
    .duration(1000)
    .ease(d3.easeBounceOut)

})(forecast);
