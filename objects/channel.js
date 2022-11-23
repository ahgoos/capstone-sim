class Channel {
  constructor(type) {
    this.name = "Channel_"+type;
    this.type = type;
    this.regions = [];
    this.memes = [];
    this.targets = [];
    switch (type) {
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
  
  spread(meme, source) {
    meme.location = this;
    let target = this.findTarget(source);
    this.memes.push(meme);
    this.targets.push(target);
    meme.vel = p5.Vector.sub(target.pos, meme.pos).mult(0.01);
    // print(this.memes.length, meme.name, source.name, target.name);
    // let reach = int(source.pop*0.2);
    // this.memes.push(new Meme(m.name.split('_')[1], source, m.format));
  }
  
  findTarget(source) {
    let mindist = width+height;
    let target;
    for (let other of this.regions) {
      // print(other);
      let d = dist(source.pos.x, source.pos.y, other.pos.x, other.pos.y);
      if (d > 0 && d < mindist) {
        mindist = d;
        target = other;
      }
    }
    return target;
  }
  
  // Update channel
  update() {
    for (let i = this.memes.length -1; i >= 0; i--) {
      let meme = this.memes[i];
      let target = this.targets[i];
      let d = dist(meme.pos.x, meme.pos.y, target.pos.x, target.pos.y);
      if (d < target.size) {
        // print(meme.name+' arrived at '+target.name);
        meme.location = target;
        target.memes.push(meme);
        this.memes.splice(i,1);
        this.targets.splice(i,1);
      }
    }
  }
  
  // Display channel
  display() {
    // Loop through backwards
    for (let i = this.memes.length - 1; i >= 0; i--) {
      if (this.memes[i].lifespan <= 0) {
        this.memes.splice(i,1);
        this.targets.splice(i,1);
      } else {
        if (i == this.memes.length-1) {
          this.memes[i].display(this.targets[i].pos);
        }
        if (i == 0) {
          this.memes[i].display();
        }
        if (i > 0 && i < this.memes.length-1) {
          this.memes[i].display(this.memes[i+1].pos);
        }
      }
    }
  }
}