var myGroup = new Group();
var from = new Point(20, 20);
var to = new Point(80, 80);
var nextPoint = new Point(100, 60);

for (i = 0; i < 10; i++) {
    var from = new Point(20 + i * 10, 20);
    var to = new Point(80 + i * 10, 80);
    var nextPoint = new Point(100 + i * 10, 60);
    var myPath = new Path.Line(from, to);

    myPath.style = {
        strokeColor: "black",
        fillColor: "red",
        strokeWidth: 10
    }

    myPath.add(nextPoint);
    myPath.closed = true;
    myPath.smooth();
    myGroup.addChild(myPath);
}
console.log(myGroup);