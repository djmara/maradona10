let img;
let quoteLayer;
let slices = [];
let font;
let quote = " \"That goal became part of soccer history...\nThere are still 10-year-old kids out there today\nwith 'Maradona' on their backs.\" ";

function setup() {
  createCanvas(1280, 720);
  img = loadImage("maradona.jpg", () => {
    img.resize(width, height);
  });

  font = createFont("Courier", 30);

  quoteLayer = createGraphics(width, height);
  quoteLayer.clear();
  quoteLayer.fill(255);
  quoteLayer.textFont(font);
  quoteLayer.textAlign(CENTER, CENTER);
  quoteLayer.text(quote, width / 2, height / 2);
}

function draw() {
  background(0);
  image(img, 0, 0);

  for (let s of slices) {
    s.update();
    s.display();
  }
}

function triggerGlitchStorm() {
  for (let i = 0; i < 60; i++) {
    let h = floor(random(8, 30));
    let y = floor(random(height - h));
    let offset = floor(random(-100, 100));
    slices.push(new GlitchSlice(y, h, offset));
  }
}

function keyPressed() {
  if (key === 'g' || key === 'G') {
    triggerGlitchStorm();
  }
}

function mouseMoved() {
  for (let i = 0; i < 5; i++) {
    let h = floor(random(5, 20));
    let y = floor(random(height - h));
    let offset = floor(random(-60, 60));
    slices.push(new GlitchSlice(y, h, offset));
  }

  if (slices.length > 200) {
    slices.splice(0, slices.length - 200);
  }
}

class GlitchSlice {
  constructor(y, h, offset) {
    this.y = y;
    this.h = h;
    this.originalOffset = offset;
    this.currentOffset = offset;
  }

  update() {
    this.currentOffset *= 0.9;
  }

  display() {
    let offsetInt = int(this.currentOffset);
    copy(img, 0, this.y, width, this.h, offsetInt, this.y, width, this.h);
    copy(quoteLayer, 0, this.y, width, this.h, offsetInt, this.y, width, this.h);
  }
}

