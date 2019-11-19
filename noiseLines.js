//demo using a simplex noise library, documentation here: https://www.npmjs.com/package/simplex-noise
//Remember to link the library in index.html

var numLines = 200;
//initialize our simplex noise
var simplex = new SimplexNoise();

//create our line parameters
var numPoints = 800 / 15; //the number of points
var stepSize = 800 / numPoints; //distance between points
var lineGroup = new Group();

for (i = 0; i < numLines; i++) {
    console.log(i);
    // Create a Paper.js Path:
    var path = new Path({
        strokeColor: 'red',
        strokeWidth: 1
    });

    //add points to our line:
    for (n = 0; n < numPoints; n++) {
        //add our points to the path
        path.add(new Point(n * stepSize, i * stepSize));
    }

    lineGroup.addChild(path);
}

console.log(lineGroup.children[0].segments);

function onFrame(event) {
    for (n = 0; n < numLines; n++) {
        for (var i = 0; i < numPoints; i++) {
            //get milliseconds
            var millis = event.time;
            //get 2D noise information
            var y = simplex.noise3D(i / 15, millis / 20, n / 45);
            //calibrate the y value so it fits the canvas
            y = (y + (n * .05)) * 50;
            lineGroup.children[n].segments[i].point.y = y;
        }

        //smooth the path
        lineGroup.children[n].smooth();

    }
    //downloadAsSVG("lines");

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