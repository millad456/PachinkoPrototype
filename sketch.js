let balls = [];
let pegs = [];
let grav = 0.22;
let fps = 60;

//super secret game if you're into that:https://editor.p5js.org/millad456/sketches/OzNgHjARd 


function setup() {  
  createCanvas(400, 400);
  for(i = 0; i < 1; i++){
    //setup and print initial values
    let xi, yi, xvi, yvi, grav;
    xi = random(100,300);
    yi = random(50,100);
    xvi = random(-2,2);
    yvi = random(0,0.5);
    balls.push(new Ball(xi, yi, xvi, yvi, 0.5));
    
  }
  //balls.push(new Ball(201, 100, 0, 0, 0.5));
  //balls.push(new Ball(225, 200, -1, 0, 0.5));
  
  pegs.push(new Peg(200,200,16));
  pegs.push(new Peg(100,200,16));
  pegs.push(new Peg(300,200,16));
  background(220);
  frameRate(fps);
}

function draw() {
  background(220);
  //do stuff with balls
  for(i = 0; i< balls.length; i++){
    balls[i].display();
    for(j = 0; j < pegs.length; j++){
      if (dist(balls[i].pos.x, balls[i].pos.y, pegs[j].pos.x, pegs[j].pos.y) < balls[i].r + pegs[j].r){
        balls[i].collide(pegs[j]);
        
      } 
    }

    balls[i].move();
  }
  
  //display pegs
  for(i = 0; i< pegs.length; i++){
    pegs[i].display();
  }
}

class Ball {
  constructor(x, y, xvel, yvel, grav) {
    this.pos = createVector(x, y);
    this.vel = createVector(xvel, yvel);
    this.grav = grav;
    this.r = 16;
    this.mass = 10;
  }

  display() {
    noFill();
    stroke(0);
    strokeWeight(2);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
    line(this.pos.x, this.pos.y, this.pos.x + this.vel.x, this.pos.y + this.vel.y);
  }
  move() {
    //collision with the floor
    if (this.pos.y + this.r >= 400) {
      this.vel.y *= -1;
      this.pos.y = 400 - this.r;
    }
    //collisions with the left and right walls
    if (this.pos.x + this.r > 400 || this.pos.x - this.r < 0) {
      this.vel.x *= -1;
    }
    //gravity
    this.vel.y += this.grav;
    this.pos.add(this.vel);
  }
  collide(peg){
    
    //first handle the overlap problem
    let overlap = this.r + peg.r - dist(this.pos.x, this.pos.y, peg.pos.x,peg.pos.y);
    let norm = createVector(this.vel.x, this.vel.y);
    norm.normalize();
    
    norm.mult(overlap + 1);
        
    this.pos.x -= norm.x;
    this.pos.y -= norm.y;
    //now to change direction
    let phi = atan2(this.pos.y - peg.pos.y, this.pos.x - peg.pos.x);
    let theta1 = atan2(this.vel.y, this.vel.x);
    let v1 = mag(this.vel.x, this.vel.y);
    
    //this.vel.x = v1*sin(theta1-phi)*cos(phi + PI/2);
    //this.vel.y = v1*sin(theta1-phi)*sin(phi + PI/2);
    this.vel.x = v1*cos(phi);
    this.vel.y = v1*sin(phi);
    this.display();
    //noLoop();
  }
}
class Peg {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.r = 16;
  }

  display() {
    fill(127);
    stroke(0);
    strokeWeight(2);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
