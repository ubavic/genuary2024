const SIZE = 400;

function setup() {
  createCanvas(SIZE, SIZE);
  rectMode(CENTER);
  colorMode(HSB);
  noStroke();
}

function draw() {
  const d = SIZE / 4;
  const t = frameCount / 30;

  translate(SIZE / 2, SIZE / 2);
  background(0, 0, 100);
  fill(0);

  const p = t / 10;

  for (let r = 20; r > 0; r -= 0.01) {
    let t_ = t + p * r;
    circle(1.5 * d * Math.cos(1 * t_), d * Math.sin(2 * t_), r);
  }

  if (frameCount < 30 * 4 + 5) {
    // saveCanvas('frame' + (1000 + frameCount), 'png');
  }
}
