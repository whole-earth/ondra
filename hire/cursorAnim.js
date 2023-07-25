function isMobile() {
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}

// Check if the user is on a touchscreen
if (isMobile()) {
  // If the user is on a touchscreen, do nothing (optional)
  console.log("Cursor animation disabled on touchscreen.");
} else {
  // Initialize vars
  var trail = [];
  var h = 0;
  var userEnabled = true;
  var eventDisabled = false;

  // Styling
  var trailLength = 60;
  var colorSpeed = 1;
  var innerColorSpeed = 4;

  function setup() {
    var canvas = createCanvas(windowWidth, document.body.offsetHeight);
    canvas.parent('cursor-anim');
    colorMode(HSB);
    noFill();
    strokeWeight(5);
  }

  function draw() {
    background(255);
    if (userEnabled && !eventDisabled) {
      trail.push({
        'x': mouseX,
        'y': mouseY
      });

      var thisColor = frameCount * colorSpeed % 360;
      for (var i = 1; i < trail.length; i++) {
        var prevPoint = trail[i - 1];
        var currentPoint = trail[i];
        stroke(thisColor, 100, 100);
        line(prevPoint.x, prevPoint.y, currentPoint.x, currentPoint.y);
        thisColor = (thisColor + 1) % 360;
      }
    }
  }

  function doubleClicked() { // built-in p5 event
    toggleDrawing();
  }

  function toggleDrawing() {
    // Function to toggle drawing on double-click
    if (userEnabled) {
      trail = [];
      userEnabled = false;
    } else {
      userEnabled = true;
    }
  }

  window.addEventListener('scroll', () => {
    if (!eventDisabled) {
      eventDisabled = true;
      console.log('disable');
    }
  });

  window.addEventListener('mousemove', () => {
    if (eventDisabled) {
      eventDisabled = false;
      console.log('enabled');
    }
  });
}