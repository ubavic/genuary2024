const lines = [];

const w = 1200;
const h = 600;

function setup() {
  createCanvas(w, h);
  noLoop();

  const pad = 20;

  for (let i = 0; i < 200000; i++) {
    let x = Math.random() * (w + 2 * pad) - pad;
    let y = Math.random() * (h + pad);

    if (Math.random() < pow(y / h, 3)) lines.push([x, y]);
  }
}

function draw() {
  colorMode(HSB);
  background(200, 0, 0);

  noFill();

  for (let l of lines) {
    let dy = 10 * Math.sin(l[0] / 300 + 3) + random() * 10 - 4;
    const t = 1 - l[1] / (h + 20);
    stroke(10 + t * random() * 40, 200, 60 + 200 * pow(t, 2.2));
    line(l[0], l[1], l[0] + 10, l[1] + dy);
  }
}
