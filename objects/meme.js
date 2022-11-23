class Meme {
  constructor(idx, origin, format) {
    this.name = "M_"+idx;
    this.size = 4;
    this.origin = origin;
    this.location = origin;
    this.pos = p5.Vector.add(origin.pos, p5.Vector.random2D().mult(random(origin.size-4)));
    this.vel = createVector(0,0);
    this.drag = 0.7;
    this.lifespan = 300;
    this.format = format;
    switch (format) {
      case 'a':
        this.color = color('#FF9800');
        break;
      case 'b':
        this.color = color('#FFEB3B');
        break;
      case 'c':
        this.color = color('#4CAF50');
        break;
      case 'd':
        this.color = color('#F44336');
        break;
      case 'e':
        this.color = color('#3F51B5');
        break;
      default:
        this.color = color('black');
    }
  }
  
  stop() {
    this.velocity.mult(0);
  }

  update() {
    // Move it
    this.pos.add(this.vel);
    if (this.location instanceof Region) {
      // print(this.location);
      this.vel.mult(this.drag);
    }
    // Fade it out
    // this.color.setAlpha(this.lifespan/2);
    // this.lifespan--;
    
  }

  // Draw meme and connect it with a line
  // Draw a line to another
  display(other) {
    stroke(120);
    // text(this.name,this.pos.x, this.pos.y-10);
    fill(this.color);
    ellipse(this.pos.x,this.pos.y, this.size*2, this.size*2);   
    if (other != null) {
      // print(other);
      strokeWeight(6);
      stroke('rgba(184,184,184,0.2)');
      line(this.pos.x, this.pos.y, other.x, other.y);
      strokeWeight(1);
    }
  }
}
