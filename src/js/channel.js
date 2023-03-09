class Channel {
  constructor(type) {
    this.name = "CH_" + type;
    this.type = type;
    this.regions = {};
    this.paths = {};
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

  // add(_region) {
  //   // print(_region);
  //   this.regions[_region.name] = _region;
  // }

  spread(meme, source) {
    if (Object.keys(this.regions).length <= 1) {
      return false;
    }
    if (meme.popularity <= 0) {
      throw this.name + " received " + meme.name + " with popularity 0!"
    }
    meme.location = this;
    let dest = this.findDest(source);
    let path = source.name + ">" + dest.name;
    if (!this.paths[path]) {
      this.paths[path] = [];
    }
    this.paths[path].push(meme);

    // CHECK THIS IT'S WEIRD <---
    meme.vel = p5.Vector.sub(dest.pos, meme.pos).mult(0.01);
    // meme.vel.setMag(1);
    // print(this.memes.length, meme.name, source.name, target.name);
    // let reach = int(source.pop*0.2);
    // this.memes.push(new Meme(m.name.split('_')[1], source, m.format));
    return true;
  }

  findDest(source) {
    let mindist = Infinity;
    let dest;
    for (let other of Object.values(this.regions)) {
      // print(other);
      let d = dist(source.pos.x, source.pos.y, other.pos.x, other.pos.y);
      if (d > 0 && d < mindist) {
        mindist = d;
        dest = other;
      }
    }
    // print(dest);
    return dest;
  }

  // Update channel
  update() {
    for (let k of Object.keys(this.paths)) {
      let path = this.paths[k];
      let source = this.regions[split(k, ">")[0]];
      let dest = this.regions[split(k, ">")[1]];
      for (let i = path.length - 1; i >= 0; i--) {
        let meme = path[i];
        let d = dist(meme.pos.x, meme.pos.y, dest.pos.x, dest.pos.y);
        meme.vel = p5.Vector.sub(dest.pos, meme.pos).mult(2 / d);
        if (d < dest.size) {
          meme.location = dest;
          dest.memes.push(meme);
          path.splice(i, 1);
        }
        // Remove unpopular memes
        // if (meme.popularity <= 0) {
        //   let idx = memes.indexOf(meme);
        //   memes.splice(idx, 1);
        //   path.splice(i, 1);
        // }
      }
      if (path.length <= 0) {
        delete this.paths[k];
      }
    }
  }

  // Display channel
  display() {
    for (let k of Object.keys(this.paths)) {
      let path = this.paths[k];
      let source = this.regions[split(k, ">")[0]];
      let dest = this.regions[split(k, ">")[1]];
      // Loop through backwards
      for (let i = path.length - 1; i >= 0; i--) {
        let meme = path[i];
        if (i == path.length - 1) {
          meme.display(source.pos);
        }
        if (i == 0) {
          meme.display(dest.pos);
        }
        if (i < path.length - 1) {
          meme.display(path[i + 1].pos);
        }
      }
    }
  }

  toJSON() {
    let output = {
      name: this.name,
      type: this.type,
      regions: [],
      paths: [],
      color: this.color.toString()
    };

    for (let r of Object.values(this.regions)) {
      output.regions.push(r.name);
    }
    for (let p of Object.keys(this.paths)) {
      let path = this.paths[p];
      let memes = [];
      for (let m of path) {
        memes.push(m.name);
      }
      output.paths.push({
        source: split(p, ">")[0],
        dest: split(p, ">")[1],
        memes: memes
      });
    }
    return output;
  }
}