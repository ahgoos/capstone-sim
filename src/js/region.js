class Region {
  constructor(idx, x, y, population, freq = 0.01, threshold = 150) {
    this.name = "R" + idx;
    this.pos = createVector(x, y);
    this.pop = population;
    this.agents = [];
    for (let i = 0; i < population; i++) {
      let agent = new Agent(i, this);
      this.agents.push(agent);
      agents.push(agent)
    }
    this.size = this.pop * 5;
    this.channels = {};
    for (let i = 0; i < map(this.pop, minp + 1, maxp, 1, media.length); i++) {
      this.channels[media[i]] = channels[media[i]];
    }
    // Dynamic color setting
    this.color = color(random(0, floor(255 * (mouseX / width))), random(0, 165), random(37, 180), 180);
    this.spawn_rate = freq;
    this.spread_threshold = threshold;
    this.memes = [];
    // print(this.pos);
  }

  update() {
    // Spawn memes -- missing distribution
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
    for (let i = this.memes.length - 1; i >= 0; i--) {
      let meme = this.memes[i];
      let ch = this.channels[meme.format];
      for (let a of this.agents) {
        a.consume(meme);
      }
      if (meme.popularity >= this.spread_threshold && random() < 0.05) {
        // print(meme);
        let spread = ch.spread(meme, this);
        if (spread) {
          this.memes.splice(i, 1);
          continue;
        }
      }
      meme.update();
      meme.display();
    }
  }


  display() {
    stroke(alpha(this.color));
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size * 2, this.size * 2);
    let d = dist(this.pos.x, this.pos.y, mousePos().x, mousePos().y);
    if (d < this.size) {
      target = this;
    }
  }

  move(_x, _y) {
    for (let m of this.memes) {
      let dif = p5.Vector.sub(this.pos, m.pos);
      m.pos = createVector(_x - dif.x, _y - dif.y);
    }
    this.pos = createVector(_x, _y);

  }
}


// module.exports = { Region };