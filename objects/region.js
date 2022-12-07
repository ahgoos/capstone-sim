class Region {
  constructor(idx, x, y, population, freq = 0.01) {
    this.name = "Region_" + idx;
    this.pos = createVector(x, y);
    this.pop = population;
    this.size = this.pop * 5;
    this.channels = {};
    for (let i = 0; i < map(this.pop, minp + 1, maxp, 1, media.length); i++) {
      this.channels[media[i]] = channels[media[i]];
    }
    // print(this.channels);
    this.color = color(random(255), random(255), random(255), 180);
    this.spawn_rate = freq;
    this.memes = [];
  }

  update() {
    if (random() < this.spawn_rate) {
      let meme = new Meme(
        memes.length,
        this,
        random(Object.keys(this.channels))
      );
      memes.push(meme);
      this.memes.push(meme);
    }
    // Share & update memes
    for (let i = this.memes.length-1; i >= 0; i--) {
      let meme = this.memes[i];
      let ch = this.channels[meme.format];
      if (Object.keys(ch.regions).length > 1 && random() < 0.01) {
        // print(meme);
        ch.spread(meme, this);
        this.memes.splice(i,1);
      } else { 
        meme.update();
        meme.display();
      }
    }
  }

  display() {
    stroke(alpha(this.color));
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size * 2, this.size * 2);
    let d = dist(this.pos.x, this.pos.y, mouseX, mouseY);
    if (d < this.size) {
      target = this;
    } else if (d < maxp*10) {
      target = 'border';
    }
  }
}
