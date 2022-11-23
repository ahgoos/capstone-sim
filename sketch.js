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

function setup() {
  createCanvas(720, 400);
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
    if (memes[i].lifespan <= 0) {
      let idx = memes[i].location.memes.indexOf(memes[i]);
      memes[i].location.memes.splice(idx,1);
      if (memes[i].location instanceof Channel) {
        memes[i].location.targets.splice(i,1);
      }
      memes.splice(i, 1);
    }
  }

  showData();
}

function showData() {
  noStroke();
  fill(0);
  // for (let m of media){
  //   let y = (media.indexOf(m))*55+15;
  //   text(channels[m].name+"\n"+channels[m].memes.length+" Memes: "+channels[m].memes+"\n"+channels[m].targets.length+" Targets: "+channels[m].targets, 5, y);
  // }
  text("Regions: " + regions.length, 5, height - 40);
  text("Channels: " + media.length, 5, height - 25);
  text("Memes: " + memes.length, 5, height - 10);
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
      channels[ch].regions.push(new_reg);
    }
  }
  if (target instanceof Region) {
    
  }
}
