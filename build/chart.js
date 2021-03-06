// Generated by CoffeeScript 1.11.1
(function() {
  var firebaseRef, svg, svgH, svgH2, svgW, svgW2, svgl, svgr, updateMFChart, updatePyramid, xMargin, xMargin2, yMargin;

  firebaseRef = firebase.database().ref('/items');

  firebaseRef.orderByChild('gender').once('value').then(function(snapshot) {
    var i, j, maxval, mf_numbers, pyramid_f, pyramid_m, ref;
    mf_numbers = [
      {
        'gender': 'male',
        'value': 0
      }, {
        'gender': 'female',
        'value': 0
      }
    ];
    pyramid_m = [];
    pyramid_f = [];
    for (i = j = ref = 100 - 1; j >= 0; i = j += -1) {
      pyramid_m.push({
        'age': i + 1,
        value: 0
      });
      pyramid_f.push({
        'age': i + 1,
        value: 0
      });
    }
    snapshot.forEach(function(child) {
      var index, item, k, l, len, len1;
      if (child.val()['gender'] === 'Male') {
        mf_numbers[0]['value'] += 1;
        for (index = k = 0, len = pyramid_m.length; k < len; index = ++k) {
          item = pyramid_m[index];
          if (item['age'] === child.val()['age']) {
            pyramid_m[index]['value'] += 1;
          }
        }
        return console.log(child.val());
      } else if (child.val()['gender'] === 'Female') {
        mf_numbers[1]['value'] += 1;
        for (index = l = 0, len1 = pyramid_f.length; l < len1; index = ++l) {
          item = pyramid_f[index];
          if (item['age'] === child.val()['age']) {
            pyramid_f[index]['value'] += 1;
          }
        }
        return console.log(child.val());
      }
    });
    updateMFChart(mf_numbers);
    maxval = d3.max(pyramid_f.concat(pyramid_m), function(d) {
      return d.value;
    });
    updatePyramid(pyramid_f, maxval, 'female');
    return updatePyramid(pyramid_m, maxval, 'male');
  });

  svgW = 600;

  svgH = 200;

  svgW2 = 300;

  svgH2 = 500;

  yMargin = 50;

  xMargin = 60;

  xMargin2 = 80;

  updatePyramid = function(dataSet, maxval, type) {
    var axscale, barchart, fill, i, j, marginLeft, ref, results, scale, svg, xAxis, xAxisCall, xfunc;
    svg = svgr;
    fill = 'red';
    marginLeft = xMargin2;
    xfunc = marginLeft;
    axscale = d3.scale.linear().domain([0, maxval]).range([0, svgW2]);
    if (type === 'male') {
      fill = 'blue';
      svg = svgl;
      xfunc = function(d) {
        return svgW2 - scale(d.value);
      };
      axscale = d3.scale.linear().domain([0, maxval]).range([svgW2, 0]);
      marginLeft = 0;
    }
    scale = d3.scale.linear().domain([0, maxval]).range([0, svgW2]);
    barchart = svg.selectAll('rect').data(dataSet).enter().append('rect').attr({
      x: xfunc,
      y: function(d, i) {
        return i * 4 + yMargin;
      },
      width: function(d) {
        return scale(d.value);
      },
      height: 2,
      fill: fill
    });
    xAxisCall = d3.svg.axis().scale(axscale).orient('bottom');
    xAxis = svg.append('g').attr({
      "class": "axis",
      "transform": "translate(" + [marginLeft, 0] + ")"
    }).call(xAxisCall);
    if (type === 'female') {
      results = [];
      for (i = j = ref = 11 - 1; j >= 0; i = j += -1) {
        results.push(svg.append("text").attr("x", 40).attr("width", 100).attr("y", (400 + yMargin) - (i * 41)).style("text-anchor", "middle").text(i * 10));
      }
      return results;
    }
  };

  updateMFChart = function(dataSet) {
    var barchart, scale, xAxis, xAxisCall;
    console.log('##updatechart');
    scale = d3.scale.linear().domain([
      0, d3.max(dataSet, function(d) {
        return d.value;
      })
    ]).range([0, svgW - xMargin]);
    barchart = svg.selectAll('rect').data(dataSet).enter().append('rect').attr({
      x: xMargin,
      y: function(d, i) {
        return i * 30 + yMargin;
      },
      width: function(d) {
        return scale(d.value);
      },
      height: 20,
      fill: function(d) {
        if (d.gender === 'female') {
          return "red";
        } else {
          return "blue";
        }
      }
    });
    xAxisCall = d3.svg.axis().scale(scale).orient('bottom');
    xAxis = svg.append('g').attr({
      "class": "axis",
      "transform": "translate(" + [xMargin, 0] + ")"
    }).call(xAxisCall);
    svg.append("text").attr("x", 10).attr("y", 65).text("男性");
    return svg.append("text").attr("x", 10).attr("y", 95).text("女性");
  };

  svg = d3.select("#mfChartContainer").append("svg").attr("width", svgW).attr("height", svgH);

  d3.select("#graphContainer").append("div");

  svgl = d3.select("#pyramidChartContainer").append("svg").attr("width", svgW2).attr("height", svgH2).style('margin-left', 20);

  svgr = d3.select("#pyramidChartContainer").append("svg").attr("width", svgW2 + xMargin2).attr("height", svgH2);

}).call(this);
