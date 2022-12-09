/*
 * @name SimpleSIM v1
 * @frame 720,400
 * @description Memes randomly spawn in Regions, and flow between them through Channels.
 */

// All the regions, channels, and memes
let regions = [];
let media = ["a", "b", "c", "d", "e"]; // Different types of channels (comms protocols)
let channels = {};
let memes = [];
let agents = [];

// Bounds for region population size
let minp = 2;
let maxp = 12;

// UI tools
let tools = ["edit", "inspect"];
let t_idx = 0;
let tool = tools[t_idx];
let target = null;
let xpan = 0;
let ypan = 0;
let cam_speed = 3;

function mousePos() {
  return createVector(mouseX - xpan, mouseY - ypan)
}

// MAKE INSTANCE TO RENDER ALL INFO THIS WAY
let utils = new p5.Utils();


function setup() {
  createCanvas(innerWidth, innerHeight);
  background(230);

  // Create all media channels
  for (let k of media) {
    channels[k] = new Channel(k);
  }
}

function draw() {
  background(230);
  if (keyIsDown(87) || keyIsDown(38)) { ypan += cam_speed };
  if (keyIsDown(68) || keyIsDown(39)) { xpan -= cam_speed };
  if (keyIsDown(83) || keyIsDown(40)) { ypan -= cam_speed };
  if (keyIsDown(65) || keyIsDown(37)) { xpan += cam_speed };

  translate(xpan, ypan);
  // fill(255, 0, 0);
  // ellipse(0, 0, 10);
  target = null;

  // Handle all regions
  for (let i = 0; i < regions.length; i++) {
    regions[i].update();
    regions[i].display();
  }

  // Update all memes
  for (let i = memes.length - 1; i >= 0; i--) {
    let meme = memes[i];
    meme.update();
    // If we should remove it from the global and local meme lists
    if (meme.popularity <= 0) {
      print(meme.name + " died");
      let idx = meme.location.memes.indexOf(meme);
      meme.location.memes.splice(idx, 1);
      memes.splice(i, 1);
    }
  }

  // Handle all channels
  for (let x of media) {
    channels[x].update();
    channels[x].display();
  }

  utils.debug({
    "Tooltip": tool,
    "FPS": frameRate().toFixed(0),
    "Regions": regions.length,
    "Agents": agents.length,
    "Channels": media.length,
    "Memes": memes.length,
    "Coords": mousePos().x + "x" + mousePos().y
  });
  showData();
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}

// === UTILS === //

function showData() {
  // print(target);
  noStroke();
  if (target instanceof Region) {
    fill("rgba(157,178,189,0.59)");
    rect(mousePos().x + 10, mousePos().y, 85, 90);
    fill(0);
    textStyle(BOLD);
    text(target.name, mousePos().x + 15, mousePos().y + 15);
    textStyle(NORMAL);
    text("Agents: " + target.pop, mousePos().x + 15, mousePos().y + 35);
    text("Channels: " + Object.keys(target.channels).length, mousePos().x + 15, mousePos().y + 50);
    text("Memes: " + target.memes.length, mousePos().x + 15, mousePos().y + 65);
    text("Pos: " + target.pos.x + ", " + target.pos.y, mousePos().x + 15, mousePos().y + 80)
  }
}




// Change tooltip on key press
function keyPressed() {
  // print(keyCode);
  switch (keyCode) {
    case 37:
      break;
    case 38:
      break;
    case 39:
      break;
    case 40:
      break;
    case 32:
      t_idx++;
      tool = tools[t_idx % tools.length];
      // print(tool);
      break;
    default:
      break;
  }
}

// Add element on mouse press
function mousePressed() {
  if (tool == "edit") {
    if (target == null) {
      let new_reg = new Region(regions.length, mousePos().x, mousePos().y, ceil(random(minp, maxp)));
      regions.push(new_reg);
      for (let ch of Object.keys(new_reg.channels)) {
        // print(ch);
        // channels[ch].add(new_reg);
        channels[ch].regions[new_reg.name] = new_reg;
      }
    }
  }
  if (tool == "inspect") {
    if (target instanceof Region) {
      let idx = regions.indexOf(target);
      regions.splice(idx, 1);
      regions.push(target);
    }
  }
}

function mouseDragged() {
  if (tool == "edit") {
    if (target == null) {

    }
  }
  if (tool == "inspect") {
    if (target instanceof Region) {
      target.move(mousePos().x, mousePos().y);
    }
  }
}

function mouseReleased() {
  if (tool == "edit") {
  }
  if (tool == "inspect") {
    
  }
}
