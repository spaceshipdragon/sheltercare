// Generated by CoffeeScript 1.11.1
(function() {
  var firebaseRef, svg, svgH, svgW, updateMFChart;

  firebaseRef = firebase.database().ref('/items');

  firebaseRef.orderByChild('gender').once('value').then(function(snapshot) {
    var mf_numbers;
    mf_numbers = [
      {
        'gender': 'male',
        'value': 0
      }, {
        'gender': 'female',
        'value': 0
      }
    ];
    snapshot.forEach(function(child) {
      console.log(child.val());
      if (child.val()['gender'] === 'Male') {
        mf_numbers[0]['value'] += 1;
        return console.log(child.val());
      } else if (child.val()['gender'] === 'Female') {
        mf_numbers[1]['value'] += 1;
        return console.log(child.val());
      }
    });
    return updateMFChart(mf_numbers);
  });

  svgW = 300;

  svgH = 200;

  updateMFChart = function(dataSet) {
    var barchart, scale;
    console.log('##updatechart');
    console.log(dataSet);
    scale = d3.scale.linear().domain([
      0, d3.max(dataSet, function(d) {
        console.log(d.value);
        return d.value;
      })
    ]).range([0, svgH]);
    return barchart = svg.selectAll('rect').data(dataSet).enter().append('rect').attr({
      x: 0,
      y: function(d, i) {
        return i * 30;
      },
      width: function(d) {
        console.log(d.value);
        return scale(d.value);
      },
      height: 20,
      fill: "blue"
    });
  };

  svg = d3.select("body").append("svg").attr("width", svgW).attr("height", svgH);

}).call(this);
