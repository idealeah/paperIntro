var myGroup = new Group();
var myNewGroup = new Group();
var colors = ['black', 'blue'];

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
    if (myGroup.children.length >= 1) {
        var newShape = myGroup.lastChild.subtract(myBlob, {
            insert: false
        });
        myNewGroup.addChild(newShape);
    }
    console.log(myGroup);
    myGroup.addChild(myBlob);
}

for (i = 0; i < numShapes; i += 2) {
    myNewGroup.children[i].remove();
}

myNewGroup.setPosition(400, 400);


// for (i = myGroup.children.length - 1; i > 1; i--) {
//     var shapeA = myGroup.children[i];
//     console.log(i);
//     for (n = i - 1; n > 0; n--) {
//         console.log(n);
//         var shapeB = myGroup.children[n];
//         var shapeC = shapeB.subtract(shapeA);
//         myNewGroup.addChild(shapeC);
//         shapeC.fillColor = new Color(.2 * n, 0, 0);
//     }
// }

console.log(myGroup);
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