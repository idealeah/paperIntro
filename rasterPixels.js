// Create a raster item using the image tag with id='mona'
var raster = new Raster("myImage");

//initialize a variable where we'll put our code
var scadCode = "";

// Hide the raster:
raster.visible = false;

// The size of our grid cells:
var gridSize = 8;

// Space the cells by 120%:
var spacing = 1.2;

//max cube height
var maxHeight = 40;

// As the web is asynchronous, we need to wait for the raster to load
// before we can perform any operation on its pixels.
raster.on("load", function() {
  // Since the example image we're using is much too large,
  // and therefore has way too many pixels, lets downsize it to
  // 40 pixels wide and 30 pixels high:
  raster.size = new Size(20, 20);

  for (var y = 0; y < raster.height; y++) {
    for (var x = 0; x < raster.width; x++) {
      // Get the color of the pixel:
      var color = raster.getPixel(x, y);
      // Create a circle shaped path:
      var path = new Path.Rectangle({
        point: new Point(x, y) * gridSize,
        size: gridSize
      });

      // Set the fill color of the path to the color
      // of the pixel:
      path.fillColor = color.gray;

      //map the grayscale values to the cube height
      var cubeHeight = map_range(color.gray, 0, 1, 0, maxHeight);

      //generate our scad code and add it to the string
      scadCode +=
        "color([" + color.gray + "," + color.gray + "," + color.gray + "]){";
      scadCode +=
        "translate([" + x * gridSize + "," + y * gridSize + "," + 0 + "]){";
      scadCode += "\n";
      scadCode +=
        "cube(size = [" +
        gridSize / spacing +
        "," +
        gridSize / spacing +
        "," +
        cubeHeight +
        "]);";
      scadCode += "\n";
      scadCode += "}";
      scadCode += "\n";
      scadCode += "}";
      scadCode += "\n";
    }
  }
});

function onMouseDown() {
  //calling the function: use a string for the file name
  downloadSCAD("imageBlocks.scad");
  //print the openSCAD code
  console.log(scadCode);
}

//a function to download the .svg file
function downloadSCAD(fileName) {
  // use default name if not provided
  fileName = fileName || "output.scad";

  // create a data url of the file
  var svgData = project.exportSVG({
    asString: true
  });
  var url = "data:text/plain;charset=utf-8," + encodeURIComponent(scadCode);

  // create a link to the data, and "click" it
  var link = document.createElement("a");
  link.download = fileName;
  link.href = url;
  link.click();
}

//a mapping function, just like p5.js
function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}
