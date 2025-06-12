MAKE THIS CODE JS FRIENDLY:

PImage img;
PGraphics quoteLayer;
ArrayList<GlitchSlice> slices = new ArrayList<GlitchSlice>();
PFont font;

String quote = " \"That goal became part of soccer history...\nThere are still 10-year-old kids out there today\nwith 'Maradona' on their backs.\" ";

boolean glitchSlowdown = false;

void setup() {
  size(1280, 720);
  img = loadImage("maradona.jpg");
  img.resize(width, height);
  font = createFont("Courier", 30);

  quoteLayer = createGraphics(width, height);
  quoteLayer.beginDraw();
  quoteLayer.clear();
  quoteLayer.fill(255);
  quoteLayer.textFont(font);
  quoteLayer.textAlign(CENTER, CENTER);
  quoteLayer.text(quote, width / 2, height / 2);
  quoteLayer.endDraw();
}

void draw() {
  background(0);
  image(img, 0, 0);

  int newSlices = glitchSlowdown ? 30 : 600;
  float maxOffset = glitchSlowdown ? 8 : 700;

  for (int i = 0; i < newSlices; i++) {
    int h = int(random(10, 100));
    int y = int(random(height - h));
    float offset = random(-maxOffset, maxOffset);
    slices.add(new GlitchSlice(y, h, offset));
  }

  for (GlitchSlice s : slices) {
    s.update();
    s.display();
  }

  if (slices.size() > 800) {
    slices.subList(0, slices.size() - 800).clear();
  }

  drawButton();
}

void drawButton() {
  fill(20, 20, 20, 200);
  stroke(255);
  rectMode(CENTER);
  rect(width / 2, height - 40, 160, 40);
  fill(255);
  textAlign(CENTER, CENTER);
  textFont(font, 16);
  text(glitchSlowdown ? "RUN FREE" : "THE NUMBER 10", width / 2, height - 40);
}

void mousePressed() {
  // Check if the button is clicked
  if (mouseX > width / 2 - 80 && mouseX < width / 2 + 80 &&
      mouseY > height - 60 && mouseY < height - 20) {
    glitchSlowdown = !glitchSlowdown;
  }
}

class GlitchSlice {
  int y, h;
  float currentOffset;

  GlitchSlice(int y, int h, float offset) {
    this.y = y;
    this.h = h;
    this.currentOffset = offset;
  }

  void update() {
    currentOffset *= 0.85;
  }

  void display() {
    int offsetInt = int(currentOffset);
    copy(img, 0, y, width, h, offsetInt, y, width, h);
    copy(quoteLayer, 0, y, width, h, offsetInt, y, width, h);
  }
}
