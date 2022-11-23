class Region {
  constructor(position) {
    this.pop = createVector(position.x, position.y);
    this.channels = [];
    this.memes = [];
  }
  
  update() {
    if (random() < 0.05) {
      this.memes.push(new Meme(this.pos))
    }
  }
  display() {
    stroke(120);
    fill('rgba(212,212,212,0.64)');
    ellipse(this.pos.x,this.pos.y, 4, 4);
  }
}



class Meme {
  constructor(position, force, value) {
    this.pos = createVector(position.x, position.y);
    this.vel = createVector(force.x, force.y);
    this.val = value;
    this.lifespan = 255;
  }
  
  update() {
    // Move it
    this.pos.add(this.velocity);
    this.velocity.mult(this.drag);
    this.lifespan--;
  }
  display() {
    stroke(120);
    fill(255);
    ellipse(this.pos.x,this.pos.y, 4, 4);
  }
}



class Channel {
  constructor(){
    this.regions = [];
    this.requests = [];
  }
  spread(m, source) {
    // Sort regions with access to this channel by proximity to source
    let sorted_regions = this.regions.sort((a, b) => { 
      let adist = dist(source.pos.x, source.pos.y, a.pos.x, a.pos.y);
      let bdist = dist(source.pos.x, source.pos.y, b.pos.x, b.pos.y);
      return adist > bdist;
    });
    print(sorted_regions);
    // Add a new meme with a position and force
    let reach = int(source.pop*0.2);
    print(reach);
    let destinations = sorted_regions.slice(0,reach+1);
    this.requests.push({meme: m, weight: source.pop, dest:destinations});
  }
  
  update() {
    for (let req in this.requests) {
      for (let reg in dest) {
        req.meme
      }
    }
  }
}