class Meme {
  constructor(idx, origin, format) {
    this.name = "M" + idx;
    this.size = 4;
    this.origin = origin;
    this.location = origin;
    this.pos = p5.Vector.add(origin.pos, p5.Vector.random2D().mult(random(origin.size - 4)));
    this.vel = createVector(0, 0);
    this.drag = 0.7;
    this.popularity = 200;
    this.format = format;
    switch (format) {
      case 'wom':
        this.color = color('#FF9800');
        break;
      case 'print':
        this.color = color('#FFEB3B');
        break;
      case 'radio':
        this.color = color('#4CAF50');
        break;
      case 'phone':
        this.color = color('#F44336');
        break;
      case 'tv':
        this.color = color('#3F51B5');
        break;
      case 'internet':
        this.color = color('#35F1B5');
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
      this.popularity--;
    }
  }

  // Draw meme and connect it with a line
  // Draw a line to another
  display(other, linecol = 'rgba(184,184,184,0.2)') {
    stroke(120);
    // text(this.name,this.pos.x, this.pos.y-10);
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size * 2, this.size * 2);
    if (other != null) {
      // print(other);
      strokeWeight(6);
      stroke(linecol);
      line(this.pos.x, this.pos.y, other.x, other.y);
      strokeWeight(1);
    }
  }

  // method to export meme properties as JSON
  toJSON() {
    return {
      name: this.name,
      size: this.size,
      origin: this.origin.name,
      location: this.location.name,
      pos: [this.pos.x, this.pos.y],
      vel: [this.vel.x, this.vel.y],
      drag: this.drag,
      popularity: this.popularity,
      format: this.format,
      color: this.color.toString(),
    };
  }
}

