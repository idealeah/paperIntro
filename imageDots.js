// Create a raster item using the image tag with id='mona'
var raster = new Raster("myImage");

// Hide the raster:
raster.visible = false;

// The size of our grid cells:
var gridSize = 20;

// Space the cells by 120%:
var spacing = 0.7;

// As the web is asynchronous, we need to wait for the raster to load
// before we can perform any operation on its pixels.
raster.on("load", function () {
    // Since the example image we're using is much too large,
    // and therefore has way too many pixels, lets downsize it to
    // 40 pixels wide and 30 pixels high:
    raster.size = new Size(50, 40);

    for (var y = 0; y < raster.height; y++) {
        for (var x = 0; x < raster.width; x++) {
            // Get the color of the pixel:
            var color = raster.getPixel(x, y);

            // Create a circle shaped path:
            var path = new Path.Circle({
                center: new Point(x, y) * gridSize,
                radius: gridSize / 1.5 / spacing,
                fillColor: "black"
            });

            // Scale the path by the amount of gray in the pixel color:
            path.scale(1 - color.gray);
        }
    }

    // Move the active layer to the center of the view, so all
    // the created paths in it appear centered.
    project.activeLayer.position = view.center;
});

function onMouseDown() {
    //calling the function: use a string for the file name
    downloadAsSVG("cutFile");
}

//a function to download the .svg file
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