var simplex = new SimplexNoise();

var path = new Path(new Point(0, 400), new Point(10, 400));
path.style = {
    strokeColor: 'red',
    opacity: 1,
    fillColor: "red",
}

function onFrame(event) {
    //get milliseconds
    var millis = event.time;
    //get 2D noise information
    var noise = simplex.noise2D(millis / 20, event.count / 10);
    noise = (noise + 1) * 10;

    var point = new Point(path.lastSegment.point.x + 10, 400);
    path.add(new Point(point.x, point.y + noise));
    subtractPoint = new Point(point.x, point.y - noise);
    path.insert(0, subtractPoint);
}