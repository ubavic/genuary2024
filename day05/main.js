const w = 600;
const h = 800;
const dim = 40;
const colA = [60, 5, 90];
const colB = [15, 90, 80];

let s = (n, p = 10) =>
  n < 1 ? 0 : Math.floor(p * sqrt(n - 1) * (random() - 0.5));

function setup() {
  createCanvas(w, h);
  rectMode(CENTER);
  colorMode(HSB);
  noStroke();
  noLoop();
}

function draw() {
  background(...colA);
  fill(...colB);
  rect(w / 2, (3 * h) / 4 + dim / 2, w, h / 2);

  for (let i = 0; i < 10; i++) {
    const J = Math.floor(w / dim);
    for (let j = 0; j < J; j++) {
      if ((j + i) % 2 == 0) {
        let a = dim - 4 * i;
        rect(j * dim + dim / 2 + s(i), h / 2 - dim * i + s(i), a, a);
      }
    }
  }

  fill(...colA);
  for (let i = 0; i < 10; i++) {
    const J = Math.floor(w / dim);
    for (let j = 0; j < J; j++) {
      if ((j + i + 1) % 2 == 0) {
        let a = dim - 4 * i;
        rect(j * dim + dim / 2 + s(i), h / 2 + dim * i + s(i), a, a);
      }
    }
  }
}
