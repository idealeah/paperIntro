// Create a Paper.js Path to draw a line into it:
var myPath = new Path();
// Give the stroke a color
myPath.strokeColor = 'black';
var start = new Point(100, 100);
// Move to start and draw a line from there
myPath.moveTo(start);
// Note the plus operator on Point objects.
// PaperScript does that for us, and much more!
myPath.lineTo(start + [100, -50]);

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
