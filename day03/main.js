const w = 600;
const h = 600;

let rands = [];
let curRand = [];

const colors = [
  [62, 80, 100],
  [0, 80, 90],
  [200, 80, 90],
  [10, 0, 100],
  [50, 0, 100],
  [150, 0, 100],
  [200, 0, 100],
  [250, 0, 10],
];

function setup() {
  createCanvas(w, h);
  colorMode(HSB);
  //noLoop();

  const levels = 21;
  for (let i = 0; i < levels; i++) {
    let r = [];
    for (let j = 0; j < 12; j++) {
      r.push(random());
    }
    rands.push(r);
    curRand.push(0);
  }
}

function getRandom(level) {
  level = level % 4;
  curRand[level] += 1;
  let j = curRand[level] % rands[level].length;
  return rands[level][j];
}

function draw() {
  curRand = curRand.map(() => 0);
  let t = millis() / 1000;
  t = t % 8;
  let s = t + 2;
  const zoomF = pow(2, t);

  translate(w / 2, h / 2);
  scale((zoomF * w) / 2);
  rotate((PI * t) / 4);
  background(210, 0, 100);

  stroke(0, 0, 0);
  strokeWeight(((1 / zoomF) * 8) / w);

  line(0, -1, 0, 1);
  line(-1, 0, 1, 0);
  let depth = 10;
  drawSquare(-1, -1, 1, depth, s, 1);
  rotate(PI / 2);
  drawSquare(-1, -1, 1, depth, s, 2);
  rotate(PI / 2);
  drawSquare(-1, -1, 1, depth, s, 3);
  rotate(PI / 2);
  drawSquare(-1, -1, 1, depth, s, 4);
}

function drawSquare(x, y, side, depth, t, seed) {
  if (depth <= 0) {
  } else {
    const d = side / 2;

    let f = t > 2 ? 1 : t - 1;
    let getRandomColor = () =>
      colors[Math.floor(getRandom(depth) * colors.length)];

    stroke(0, 0, 0, f * 1);
    fill(...getRandomColor(), (f - 0.4) * 1);
    rect(0, d, d, d);
    fill(...getRandomColor(), (f - 0.2) * 1);
    rect(d, d, d, d);
    fill(...getRandomColor(), f * 1);
    rect(d, 0, d, d);
    noFill();
    stroke(0, 0, 0);

    if (t > 0) {
      let k = t < 1 ? t : 1;
      line(x + d, y, x + d, y + 2 * k * (2 * d));
      line(x, y + d, x + 2 * k * 2 * d, y + d);
    }
    const l = 1;
    t = t < l ? 0 : t - l;
    drawSquare(x + d, y + d, d, depth - 1, t, seed);
  }
}
