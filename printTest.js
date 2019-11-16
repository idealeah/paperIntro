var grid = 5;
var space = 800 / grid;

for (x = 0; x < 5; x++) {
  for (y = 0; y < 5; y++) {
    var gridX = x * space;
    var gridY = y * space;
    var radius = space / 2;
    var point = new Point(gridX + radius, gridY + radius);
    var rotation = 0;
    if (x % 2 == 0 && y % 2 != 0) {
      rotation = 90;
    }
    if (x % 2 != 0 && y % 2 == 0) {
      rotation = 90;
    }
    makeSpike(point, radius, rotation);
  }
}

function makeSpike(center, radius, rotation) {
  var spikeRad = radius;
  for (i = 0; i < 5; i++) {
    // Create a Paper.js Path:
    var path = new Path({
      strokeColor: "red",
      opacity: 0.5,
      strokeWidth: 15,
      center: center,
      strokeCap: "round"
    });

    path.add(
      new Point(center.x - spikeRad, center.y),
      new Point(center.x + spikeRad, center.y)
    );

    var turn = 360 / 5;
    path.rotate(turn * i + rotation);
  }
}

downloadAsSVG("spikes");

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