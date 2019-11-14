// Create a Paper.js Path to draw a line into it:
var path = new Path();
// Give the stroke a color
path.strokeColor = 'red';
var start = new Point(100, 100);
// Move to start and draw a line from there
path.moveTo(start);
// Note the plus operator on Point objects.
// PaperScript does that for us, and much more!
path.lineTo(start + [100, -50]);

var starPath = new Path.Star({
    center: [50, 50],
    points: 12,
    radius1: 25,
    radius2: 40,
    fillColor: 'blue'
});