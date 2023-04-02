/*
 * @name SimpleSIM v3
 * @description Memes randomly spawn in Regions, and flow between them through Channels.
 */
// import { writeUserData } from "./index.js";


// All the regions, channels, and memes
let regions = [];
let media = ["wom", "print", "radio", "phone", "tv", "internet"]; // Different types of channels (comms protocols)
let channels = {};
let memes = [];
let agents = [];

// Bounds for region population size
let minp = 2;
let maxp = 12;

// UI tools
let tools = ["inspect", "move"];
let t_idx = 0;
let tool = tools[t_idx];
let target = null;
let xpan = 0;
let ypan = 0;
let cam_speed = 3;
// let sz = 420;
let running = false;


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
  running = !running;
}

function clearSim() {
  regions = [];
  channels = {};
  memes = [];
  agents = [];
  for (let k of media) {
    channels[k] = new Channel(k);
  }
}

function toggleClasses(anchor) {
  // TODO: check active state
  let icon = anchor.querySelector("i");
  icon.classList.toggle("fa-map-pin");
  icon.classList.toggle("fa-close");
  if (!anchor.classList.contains("active")) {
    let name_input = document.getElementById("region-name");
    name_input.value = fb.generateRegionName();
  }
  anchor.classList.toggle("active");
}

function addRegion(anchor, new_reg) {
  // print(anchor, new_reg)
  if (anchor !== null) {
    // print("Button Click!")
    tool = "move";
    let toggler = document.querySelector(".icon.toggler");
    toggleClasses(toggler);
    let name_input = document.getElementById("region-name");
    let pop_input = document.getElementById("region-pop");
    let channels_input = document.getElementById("region-channels");
    var new_reg = new Region(name_input.value, mousePos().x, mousePos().y, pop_input.value, channels_input.value);
  }
  regions.push(new_reg);
  for (let ch of Object.keys(new_reg.channels)) {
    channels[ch].regions[new_reg.name] = new_reg;
  }
  chart.data.labels.push(new_reg.name);
  chart.data.datasets[0].data.push(Object.keys(new_reg.memes).length);
  chart.data.datasets[0].backgroundColor.push(new_reg.color.toString());
  chart.update();
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
  background(240);

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
  background(240);
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
    if (running) {
      regions[i].update();
      let ch_idx = chart.data.labels.indexOf(regions[i].name);
      chart.data.datasets[0].data[ch_idx] = Object.keys(regions[i].memes).length;
      chart.update();
    }
    regions[i].display();
  }

  // Update all memes
  for (let i = memes.length - 1; i >= 0; i--) {
    let meme = memes[i];
    if (running) meme.update();
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
    if (running) channels[x].update();
    channels[x].display();
  }
  chart.update();
  showData();
}

// === UTILS === //

function showData() {
  noStroke();
  if (target instanceof Region) {
    fill("rgba(157,178,189,0.59)");
    if (tool == "move") {
      rect(mousePos().x + 10, mousePos().y, 120, 24);
      fill(0);
      text("Place", mousePos().x + 15, mousePos().y + 15);
      textStyle(BOLD);
      text(target.name, mousePos().x + 48, mousePos().y + 15);
      textStyle(NORMAL);
    } else {
      rect(mousePos().x + 10, mousePos().y, 85, 80);
      fill(0);
      textStyle(BOLD);
      text(target.name, mousePos().x + 15, mousePos().y + 15);
      textStyle(NORMAL);
      text("Agents: " + target.pop, mousePos().x + 15, mousePos().y + 35);
      text("Channels: " + Object.keys(target.channels).length, mousePos().x + 15, mousePos().y + 50);
      text("Memes: " + target.memes.length, mousePos().x + 15, mousePos().y + 65);
      // text("Pos: " + target.pos.x + ", " + target.pos.y, mousePos().x + 15, mousePos().y + 80)
    }
  }
}



// Handle key presses
function keyPressed(event) {
  let cmd_keys = [37, 38, 39, 40, 32];
  // if (cmd_keys.includes(keyCode)) {
  //   event.preventDefault();
  // }
  // alert("key: " + keyCode);
  switch (keyCode) {
    case 32:
      // t_idx++;
      // tool = tools[t_idx % tools.length];
      // print(tool);
      event.preventDefault();
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

// Place or move Region on mouse press
function mousePressed() {
  if (tool == "move") {
    if (target instanceof Region) {
      tool = "inspect";
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

function mouseMoved() {
  if (tool == "move") {
    if (target instanceof Region) {
      target.move(mousePos().x, mousePos().y);
    }
  }
}

function mouseDragged() {
  if (tool == "inspect") {
    if (target instanceof Region) {
      target.move(mousePos().x, mousePos().y);
    }
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