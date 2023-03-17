/*
 * @name SimpleSIM v3
 * @description Memes randomly spawn in Regions, and flow between them through Channels.
 */
// import { writeUserData } from "./index.js";


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
let tools = ["inspect", "edit"];
let status_check = false;
let t_idx = 0;
let tool = tools[t_idx];
let target = null;
let xpan = 0;
let ypan = 0;
let cam_speed = 3;
// let sz = 420;

function mousePos() {
  return createVector(mouseX - xpan, mouseY - ypan)
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function playPause(anchor) {
  let icon = anchor.querySelector("i");
  icon.classList.toggle("fa-pause");
  icon.classList.toggle("fa-play");
  if (isLooping()) {
    noLoop();
  } else {
    loop();
  }
}

function setupRegion(anchor) {
  anchor.classList.toggle("active");
  let icon = anchor.querySelector("i");
  let name_input = document.getElementById("region-name");
  name_input.value = fb.generateRegionName();
  icon.classList.toggle("fa-map-pin");
  icon.classList.toggle("fa-check");
  let new_reg = new Region(name_input.value, 0, 0, 6);
  new_reg.channels
}

function stepper(anchor) {
  let id = anchor.getAttribute("id");
  if (id.includes("pop")) {
    var myInput = document.getElementById("region-pop");
  } else if (id.includes("channel")) {
    var myInput = document.getElementById("region-channels");
  }
  let min = myInput.getAttribute("min");
  let max = myInput.getAttribute("max");
  let step = myInput.getAttribute("step");
  let val = myInput.getAttribute("value");
  let calcStep = (id.includes("increment")) ? (step * 1) : (step * -1);
  let newValue = parseInt(val) + calcStep;

  if (newValue >= min && newValue <= max) {
    myInput.setAttribute("value", newValue);
  }
}

// MAKE INSTANCE TO RENDER ALL INFO THIS WAY
let utils = new p5.Utils();

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("sketch-holder");
  background(230);
  noLoop();

  // Create all media channels
  for (let k of media) {
    channels[k] = new Channel(k);
  }

  // DOM elements
  // let btn = createButton("country").parent("about-card");
  // btn.mousePressed(() => {
  //   btn.html(fb.generateRegionName());
  // });

}

function draw() {
  background(230);
  if (keyIsDown(38)) { ypan += cam_speed };
  if (keyIsDown(39)) { xpan -= cam_speed };
  if (keyIsDown(40)) { ypan -= cam_speed };
  if (keyIsDown(37)) { xpan += cam_speed };

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
      // print(meme.name + " died");
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

  // utils.debug({
  //   "Tooltip": tool,
  //   "FPS": frameRate().toFixed(0),
  //   "Regions": regions.length,
  //   "Agents": agents.length,
  //   "Channels": media.length,
  //   "Memes": memes.length,
  //   "Coords": mousePos().x + "x" + mousePos().y
  // });
  showData();
}

// function windowResized() {
//   resizeCanvas(innerWidth, innerHeight);
// }

// === UTILS === //

function showData() {
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
function keyPressed(event) {
  let cmd_keys = [37, 38, 39, 40, 32];
  // if (cmd_keys.includes(keyCode)) {
  //   event.preventDefault();
  // }
  // alert("key: " + keyCode);
  switch (keyCode) {
    case 32:
      t_idx++;
      tool = tools[t_idx % tools.length];
      print(tool);
      break;
    case 83:
      print("memes:", memes.length, "\nagents:", agents.length)
      break;
    case 8:
      if (target instanceof Region) {
        removeRegion(target);
      }
      break;
    default:
      break;
  }
}

// Add element on mouse press
function mousePressed() {
  if (tool == "edit") {
    if (target == null) {
      var new_reg = new Region(fb.generateRegionName(), mousePos().x, mousePos().y, ceil(random(minp, maxp)));
      regions.push(new_reg);
      for (let ch of Object.keys(new_reg.channels)) {
        channels[ch].regions[new_reg.name] = new_reg;
      }
      new_reg.display();
    }
  }

  if (tool == "inspect") {
    if (target instanceof Region) {
      let idx = regions.indexOf(target);
      regions.splice(idx, 1);
      regions.push(target);
    }
  }
  target = null;
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


function exportSim() {
  let exportData = {
    _regions: regions.map(r => r.toJSON()),
    _memes: memes.map(m => m.toJSON()),
    _agents: agents.map(a => a.toJSON()),
    _channels: [],
    _media: media
  };
  for (let k of media) {
    exportData._channels.push(channels[k].toJSON());
  }

  return exportData;
}

function removeRegion(reg) {
  let idx = regions.indexOf(reg);
  regions.splice(idx, 1);
  for (let ch of Object.keys(reg.channels)) {
    delete channels[ch].regions[reg.name];
    // print(channels[ch].regions);
  }
}