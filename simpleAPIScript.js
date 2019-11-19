var bounds = new Rectangle(new Point(0, 0), new Point(800, 800));
var bgRect = new Path.Rectangle(bounds);
bgRect.fillColor = "#dbfcff";

var startPoint = new Point(400, 400);
var dot;
var windVec = new Point(0, 0);

//get weather API JSON
fetch('http://api.openweathermap.org/data/2.5/find?q=London&units=imperial&APPID=1b067cf07d577b3a8c9b080d1b786ffb')
    .then( //after the JSON request returns a response
        function (response) {
            //log an error if the response indicated an error
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            // Examine the text in the response
            response.json().then(parseJSON);
        }
    )
    //indicate a fetch error
    .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });

//parse JSON
function parseJSON(data) {
    var speed = data.list[0].wind.speed;
    var deg = data.list[0].wind.deg;
    windVec.length = speed;
    windVec.angle = deg;
    console.log(windVec);

    makeDot();
}

function onFrame() {
    if (typeof dot != "undefined") {
        dot.position += windVec;

        if (dot.position.x <= 0) {
            dot.position.x = 790;
        }
        if (dot.position.x >= 800) {
            dot.position.x = 10;
        }
        if (dot.position.y <= 0) {
            dot.position.y = 790;
        }
        if (dot.position.y >= 800) {
            dot.position.y = 10;
        }
    }
}

function makeDot() {
    // Create a Paper.js Path to draw a line into it:
    dot = new Path.Circle(startPoint, 30);
    dot.style = {
        fillColor: "white",
        strokeColor: 'black',
        strokeWidth: 5
    };
    console.log(dot);
}