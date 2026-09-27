
/* DM3014 Interactive Devices, Ashley Hi 2026
 * Week 6 - Teachable Machine
 * Train Your Own Model
 */

let classifier;
// model url *** edit link here
const imageModelURL = "https://teachablemachine.withgoogle.com/models/8u7AfdXa9/";

let video;
let flippedVideo;
let label = ""; // to store classifications
let soundA, soundB, soundC;


function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
  // Load the sound file
  soundA = loadSound('wink.mp3');
  soundB = loadSound('happy.mp3');
  soundC = loadSound('heartbeat.mp3');
}

function setup() {
  createCanvas(600, 500);
  video = createCapture(VIDEO);
  video.size(520, 440);
  video.hide();
  flippedVideo = ml5.flipImage(video);
  classifyVideo();

  
}

function draw() {
if (label === 'Wink') {
    background(255, 255, 33);
  } else if (label === 'Heart') {
    background(255, 33, 133);
  } else if (label === 'Peace') {
    background(35, 247, 247);
  } else {
    background(0); // Default black background
  }
  // draw video
  image(flippedVideo, 40, 30);

  // rect(600,100);
  // draw label *** edit label here
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);

//sound
 if (label === "Wink") {
    if (!soundA.isPlaying()) {
      stopAllSounds();
      soundA.play();
      setTimeout(() => {
        soundA.stop();
      }, 1000); // 1000 ms = 1 second
    }
  } else if (label === "Peace") {
    if (!soundB.isPlaying()) {
      stopAllSounds();
      soundB.play();
      setTimeout(() => {
        soundB.stop();
      }, 3000);
    }
  }else if (label === "Heart") {
    if (!soundC.isPlaying()) {
      stopAllSounds();
      soundC.play();
      setTimeout(() => {
        soundB.stop();
      }, 3000);
    }
  }

// Stops all sounds so they don't play on top of each other
function stopAllSounds() {
  if (soundA && soundA.isPlaying()) soundA.stop();
  if (soundB && soundB.isPlaying()) soundB.stop();
  if (soundC && soundC.isPlaying()) soundC.stop();
}


}

// get prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}


function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  label = results[0].label; // results in array ordered by confidence

  classifyVideo(); // classify again
}
