class Region {
  constructor(name, x, y, population, ch_count, freq = 0.01, threshold = 150) {
    this.name = name;
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
    for (let i = 0; i < ch_count; i++) {
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
    push();
    stroke(alpha(this.color));
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size * 2, this.size * 2);
    fill(80);
    noStroke();
    rectMode(CENTER);
    text(this.name, this.pos.x, this.pos.y + this.size + 10, this.name.length * 6, 14);
    pop();
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

  toJSON() {
    return {
      name: this.name,
      pos: {
        x: this.pos.x,
        y: this.pos.y
      },
      pop: this.pop,
      memes: this.memes.map(m => m.name)
    };
  }
}