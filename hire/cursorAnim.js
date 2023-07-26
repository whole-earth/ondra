// Check if the user is on a touchscreen
if (isMobile()) {
  console.log("There's a cursor animation, but it's disabled on touchscreens.");
} else {
  // Init
  let trail = [];
  let h = 0;
  let userEnabled = true;
  // Styling
  const trailLength = 80;
  const colorSpeed = 1;
  const innerColorSpeed = 3;

  function setup() {
    // const canvas = createCanvas(windowWidth, document.body.offsetHeight);
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('cursor-anim');
    colorMode(HSB);
    noFill();
    strokeWeight(6);
  }

  function draw() {
    background('#f7f5f7');
    if (userEnabled) {
      trail.push({
        'x': mouseX,
        'y': mouseY
      });

      let thisColor = h;
      for (let i = 1; i < trail.length - 2; i++) {
        const seg0 = trail[i - 1];
        const seg1 = trail[i];
        const seg2 = trail[i + 1];
        const seg3 = trail[i + 2];
        stroke(thisColor, 100, 100);
        smoothen(seg0, seg1, seg2, seg3);
        thisColor = (thisColor + innerColorSpeed) % 360;
      }

      if (trail.length > trailLength) {
        trail.splice(0, max(trail.length - trailLength, 0));
      }

      h = (h + colorSpeed) % 360;
    }
  }

  function doubleClicked() {
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
}

function smoothen(p0, p1, p2, p3) {
  var amount = 0.05;
  for (var t = 0; t < 1; t += amount) {
    var x = curvePoint(p0.x, p1.x, p2.x, p3.x, t);
    var y = curvePoint(p0.y, p1.y, p2.y, p3.y, t);
    var px = curvePoint(p0.x, p1.x, p2.x, p3.x, t + amount);
    var py = curvePoint(p0.y, p1.y, p2.y, p3.y, t + amount);
    line(x, y, px, py);
  }
}

function isMobile() {
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}

window.addEventListener('load', function () {
  const element = document.querySelector('.cursor-anim_notif');
  let timeoutID;

  const hideElement = () => {
    element.style.top = '-4rem';
    setTimeout(() => {
      element.remove();
    }, 800);
  };

  // Click event listener for the element and setTimeout combined
  element.addEventListener('click', () => {
    hideElement();
    clearTimeout(timeoutID);
  });

  // setTimeout to hide the element after 3 seconds
  timeoutID = setTimeout(hideElement, 3000);
});
