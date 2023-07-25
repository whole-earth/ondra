let isUserEnabled = true;
let eventDisabled = false;
let isTouchScreen = isMobile(); // Cache the result

const trail = [];
const trailLength = 60;
const colorSpeed = 1;
const innerColorSpeed = 4;

function setup() {
  const canvas = createCanvas(windowWidth, document.body.offsetHeight);
  canvas.parent('cursor-anim');
  colorMode(HSB);
  noFill();
  strokeWeight(5);
  animateCursor();
}

function draw() {
  // The draw function is empty. All drawing is done in animateCursor().
}

function animateCursor() {
  if (isUserEnabled && !eventDisabled) {
    background(255);
    const thisColor = frameCount * colorSpeed % 360;

    trail.push({
      x: mouseX,
      y: mouseY,
    });

    for (let i = 1; i < trail.length - 2; i++) {
      const seg0 = trail[i - 1];
      const seg1 = trail[i];
      const seg2 = trail[i + 1];
      const seg3 = trail[i + 2];
      stroke((thisColor + (i - 1) * innerColorSpeed) % 360, 100, 100);
      drawCatmullRom(seg0, seg1, seg2, seg3);
    }

    if (trail.length > trailLength) {
      trail.splice(0, trail.length - trailLength);
    }
  }

  if (!isTouchScreen) {
    requestAnimationFrame(animateCursor);
  }
}

function doubleClicked() {
  toggleDrawing();
}

function toggleDrawing() {
  if (isUserEnabled) {
    trail.length = 0;
    isUserEnabled = false;
  } else {
    isUserEnabled = true;
  }
}

function drawCatmullRom(p0, p1, p2, p3) {
  const amount = 0.01;
  const amountSq = amount * amount;
  const amountCu = amount * amountSq;
  const d1 = 0.5 * (2 * p1.x + (-p0.x + p2.x) * amount + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * amountSq + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * amountCu);
  const d2 = 0.5 * (2 * p1.y + (-p0.y + p2.y) * amount + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * amountSq + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * amountCu);

  beginShape();
  for (let t = 0; t < 1; t += amount) {
    const x = d1;
    const y = d2;
    const px = 0.5 * (2 * p1.x + (-p0.x + p2.x) * (t + amount) + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * (t + amount) * (t + amount) + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * (t + amount) * (t + amount) * (t + amount));
    const py = 0.5 * (2 * p1.y + (-p0.y + p2.y) * (t + amount) + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * (t + amount) * (t + amount) + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * (t + amount) * (t + amount) * (t + amount));

    const angle = atan2(py - y, px - x);
    const normalX = cos(angle + HALF_PI); // Calculate the normal vector perpendicular to the curve
    const normalY = sin(angle + HALF_PI);

    const distance = dist(x, y, px, py);
    const strokeWidth = map(distance, 0, 20, 5, 1); // Adjust the mapping to control the width range
    strokeWeight(strokeWidth);

    vertex(x, y);
  }
  endShape();
}


function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
