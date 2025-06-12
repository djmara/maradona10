PImage img;
PGraphics quoteLayer;
ArrayList<GlitchSlice> slices = new ArrayList<GlitchSlice>();
PFont font;
String quote = " \"That goal became part of soccer history...\nThere are still 10-year-old kids out there today\nwith 'Maradona' on their backs.\" ";

void setup() {
  size(1280, 720);
  img = loadImage("maradona.jpg"); 
  img.resize(width, height);
  font = createFont("Courier", 30);

quoteLayer = createGraphics(width, height);
quoteLayer.beginDraw();
quoteLayer.clear(); // make it transparent instead of black
quoteLayer.fill(255);
quoteLayer.textFont(font);
quoteLayer.textAlign(CENTER, CENTER);
quoteLayer.text(quote, width / 2, height / 2);
quoteLayer.endDraw();

  image(img, 0, 0);
}

void draw() {
  background(0);

  // base image
  image(img, 0, 0);

  // apply all current slices
  for (GlitchSlice s : slices) {
    s.update(); 
    s.display();
  }


}

void triggerGlitchStorm() {
  for (int i = 0; i < 60; i++) {
    int h = int(random(8, 30));
    int y = int(random(height - h));
    int offset = int(random(-100, 100));  // more violent shift
    slices.add(new GlitchSlice(y, h, offset));
  }
}

void keyPressed() {
  if (key == 'g' || key == 'G') {
    triggerGlitchStorm();
  }
}

void mouseMoved() {
  for (int i = 0; i < 5; i++) {
    int h = int(random(5, 20));
    int y = int(random(height - h));
    int offset = int(random(-60, 60));  // <-- bidirectional offset
    slices.add(new GlitchSlice(y, h, offset));
  }

  if (slices.size() > 200) {
    slices.subList(0, slices.size() - 200).clear();
  }
}
class GlitchSlice {
  int y, h;
  int originalOffset;
  float currentOffset;

  GlitchSlice(int y, int h, int offset) {
    this.y = y;
    this.h = h;
    this.originalOffset = offset;
    this.currentOffset = offset;
  }

  void update() {
    // Easing back to 0 offset
    currentOffset *= 0.9;  // adjust this for faster/slower healing
  }

  void display() {
    int offsetInt = int(currentOffset);

    copy(img, 0, y, width, h, offsetInt, y, width, h);
    copy(quoteLayer, 0, y, width, h, offsetInt, y, width, h);
  }
}
