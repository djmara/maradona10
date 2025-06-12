let img;
let quoteLayer;
let slices = [];
let font;

let quote = " \"That goal became part of soccer history...\nThere are still 10-year-old kids out there today\nwith 'Maradona' on their backs.\" ";

let glitchSlowdown = false;

function preload() {
  img = loadImage('maradona.jpg'); // Make sure this is uploaded in the p5 editor
  font = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
}

function setup() {
  createCanvas(1280, 720);
  img.resize(width, height);

  quoteLayer = createGraphics(width, height);
  quoteLayer.clear();
  quoteLayer.fill(255);
  quoteLayer.textFont(font);
  quoteLayer.textAlign(CENTER, CENTER);
  quoteLayer.textSize(30);
  quoteLayer.text(quote, width / 2, height / 2);
}

function draw() {
  background(0);
  image(img, 0, 0);

  let newSlices = glitchSlowdown ? 30 : 600;
  let maxOffset = glitchSlowdown ? 8 : 700;

  for (let i = 0; i < newSlices; i++) {
    let h = int(random(10, 100));
    let y = int(random(height - h));
    let offset = random(-maxOffset, maxOffset);
    slices.push(new GlitchSlice(y, h, offset));
  }

  for (let s of slices) {
    s.update();
    s.display();
  }

  if (slices.length > 800) {
    slices.splice(0, slices.length - 800);
  }

  drawButton();
}

function drawButton() {
  fill(20, 20, 20, 200);
  stroke(255);
  rectMode(CENTER);
  rect(width / 2, height - 40, 160, 40);
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textFont(font);
  textSize(16);
  text(glitchSlowdown ? "RUN FREE" : "THE NUMBER 10", width / 2, height - 40);
}

function mousePressed() {
  if (mouseX > width / 2 - 80 && mouseX < width / 2 + 80 &&
      mouseY > height - 60 && mouseY < height - 20) {
    glitchSlowdown = !glitchSlowdown;
  }
}

class GlitchSlice {
  constructor(y, h, offset) {
    this.y = y;
    this.h = h;
    this.currentOffset = offset;
  }

  update() {
    this.currentOffset *= 0.85;
  }

  display() {
    let offsetInt = int(this.currentOffset);
    copy(img, 0, this.y, width, this.h, offsetInt, this.y, width, this.h);
    copy(quoteLayer, 0, this.y, width, this.h, offsetInt, this.y, width, this.h);
  }
}
