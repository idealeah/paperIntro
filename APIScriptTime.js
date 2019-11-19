var bounds = new Rectangle(new Point(0, 0), new Point(1600, 800));
var bgRect = new Path.Rectangle(bounds);
bgRect.fillColor = "#dbfcff";

var dotGroup = new Group();
var speed, gust;
var lines = 10;
for (i = 0; i < lines; i++) {
  var dot1 = new Path.Circle(new Point(10, (i * 800) / lines), 10);
  dot1.style = {
    strokeColor: "black",
    fillColor: "black"
  };
  dotGroup.addChild(dot1);
}
var gustGroup;
var space;
// var windLine = new Path(new Point(20, 400), new Point(50, 400));
// windLine.style = {
//   strokeColor: "black",
//   fillColor: "black"
// };

getAPI();

function getAPI() {
  //get weather API JSON
  fetch(
    "http://api.openweathermap.org/data/2.5/weather?zip=91310,us&units=imperial&APPID=1b067cf07d577b3a8c9b080d1b786ffb"
  )
    .then(
      //after the JSON request returns a response
      function(response) {
        //log an error if the response indicated an error
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }

        // Examine the text in the response
        response.json().then(parseJSON);
        setTimeout(getAPI, 600000);
      }
    )
    //indicate a fetch error
    .catch(function(err) {
      console.log("Fetch Error :-S", err);
    });
}

//parse JSON
function parseJSON(data) {
  console.log(data);
  speed = data.wind.speed;

  speed = speed * 5;
  space = speed + 5;
  console.log(speed);

  addSegment();
}

function addSegment() {
  // add to the line
  // var point = new Point(windLine.lastSegment.point.x + space, 400);

  var pointOld = new Point(dotGroup.lastChild.position.x, (i * 800) / lines);
  for (i = 0; i < lines; i++) {
    var point = new Point(pointOld.x, (i * 800) / lines);
    point.x += space;
    var dot = new Path.Circle(point, speed / 2);
    dot.style = {
      strokeColor: "black",
      fillColor: "black"
    };
    dotGroup.addChild(dot);
    console.log(dotGroup);
  }

  // windLine.add(new Point(point.x, point.y + speed));
  // windLine.insert(0, new Point(point.x, point.y - speed));
  // windLine.smooth();
}

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
