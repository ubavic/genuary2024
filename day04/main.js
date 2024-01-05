const pad = 50;
const picSize = 700;
const w = picSize + 2 * pad;

function setup() {
  createCanvas(w, w);
  //noLoop();
  //noStroke();
  colorMode(HSB);
  background(30, 10, 10);

  img = loadImage("mona.png", (img) => {
    img.resize(picSize, picSize);
    img.filter(BLUR, 4);
    img.loadPixels();
    let pixels = [...img.pixels];

    background(30, 10, 10);

    let R = 80;
    for (let i = 0; R > 2; i++) {
      let sampleSize = 20;
      for (let x = 0; x <= img.width; x += 2 * sampleSize) {
        for (let y = 0; y <= img.height; y += 2 * sampleSize) {
          let r = pixels[y * img.width * 4 + x * 4];
          let g = pixels[y * img.width * 4 + x * 4 + 1];
          let b = pixels[y * img.width * 4 + x * 4 + 2];
          let [H, S, V] = hsv(r, g, b);
          fill(H, S, V);
          if (random() < 0.6) {
            continue;
          }
          circle(x + pad + 10, y + pad + 10, R); // ?
        }
      }
      R = 80 - 6 * i;
    }
  });

  noLoop();
}

function draw() {}

function hsv(r, g, b) {
  r = r / 255.0;
  g = g / 255.0;
  b = b / 255.0;

  var cmax = Math.max(r, g, b);
  var cmin = Math.min(r, g, b);
  var diff = cmax - cmin;
  var h = -1,
    s = -1;

  if (cmax == cmin) h = 0;
  else if (cmax == r) h = (60 * ((g - b) / diff) + 360) % 360;
  else if (cmax == g) h = (60 * ((b - r) / diff) + 120) % 360;
  else if (cmax == b) h = (60 * ((r - g) / diff) + 240) % 360;

  if (cmax == 0) s = 0;
  else s = (diff / cmax) * 100;

  var v = cmax * 100;
  return [h, s, v];
}
