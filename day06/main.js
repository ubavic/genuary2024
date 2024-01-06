const w = 800;
const h = 600;
const pad = 80;

let seeds = [];
let no = 20;

function setup() {
  createCanvas(w, h);
  rectMode(CENTER);
  colorMode(HSB);
  noStroke();
  background(0, 0, 10);
  for (let i = 0; i < no; i++) {
    let d = Math.floor(random() * 3) - 1;
    seeds.push({
      x: w / 2,
      y: h / 2,
      hue: (i / no) * 360,
      direction: [d, 1 - Math.abs(d)],
    });
  }
}

function draw() {
  background(0, 0, 0, 0.01);

  for (let seed of seeds) {
    fill(seed.hue, 60, 90);
    circle(seed.x, seed.y, 20);
    circle(seed.x + 5 * seed.direction[0], seed.y + 5 * seed.direction[1], 20);

    seed.x += 10 * seed.direction[0];
    seed.y += 10 * seed.direction[1];

    if (random() < 0.05) {
      seed.direction = [-1 * seed.direction[1], seed.direction[0]];
    }
    if (random() < 0.05) {
      seed.direction = [seed.direction[1], seed.direction[0]];
    }

    if (seed.x > w - pad || seed.x < pad) {
      seed.direction = [-1 * seed.direction[1], seed.direction[0]];
    }

    if (seed.y > h - pad || seed.y < pad) {
      seed.direction = [-1 * seed.direction[1], seed.direction[0]];
    }

    seed.hue = (seed.hue + 1) % 360;
  }
}
