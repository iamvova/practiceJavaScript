// setup canvas

const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;  

// function recive 2 numbers as argument and return range between this numbers
// The main task is create random color (next function)
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function which create random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Bilding ball
function Ball(x, y, speedX, speedY, color, size) {
  this.x = x;
  this.y = y;
  this.speedX = speedX;
  this.speedY = speedY;
  this.color = color;
  this.size = size;
}

// Drow our Ball
Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); // 2 * Pi equal to 360 gradus (But it must be in radians !)
  ctx.fill();
}

// Move our Ball
Ball.prototype.update = function() {
  // First four part check if ball on the end of our screen (plot)
  let ballSizeX = this.x + this.size
  let ballSizeY = this.y + this.size

  if (ballSizeX >= width)
    this.speedX = -(this.speedX)
  
  if (ballSizeX <= 0)
    this.speedX = -(this.speedX)

  if (ballSizeY >= height)
    this.speedY = -(this.speedY)

  if (ballSizeY <= 0)
    this.speedY = -(this.speedY)
  

  this.x += this.speedX;
  this.y += this.speedY;
}

Ball.prototype.collisions = function(){
  for(j = 0; j < balls.length; j++){
    if(!(this === balls[j])){
      let dx = this.x - balls[j].x
      let dy = this.y - balls[j].y
      let distance = Math.sqrt(dx * dx + dy * dy)

      if(distance < this.size + balls[j].size){
        balls[j].color = this.color = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`
      }
    }
  }
}


let balls = []

function loop(){
  ctx.fillStyle = `rgba(0, 0, 0, 0.25)`
  ctx.fillRect(0, 0, width, height)

  while (balls.length < 25) {
    let ball = new Ball(
      random(0, width), random(0, height), // location on screen (plot)
      random(-7, 7), random(-7, 7), // speed
      `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`, // color
      random(10, 20) // size
    )
    balls.push(ball)
  }

  for(let i = 0; i < balls.length; i++){
    balls[i].draw()
    balls[i].update()
    balls[i].collisions()
  }

  requestAnimationFrame(loop)
}

loop()