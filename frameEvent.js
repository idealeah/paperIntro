//code from Justin Bakse's Comp Form class
var bounds = new Rectangle(new Point(0, 0), new Point(200, 200));
var rectangle = new Path.Rectangle(bounds);
rectangle.fillColor = '#333';
rectangle.fillColor = '#333';

var circle1 = new Path.Circle([100, 100], 10);
circle1.fillColor = 'red';
var deltaPosition = new Point(5, 0);

function onFrame() {
    circle1.position += deltaPosition;
    if (circle1.position.x > 190) {
        deltaPosition.x = -Math.abs(deltaPosition.x);
        circle1.fillColor = 'green';
    }
    if (circle1.position.x < 10) {
        deltaPosition.x = Math.abs(deltaPosition.x);
        circle1.fillColor = 'blue';
    }
}