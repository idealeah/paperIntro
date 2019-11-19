//edited from the image demo on the paper.js site

var path, position, max;
var count = 0;
var grow = false;

// As the web is asynchronous, we need to wait for the raster to
// load before we can perform any operation on its pixels.
var raster = new Raster('assets/skyline.jpg');
raster.visible = false;
raster.on('load', resetSpiral);

function onFrame(event) {
    if (grow) {
        if (raster.loaded && (view.center - position).length < max) {
            for (var i = 0, l = count / 36 + 1; i < l; i++) {
                growSpiral();
            }
            path.smooth();
        } else {
            grow = false;
        }
    }
}

function growSpiral() {
    count++;
    var vector = new Point({
        angle: count * 5,
        length: count / 100
    });
    var rot = vector.rotate(90);
    var color = raster.getAverageColor(position + vector / 2);
    var value;
    if (color) {
        value = (1 - color.gray) * 3.7;
    } else if (!color) {
        value = 0;
    }
    //Below is the original code, called a ternary operator. 
    //It does the same thing as the if statement above.
    //var value = color ? (1 - color.gray) * 3.7 : 0;
    rot.length = Math.max(value, 0.2);
    path.add(position + vector - rot);
    path.insert(0, position + vector + rot);
    position += vector;
}

function resetSpiral() {
    grow = true;

    // Transform the raster, so it fills the view:
    raster.fitBounds(view.bounds);

    if (path)
        path.remove();

    position = view.center;
    count = 0;
    path = new Path({
        fillColor: 'black',
        closed: true
    });

    position = view.center;
    max = Math.min(raster.bounds.width, raster.bounds.height) * 0.5;
}