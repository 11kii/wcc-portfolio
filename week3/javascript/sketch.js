//no animation / interaction chart
//if you want to use animation or create a loading state look at the cat fact example from last week 
// use a boolean to control when your data is loaded


let content;

function setup() {
  createCanvas(800, 500);

  //no animation / interaction chart
  noLoop();

  fetch("https://11kii.github.io/wcc-portfolio/json/wiki_trend.json").then(function(response) {
    return response.json();
  }).then(function(data) {

    console.log(data);
    
    content = data.content;

    //using no Loop? you can just call your function once the data is loaded
    drawChart();
  
  }).catch(function(err) {
    console.log(`Something went wrong: ${err}`);
  });

}

function draw() {
  background(200);

}

function drawChart(){

  // Compute maximum amount (for normalization)
  let maxval = 0; 
  for (let i=0; i<content.length; i++) {
    value= parseInt(content[i].reviews.replace(/\./g, "").replace(/\,/g, ""))
    if (value > maxval) {
      maxval = value;
    }
  }

  let spacing = 26;//spacing between the bars
  // Display chart
  for (let i=0; i<content.length; i++) {

    let item = content[i];
    
    let rWidth = width/(content.length+2); //add 2 so there is space either side of the chart
    let rX = map(i, 0, content.length, rWidth, width-rWidth); //map range includes the space on either side
    let rY = height-rWidth; 
    let h = parseInt(item.reviews.replace(/\./g, "").replace(/\,/g, ""));
    let rHeight = 0-map(h, 0, maxval, 0, height-(rWidth*2)); // map height so spacing on top + bottom match side spacing 

    console.log(item.name)
    console.log(rHeight )
    
    noStroke(); 
    // fill(item.color);
    rect(rX+spacing/2, rY, rWidth-spacing, rHeight);

    push();
    fill(0); 
    textAlign(CENTER, TOP); 
    translate(rX+rWidth/2-1, rY-100);
    rotate(radians(90));
    text(item.name, 0,0);
    pop()
  }  

}