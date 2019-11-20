//instantiate a group
var myGroup = new Group();

//here's our for loop
for (i = 0; i < 10; i++) {

    //make some points
    var from = new Point(40 + i * 70, 50);
    var to = new Point(100 + i * 70, 200);

    //make a path going between the "from" and "to" points
    var myPath = new Path.Line(from, to);
    //add some style
    myPath.style = {
        strokeColor: "black",
        fillColor: new Color(i * .3, 1, .6), //let's use i to change the color for each shape
        strokeWidth: 10
    }

    //let's add a point to the path
    var nextPoint = new Point(140 + i * 30, 150);
    myPath.add(nextPoint);

    //let's close and smooth the path
    myPath.closed = true;
    myPath.smooth();

    //add the path to our group so that we can access it outside the for loop
    myGroup.addChild(myPath);
}

//print out the group object so we can see it
console.log(myGroup);


//let's make some copies of myGroup and change them

//instantiate a group to hold myGroup and the copies we'll make in the for loop
var allGroups = new Group(myGroup);

//another for loop
for (i = 0; i < 3; i++) {
    //clone a group
    var groupCopy = myGroup.clone();

    //make a point based on myGroup's current position
    var groupPos = new Point(myGroup.position);
    groupPos.y += i * 100 + 100; //change the y position

    //change the group position
    groupCopy.setPosition(groupPos);

    //change the styling of paths within our groups
    for (n = 0; n < groupCopy.children.length; n++) {
        //set a name for the path we're referencing instead of typing out "groupCopy.children[n]" every time
        var path = groupCopy.children[n];

        //change the fill color using n (which path) and i (which group) 
        path.fillColor = new Color(n * .3, i * .3, .6);
    }

    //add the new group to allGroups
    allGroups.addChild(groupCopy);
}

//print out the group object so we can see it
console.log(allGroups);