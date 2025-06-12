
let img;
let quoteLayer;
let slices = [];
let font;
let glitchQuote = [];
let quote = '"That goal became part of soccer history..."\n"There are still 10-year-old kids out there today with \"Maradona\" on their backs."';

function preload() {
  img = loadImage('maradona.jpeg');
  font = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
}

function setup() {
  createCanvas(1280, 720);
  img.resize(width, height);
  quoteLayer = createGraphics(width, height);
  textFont(font);
  initQuoteChars();
  drawQuoteLayer();
}

function draw() {
  background(0);
  image(img, 0, 0);
  for (let s of slices) {
    s.update();
    s.display();
  }
  drawQuoteLayer();
}

function mouseMoved() {
  for (let i = 0; i < 5; i++) {
    let h = int(random(5, 20));
    let y = int(random(height - h));
    let offset = int(random(-60, 60));
    slices.push(new GlitchSlice(y, h, offset));
  }
  if (slices.length > 200) {
    slices.splice(0, slices.length - 200);
  }
}

function keyPressed() {
  if (key === 'g' || key === 'G') {
    triggerGlitchStorm();
  }
}

function triggerGlitchStorm() {
  for (let i = 0; i < 60; i++) {
    let h = int(random(8, 30));
    let y = int(random(height - h));
    let offset = int(random(-100, 100));
    slices.push(new GlitchSlice(y, h, offset));
  }
  for (let gc of glitchQuote) {
    gc.glitch();
  }
}

function initQuoteChars() {
  let lines = quote.split("\n");
  let lineHeight = 30;
  glitchQuote = [];
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let lineWidth = textWidth(line);
    let x = width / 2;
    let y = height / 2 + (i - lines.length / 2 + 0.5) * lineHeight;
    for (let j = 0; j < line.length; j++) {
      let c = line[j];
      glitchQuote.push(new GlitchChar(c, x, y));
      x += textWidth(c);
    }
  }
}

function drawQuoteLayer() {
  quoteLayer.clear();
  quoteLayer.textFont(font);
  quoteLayer.textAlign(CENTER, CENTER);
  quoteLayer.fill(255);
  for (let gc of glitchQuote) {
    gc.update();
    gc.display(quoteLayer);
  }
  image(quoteLayer, 0, 0);
}

class GlitchChar {
  constructor(c, x, y) {
    this.c = c;
    this.home = createVector(x, y);
    this.pos = createVector(x, y);
    this.offset = createVector(0, 0);
    this.jitterTimer = 0;
  }
  glitch() {
    this.offset = createVector(random(-30, 30), random(-20, 20));
    this.jitterTimer = 15;
  }
  update() {
    if (this.jitterTimer > 0) {
      this.jitterTimer--;
    } else {
      this.offset.lerp(createVector(0, 0), 0.1);
    }
    this.pos = p5.Vector.add(this.home, this.offset);
  }
  display(pg) {
    pg.text(this.c, this.pos.x, this.pos.y);
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
     let decay = pow(0.9, deltaTime / (1000 / 60));
  this.currentOffset *= decay;
  }

  display() {
    let offsetInt = int(this.currentOffset);
    copy(img, 0, this.y, width, this.h, offsetInt, this.y, width, this.h);
    copy(quoteLayer, 0, this.y, width, this.h, offsetInt, this.y, width, this.h);
  }
}
