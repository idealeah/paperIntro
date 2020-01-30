//demo using a simplex noise library, documentation here: https://www.npmjs.com/package/simplex-noise
//Remember to link the library in index.html

var numLines = 17;
//initialize our simplex noise
var simplex = new SimplexNoise();

//create our line parameters
var numPoints = 500 / 15; //the number of points
var stepSize = 500 / numPoints; //distance between points
var lineGroup = new Group();

var centerPoints = 5;
var centerPath = new Path({
  strokeColor: "black",
  strokeWidth: 20
});

// for (i = 0; i < centerPoints; i++) {
//   point = new Point(400, i * 800 / centerPoints);
//   centerPath.add(point);
// }

for (i = 0; i < numLines; i++) {
  console.log(i);
  // Create a Paper.js Path:
  var path = new Path({
    strokeColor: "red",
    strokeWidth: 4
  });

  //add points to our line:
  for (n = 0; n < numPoints; n++) {
    //add our points to the path
    path.add(new Point(n * stepSize + 20, i * stepSize));
  }

  lineGroup.addChild(path);
}

function onFrame(event) {
  // for (i = 0; i < centerPoints; i++) {
  //   //get milliseconds
  //   var millis = event.time;
  //   var x = simplex.noise2D(i * 5, millis / 20);
  //   x = (x * 30) + 250;
  //   centerPath.segments[i].point.x = x;
  //   centerPath.smooth();
  // }

  for (n = 0; n < numLines; n++) {
    for (var i = 0; i < numPoints; i++) {
      //get milliseconds
      var millis = event.time;
      //get 2D noise information
      var y = simplex.noise3D(i / 15, millis / 20, n / 15);
      //calibrate the y value so it fits the canvas
      y = (y + n * 0.7) * 50;
      lineGroup.children[n].segments[i].point.y = y + 45;
    }

    //smooth the path
    lineGroup.children[n].smooth();
  }
}

function downloadAsSVG(fileName) {
  // use default name if not provided
  fileName = fileName || "output.svg";

  // create a data url of the file
  var svgData = project.exportSVG({
    asString: true
  });
  var url = "data:image/svg+xml;utf8," + encodeURIComponent(svgData);

  // create a link to the data, and "click" it
  var link = document.createElement("a");
  link.download = fileName;
  link.href = url;
  link.click();
}

function onMouseDown() {
  //calling the function: use a string for the file name
  downloadAsSVG("cutFile.svg");
}
