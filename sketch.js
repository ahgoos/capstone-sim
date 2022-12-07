/*
 * @name SimpleSIM v1
 * @frame 720,400
 * @description Memes randomly spawn in Regions, and flow between them through Channels.
 */

// Different types of channels (comms protocols)
let media = ["a", "b", "c", "d", "e"];

// All the regions, channels, and memes
let regions = [];
let channels = {};
let memes = [];

// Bounds for region population size
let minp = 2;
let maxp = 12;

// UI tools
let tool = "region";
let target = null;

var utils = new p5.Utils();


function setup() {
  let canvas = createCanvas(innerWidth, innerHeight,);

  // Create all media channels
  for (let k of media) {
    channels[k] = new Channel(k);
  }
}

function draw() {
  background(230);
  target = null;

  // Handle all regions
  for (let i = 0; i < regions.length; i++) {
    regions[i].update();
    regions[i].display();
  }

  // Draw lines to show connections between regions based on their shared channels
  // showLinkedRegions();

  // Handle all channels
  for (let x of media) {
    channels[x].update();
    channels[x].display();
  }

  // Update all memes
  for (let i = memes.length - 1; i >= 0; i--) {
    memes[i].update();
    // If we should remove it from the global and local meme lists
    if (memes[i].popularity <= 0) {
      let idx = memes[i].location.memes.indexOf(memes[i]);
      memes[i].location.memes.splice(idx,1);
      if (memes[i].location instanceof Channel) {
        memes[i].location.targets.splice(i,1);
      }
      memes.splice(i, 1);
    }
  }

  showData({
    "FPS": frameRate().toFixed(0),
    "Regions": regions.length,
    "Channels": media.length,
    "Memes": memes.length
  });
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}

// === UTILS === //

function showData(_itemName) {
  if (!document.getElementsByClassName("main-debug")[0]) {
    debug = document.createElement('div');
    debug.className = 'main-debug';
    document.body.appendChild(debug);
    debug.style.left = 2 + 'px';
    debug.style.lineHeight = 1.3;
    debug.style.fontFamily = "Consolas, Menlo, Monaco, monospace";
    debug.style.fontSize = 11 + "px";
    debug.style.fontWeight = 100;
    debug.style.fontStyle = "normal";
    debug.style.fontVariant = "normal";
    debug.style.position = "absolute";
    debug.style.marginLeft = 30 + "px";
    debug.style.marginBottom = (innerHeight - height) + 30 + "px";
    debug.style.left = 0 + "px";
    debug.style.bottom = 0 + "px";
    debug.style.color = "black";
    debug.style.opacity = 0.5;
    debug.style.background = "lightgrey";
    debug.style.padding = "4px 6px";
    debug.style.borderRadius = "4px";
    debug.style.cursor = "default";
    debug.style.zindex = "99999";
  }

  debug.innerHTML = "";

  for (let i = 0; i < Object.keys(_itemName).length; i++) {
    debug.innerHTML += "<i>" + Object.keys(_itemName)[i] + ": </i>" + Object.values(_itemName)[i] + "</br>";
  }
  noStroke();
  fill(0);
  // for (let m of media){
  //   let y = (media.indexOf(m))*55+15;
  //   text(channels[m].name+"\n"+channels[m].memes.length+" Memes: "+channels[m].memes+"\n"+channels[m].targets.length+" Targets: "+channels[m].targets, 5, y);
  // }
  if (target != null && target != 'border') {
    fill("rgba(157,178,189,0.59)");
    rect(mouseX + 10, mouseY, 80, 75);
    fill(0);
    textStyle(BOLD);
    text(target.name, mouseX + 15, mouseY + 15);
    if (target instanceof Region) {
      textStyle(NORMAL);
      text("Agents: " + target.pop, mouseX + 15, mouseY + 35);
      text("Channels: " + Object.keys(target.channels).length, mouseX + 15, mouseY + 50);
      text("Memes: " + target.memes.length, mouseX + 15, mouseY + 65);
      print('region '+Object.keys(target.channels));
    }
  }
}

function showLinkedRegions() {
  return null;
}

// Change tooltip on key press
function keyPressed() {
  return null;
}

// Add element on mouse press
function mousePressed() {
  if (target == null) {
    let new_reg = new Region(regions.length, mouseX, mouseY, ceil(random(minp, maxp)));
    regions.push(new_reg);
    for (let ch of Object.keys(new_reg.channels)) {
      // print(ch);
      // channels[ch].add(new_reg);
      channels[ch].regions[new_reg.name] = new_reg;
    }
  }
  if (target instanceof Region) {
    
  }
}
