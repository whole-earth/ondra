function isMobile() {
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}

// Check if the user is on a touchscreen
if (isMobile()) {
  // If the user is on a touchscreen, do nothing (optional)
  console.log("Cursor animation disabled on touchscreen.");
} else {
  // User settings
  var trailLength = 100;
  var segmentSize = 10;
  var colorSpeed = 1;
  var innerColorSpeed = 4;

  // Global variables
  var trail = [];
  var h = 0;
  var drawingEnabled = true; // Flag to control drawing
  var clearTrail = true;

  function setup() {
    // createCanvas(1440, 900);
    var canvas = createCanvas(windowWidth, document.body.offsetHeight);
    canvas.parent('cursor-anim');
    colorMode(HSB);
    noFill();
    strokeWeight(4); // Adjust the thickness of the line

  }

  function doubleClicked() {
    toggleDrawing();
    console.log("Cursor animation = " + drawingEnabled);
  }

  function draw() {
    background(255);
    // Check if drawing is enabled
    if (drawingEnabled) {
      trail.push({
        'x': mouseX,
        'y': mouseY
      });

      var thisColor = h;
      for (var i = 1; i < trail.length - 2; i++) {
        var seg0 = trail[i - 1];
        var seg1 = trail[i];
        var seg2 = trail[i + 1];
        var seg3 = trail[i + 2];
        stroke(thisColor, 100, 100);
        drawCatmullRom(seg0, seg1, seg2, seg3);
        thisColor = (thisColor + innerColorSpeed) % 360;
      }

      if (trail.length > trailLength) {
        trail.splice(0, max(trail.length - trailLength, 0));
      }

      h = (h + colorSpeed) % 360;
    }

    function drawCatmullRom(p0, p1, p2, p3) {
      var amount = 0.1; // Adjust this value for the smoothness
      for (var t = 0; t < 1; t += amount) {
        var x = 0.5 * ((2 * p1.x) +
          (-p0.x + p2.x) * t +
          (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t * t +
          (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t * t * t);
        var y = 0.5 * ((2 * p1.y) +
          (-p0.y + p2.y) * t +
          (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t * t +
          (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t * t * t);
        var px = 0.5 * ((2 * p1.x) +
          (-p0.x + p2.x) * (t + amount) +
          (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * (t + amount) * (t + amount) +
          (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * (t + amount) * (t + amount) * (t + amount));
        var py = 0.5 * ((2 * p1.y) +
          (-p0.y + p2.y) * (t + amount) +
          (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * (t + amount) * (t + amount) +
          (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * (t + amount) * (t + amount) * (t + amount));
        line(x, y, px, py);
      }
    }
  }

  function toggleDrawing() {
    // Function to toggle drawing on double-click
    if (drawingEnabled) {
      // If drawing is enabled and clearTrail is true, clear the trail
      if (clearTrail) {
        trail = [];
        clearTrail = false; // Reset the flag
      }
    } else {
      // If drawing is disabled, set clearTrail to true to clear the trail next time drawing is enabled
      clearTrail = true;
    }
    drawingEnabled = !drawingEnabled;
  }
}
