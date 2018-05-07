var bubbles = [];
var bubblesnum = [];
var operations = ['-','+'];
var operation;
var mx = 500;
var my = 500;
var ax = 540;
var ay = 500;
var aySpeed = 0;
var hitCircle1; 
var second;
var first;
var third;
var score = 0;
var fired = false;
var gameOver = false;

function preload() {
  monster = loadImage("monster.png");
	arrow = loadImage("arrow.png");
	bg1= loadImage("flakes.jpg");
	pass = loadSound("pass.ogg");
	fail = loadSound("fail.wav");
	fairy = loadSound("fairy.wav");
}	
function setup() {
	createCanvas(1000, 600);
	textSize(12);
	textAlign(CENTER);
	for(var i =0; i<5;i++){
		bubblesnum[i] = int(random(0,100));	
	}
	for(var i = 0; i<5;i++){
		bubbles[i]=new Bubbles((i + 5)*80, 50 , 50, bubblesnum[i]);
	}	
	makeEquation();
}

function draw() {
	if(gameOver == true){
		fairy.stop();
		noLoop();
		}
	
	background('#d4e4fd');
	image(bg1, -300, -450);
	image(monster, mx, my, 80, 80); //player
	image(arrow, ax, ay, 80, 80); //arrow
	fairy.play();
	fairy.setVolume(0.05);
	ay -= aySpeed;
	for(var i =0; i<bubbles.length; i++){
		bubbles[i].show();
		bubbles[i].checkCollision();
			if(bubbles[i].checkCollision()){
				fired = false;
				if(bubbles[i].value == second){
					score++;
					pass.setVolume(1);
					pass.play();
				} else {
					fail.setVolume(1);
					fail.play();
					gameOver = true;
				}
				for(var i =0; i<5;i++){
					bubblesnum[i] = int(random(0,100));	
				}
				for(var i = 0; i<5;i++){
					bubbles[i]=new Bubbles((i + 5)*80, 50 , 50, bubblesnum[i]);
				}
			ax = mx+40;	
			makeEquation();
			ay = my;
			aySpeed = 0;
			}
		if(gameOver == true){
			text("GAME OVER", width/2, height/2);	
		}
		
	}

	if (ay<10) { //to bring the arrow back to orginal position
	ay= my;       
	aySpeed = 0	
	}
	fill("black");
	textSize(24);
	text(String(first) + " " + String(operation) + " " + "__" + " = " + String(third), 200, 550);
	text("Score =" + " " + String(score), 200, 60);
	
}

function Bubbles(x, y, diameter, val){
	this.xpos = x;
	this.ypos = y;
	this.diam = diameter;
	this.value = val;
	
	this.show = function(){
		fill("white");
		ellipse(this.xpos, this.ypos, this.diam, this.diam);
		fill("black");
		text(String(this.value), this.xpos, this.ypos);
	}
	this.checkCollision = function(){
		return collideRectCircle(ax,ay,45,45, this.xpos, this.ypos, this.diam);//change width/height to 80,80 for arrow
	}
}

function makeEquation(){
	second = random(bubblesnum);
	third = random(bubblesnum);
	while(second == third){
		third = random(bubblesnum);
	}

	operation = operations[Math.floor(random(0, operations.length))];

	if(operation == operations[0]){ //operation is negative 
		first = Math.abs(third + second);
	} else { //operation positive
		first = third - second;
	}
// console.log(score);
	
// For 5 bubbles per row, we have:
// Pick 5 random numbers from 0 to 100
// Choose one of the random numbers to be the answer
// bubblesnum[random(length)]
// Choose one of the random bubbles thats not the answer to be the equals part of the equation
// Choose operation var operations = operations[random(0,1)];
// Do the reverse operation with the two numbers to come up with the first operand
// equation done
// text(first operand, (operations + or -), "__ = " + equals answer, x, y);
// create variables for answer,equals and operand
	
}

function bubblePop(){

}

function keyPressed() {
  if (keyCode== '37') {
    if(fired){
		mx-=15;
		} else {
			mx-=15;
			ax-=15;
		}
 }

  if (keyCode=='39') {
    if(fired){
		mx+=15;
		} else {
			mx+=15;
			ax+=15;
		}
  }
	if (keyCode=='32') {
  	aySpeed = 4;
		fired = true;
	}
}