let content = []

function setup() {
  createCanvas(700, 700);
  noLoop();

  fetch("../json/wiki_trend.json").then(function(response) {
    return response.json();
  }).then(function(data) {

    console.log(data);
    
    content = data.content;

    //using no Loop? you can just call your function once the data is loaded
    draw();
  
  }).catch(function(err) {
    console.log(`Something went wrong: ${err}`);
  });
}

function color_intensity(maxval,value){
  var h = int((maxval - value)/maxval * 240)
  return "hsb(" + h + ", 100%, 50%)";
}

function draw() {
  let maxval = 0; 
  for (let i=0; i<content.length; i++) {
    value= parseInt(content[i].reviews.replace(/\./g, "").replace(/\,/g, ""))
    if (value > maxval) {
      maxval = value;
    }
  }

  background(28, 110, 127)
  textSize(20)
  fill(255)
  textStyle(BOLD)
  text('Top-Viewed Wikipedia Articles of the Week ',150,30)
  textSize(12)
  push()
  translate(400,50)
  // 
  content.forEach((el,i) => {
      push()
  		translate(0,i * 25)
      // let c = floor(map(el.size,23,99,0,9))
    	// fill(colors[c])
      
      let rWidth = width/(25+2);
      let h = parseInt(el.reviews.replace(/\./g, "").replace(/\,/g, ""));
      let rHeight = map(h, 0, maxval, 0, height-(rWidth*2)); // map height so spacing on top + bottom match side spacing 
      
      // colorMode(HSB,360,100,100);
      color_yo=color_intensity(map(maxval, 0, maxval, 0, height-(rWidth*2)),rHeight)
      console.log(color_yo)
      fill(color(color_yo))
      rect(0,0,-rHeight/2,20)
      
      // fill(28, 110, 127)
    	push()
      translate(10,10)
      fill(255); 
      rotate(radians(0));
      text(el.name,3.5,5)
      textStyle(ITALIC)
      text(el.label,0,-6)
    	pop()
  		pop()
	})
  pop()
}


