const w = 1000;
const h = 800;

let braids = [];
const numberOfGenerations = 45;
const numberOfBraids = 20;
const xPadding = 20;
const yPadding = 20;
const y = (n) => (n / numberOfGenerations) * (h - 2 * yPadding) + yPadding;
const x = (n) => (n / (numberOfBraids - 1)) * (w - 2 * xPadding) + xPadding;

function setup() {
  createCanvas(w, h);
  colorMode(HSB);
  noLoop();

  let startHue = random() * 364;
  for (let i = 0; i < numberOfBraids; i++) {
    braids.push({
      i: i,
      h: startHue + 150 * random(),
      s: 50 + random() * 30,
      x: [x(i)],
      w: 10,
      z: random(),
    });
  }

  background((startHue + 350) % 360, 10, 90);

  for (let generation = 0; generation < numberOfGenerations; generation++) {
    for (let i = 0; i < numberOfBraids; i++) {
      if (i < numberOfBraids - 1) {
        if (braids[i].h > braids[i + 1].h && random() < 0.5) {
          braids[i].x.push(x(i + 1));
          braids[i + 1].x.push(x(i));
          let tmp = braids[i];
          braids[i] = braids[i + 1];
          braids[i + 1] = tmp;
          i++;
        } else {
          braids[i].x.push(x(i));
        }
      } else {
        braids[i].x.push(x(i));
      }
    }
  }
}

function draw() {
  const numberOfBraids = braids.length;

  braids.sort((a, b) => a.i - b.i);
  for (let j = 0; j < numberOfBraids; j++) {
    stroke(0, 0, 0);
    for (let i = 1; i < braids[j].x.length; i++) {
      strokeWeight(braids[j].w + 3);
      line(braids[j].x[i - 1], y(i - 1), braids[j].x[i], y(i));
    }

    for (let i = 1; i < braids[j].x.length; i++) {
      strokeWeight(braids[j].w);
      stroke(braids[j].h % 360, braids[j].s, 70);
      line(braids[j].x[i - 1], y(i - 1), braids[j].x[i], y(i));
    }
  }

  for (let j = 0; j < numberOfBraids; j++) {
    for (let i = 1; i < braids[j].x.length; i++) {
      if (braids[j].x[i - 1] < braids[j].x[i] && random() < 0.3) {
        strokeCap(SQUARE);
        stroke(0, 0, 2);
        strokeWeight(braids[j].w + 3);
        line(braids[j].x[i - 1], y(i - 1), braids[j].x[i], y(i));
        strokeWeight(braids[j].w);
        strokeCap(ROUND);
        stroke(braids[j].h % 360, braids[j].s, 70);
        line(braids[j].x[i - 1], y(i - 1), braids[j].x[i], y(i));
        strokeWeight(0);
        if (
          i < braids[j].x.length - 1 &&
          braids[j].x[i + 1] <= braids[j].x[i]
        ) {
          fill(braids[j].h % 360, braids[j].s, 70);
          circle(braids[j].x[i], y(i) + braids[j].w / 2, braids[j].w);
        }
        if (i > 2 && braids[j].x[i - 1] <= braids[j].x[i - 2]) {
          fill(braids[j].h % 360, braids[j].s, 70);
          circle(braids[j].x[i - 1], y(i - 1) - braids[j].w / 2, braids[j].w);
        }
      }
    }
  }
}
