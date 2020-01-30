var myGroup = new Group();
var myNewGroup = new Group();
var colors = ['black', 'white'];

var numShapes = 30;

for (i = 0; i < numShapes; i++) {
    var rect = new Rectangle([0, 0], [50, 90]);
    var myBlob = new Path.Ellipse(rect);
    myBlob.fillColor = colors[i % 2];
    var scale = (1 - i / numShapes) * 7;
    //console.log(scale);
    myBlob.scale(scale);
    myBlob.rotate(i * 7);
    myBlob.position += new Point(10 * i, 5 * i);

    myGroup.addChild(myBlob);
}

myGroup.setPosition(400, 400);

for (i = 0; i < myGroup.children.length - 1; i += 2) {
    var shapeA = myGroup.children[i];
    var shapeB = myGroup.children[i + 1];

    var shapeC = shapeA.subtract(shapeB);
    myNewGroup.addChild(shapeC);
    shapeC.fillColor = "blue";
}

myGroup.remove();

function onMouseDown() {
    //calling the function: use a string for the file name
    //downloadAsSVG("cutFile");
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