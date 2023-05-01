let video;
let poseNet;
let poses = [];
let keypointsHistory = [];

function setup() {
  const canvas = createCanvas(640, 480);
  canvas.parent('container');
  video = createCapture(VIDEO);
  video.size(width, height);
  video.parent('container');

  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", function(results) {
    poses = results;
    updateKeypointsHistory();
  });
  video.hide();
  select('#clearButton').mousePressed(clearKeypointsHistory);

}

function modelReady() {
  select("#status").html("Model Loaded");
}

function updateKeypointsHistory() {
  for (let i = 0; i < poses.length; i += 1) {
    const pose = poses[i].pose;
    const nose = pose.nose;
    keypointsHistory.push({ x: nose.x, y: nose.y });
  }
}

function draw() {
  image(video, 0, 0, width, height);

  drawKeypointsHistory();
  drawKeypoints();
}

function drawKeypointsHistory() {
  fill(255, 154, 0, 100); // Lower alpha value for history
  noStroke();
  for (const keypoint of keypointsHistory) {
    ellipse(keypoint.x, keypoint.y, 15, 15);
  }
}

function clearKeypointsHistory() {
    keypointsHistory = [];
  }
  

function drawKeypoints() {
  for (let i = 0; i < poses.length; i += 1) {
    const pose = poses[i].pose;
    const nose = pose.nose;
    fill(255, 154, 0);
    noStroke();
    ellipse(nose.x, nose.y, 15, 15);
  }
}
