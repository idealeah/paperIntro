//demo using a simplex noise library, documentation here: https://www.npmjs.com/package/simplex-noise
//Remember to link the library in index.html

//initialize our simplex noise
var simplex = new SimplexNoise();

//create our line parameters
var numPoints = 800 / 20; //the number of points
var stepSize = 800 / numPoints; //distance between points

// Create a Paper.js Path:
var path = new Path({
    strokeColor: 'red',
    opacity: 0.5,
    strokeWidth: 5
});

//add points to our line:
for (i = 0; i < numPoints; i++) {
    //add our points to the path
    path.add(new Point(i * stepSize, 400));
}

function onFrame(event) {
    for (var i = 0; i < numPoints; i++) {
        //get milliseconds
        var millis = event.time;
        //get 2D noise information
        var y = simplex.noise2D(i / 8, millis / 8);
        //calibrate the y value so it fits the canvas
        y = (y + 5) * 60;
        //move the y value of each point
        path.segments[i].point.y = y;
    }

    //smooth the path
    path.smooth();
}