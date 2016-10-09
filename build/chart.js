// Generated by CoffeeScript 1.11.1
(function() {
  var circleAttributes, circleRadii, circles, firebaseRef, p, svgContainer, theData;

  firebaseRef = firebase.database().ref('/items');

  firebaseRef.orderByChild('gender').equalTo('Male').once('value').then(function(snapshot) {
    return console.log(snapshot.numChildren());
  });

  theData = [1, 2, 3];

  p = d3.select("body").selectAll("p.data").data(theData).enter().append("p").text(function(d) {
    return d;
  });

  circleRadii = [40, 20, 10];

  svgContainer = d3.select("body").append("svg").attr("width", 200).attr("height", 200).style("border", "1px solid black");

  circles = svgContainer.selectAll("circle").data(circleRadii).enter().append("circle");

  circleAttributes = circles.attr("cx", 50).attr("cy", 50).attr("r", function(d) {
    return d;
  }).style("fill", function(d) {
    returnColor;
    var returnColor;
    if (d === 40) {
      returnColor = "green";
    } else if (d === 20) {
      returnColor = "purple";
    } else if (d === 10) {
      returnColor = "red";
    }
    return returnColor;
  });

}).call(this);
