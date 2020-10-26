let mySong;
let myImg1, myImg2, myImg3, myImg4, logo;
let t = 'Click to play and move the mouse to change volume and rate';

function preload(){
  mySong = loadSound("./assets/sound/Help!-TheBeatles.mp3");
  myImg1 = loadImage("./assets/img/img1.png");
  myImg2 = loadImage("./assets/img/img2.png");
  myImg3 = loadImage("./assets/img/img3.png");
  myImg4 = loadImage("./assets/img/img4.png");
  logo = loadImage("./assets/img/logo1.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  myBeatles1 = new Beatles (random(width), random(height), 150, 150, myImg1, 5, 5);
  myBeatles2 = new Beatles (random(width), random(height), 200, 200, myImg2, 3, 3);
  myBeatles3 = new Beatles (random(width), random(height), 170, 170, myImg3, 4, 4);
  myBeatles4 = new Beatles (random(width), random(height), 185, 185, myImg4, 2, 2);

  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);
}

function draw() {
  background("black");

  let volume = map(mouseX, 0, width, 0, 2);
  volume = constrain(volume, 0, 1);
  mySong.amp(volume);

  let speed = map(mouseY, 0.7, height, 0, 2);
  speed = constrain(speed, 0.7, 1.5);
  mySong.rate(speed);

  myBeatles1.run();
  myBeatles2.run();
  myBeatles3.run();
  myBeatles4.run();

  let rms = analyzer.getLevel();

  ellipse(width / 2, height / 2, 400 + rms*200, 400 + rms*200)

  push();
  translate(-150,-150);
  image(logo, width / 2, height / 2, 300, 300);
  pop();

  fill("white");
  textFont("Merriweather");
  textAlign(CENTER);
  text(t, width/2, 690);
}

function mousePressed() {
  if (mySong.isPlaying()) {
    mySong.pause();
  } else {
    mySong.play();
  }
}

class Beatles {
  constructor (x, y, w, h, img, xDir, yDir) {
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.img = img;
    this.xDir = xDir;
    this.yDir = yDir;
  }

  display() {
    noStroke();
    image(this.img, this.x, this.y, this.w, this.h);
  }

  updatePosition() {
    this.x += this.xDir;
    this.y += this.yDir;
    if (this.y >= height || this.y <= 0) {
			this.yDir *= -1;
		}
		if (this.x >= width || this.x <= 0) {
			this.xDir *= -1;
		}
  }

  run() {
    this.updatePosition();
    this.display();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
