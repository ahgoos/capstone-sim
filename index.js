// === GLOBALS === //
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyBhWygDUviicrrudYLmnSrXQ8Z4sh4DZD4",
    authDomain: "capstone-space.firebaseapp.com",
    projectId: "capstone-space",
    storageBucket: "capstone-space.appspot.com",
    messagingSenderId: "930500695794",
    appId: "1:930500695794:web:3ca9c01512c1385a3ce26b",
    measurementId: "G-TKCFZJHVCB"
};
// // Get a reference to the database service
// const auth = getAuth(app);
// // All the regions, channels, and memes

// onAuthStateChanged(auth, (user) => {
//   if (user != null) {
//     console.log("User is signed in");
//   } else {
//     console.log("User is not signed in");
//   }
// });
export let app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// Set callbacks for database updates 
onValue(ref(db, 'sims'), updateExpList, errData);
onValue(ref(db, 'scenarios'), updateScenarios, errData);


export function saveSim() {
    let sim_name = document.getElementById("save-sim-name").value;
    if (sim_name) {
        const reference = ref(db, 'sims/' + sim_name);

        set(reference, exportSim());
        console.log("Wrote data to database");
    } else {
        let txt_field = document.getElementById("save-sim-name");
        txt_field.placeholder = "Please enter a name!";
        txt_field.style.setProperty("--c", "#d74444");
        setTimeout(function () {
            txt_field.placeholder = "Name your experiment...";
            txt_field.style.removeProperty("--c");
        }, 3000);
        throw Error("No name provided!");
    }

}

export function getSim(key) {
    if (key == null) {
        key = this.html(); // get the key from the link
    }
    const reference = ref(db, 'sims/' + key);
    onValue(reference, loadSim, errData);
    // console.log("Read data from database: " + reference);
}

export function getScenario(key) {
    if (key == null) {
        key = this.html(); // get the key from the link
    }
    const reference = ref(db, 'scenarios/' + key + '/sim');
    onValue(reference, loadSim, errData);
    // console.log("Read data from database: " + reference);
}

function loadSim(snapshot) {
    // clear existing sim
    // media = [];
    channels = {};
    memes = [];
    regions = [];
    agents = [];
    let sim = snapshot.val();
    // media = sim._media;
    for (let k of media) {
        channels[k] = new Channel(k);
    }
    // console.log(channels);
    sim._regions.forEach(reg => {
        let new_reg = new Region(reg.name, reg.pos.x, reg.pos.y, reg.pop);
        addRegion(null, new_reg);
        // new_reg.display();
    });
    // console.log(sim);

}

function updateExpList(snapshot) {
    // clear the list
    document.getElementById("experiments-list").innerHTML = "";
    // update the list
    let sim_list = snapshot.val();
    let keys = Object.keys(sim_list);
    keys.forEach(key => {
        let li = createElement('li').parent("experiments-list");
        li.addClass("experiment");
        let ahref = createA("#", key).parent(li);
        ahref.mousePressed(getSim);
    });
    // console.log("Updated experiments list");
}

function updateScenarios(snapshot) {
    // clear the list
    document.getElementById("scenarios-list").innerHTML = "";
    // update the list
    let scen_list = snapshot.val();
    let keys = Object.keys(scen_list);
    keys.forEach(key => {
        let li = createElement('li').parent("scenarios-list");
        let ahref = createA("#", key).parent(li);
        ahref.mousePressed(getScenario);
        createSpan(" - " + scen_list[key].description).parent(li);

        for (let g of scen_list[key].guidelines) {
            let p = createP("- " + g).parent(li);
            p.addClass("guideline");
        };
    });
    // console.log("Updated scenarios list");
}

function errData(err) {
    console.log('Error!');
    console.log(err);
}

// let btn = createButton("country").parent("about-card");

export function generateRegionName() {
    // Prefixes
    var prefixes = ["al", "an", "ar", "av", "be", "bi", "bo", "br", "ca", "co", "cu", "da", "di", "do", "du", "el", "en", "er", "es", "fa", "fi", "fo", "fr", "ga", "gi", "go", "gr", "ha", "he", "ho", "ia", "in", "ir", "ja", "je", "jo", "ka", "ke", "ki", "ko", "la", "le", "li", "lo", "lu", "ma", "me", "mi", "mo", "na", "ne", "ni", "no", "nu", "ol", "on", "or", "pa", "pe", "pi", "po", "pr", "ra", "re", "ri", "ro", "sa", "se", "si", "so", "su", "ta", "te", "ti", "to", "tu", "va", "ve", "vi", "vo", "wa", "we", "wi", "wo", "xa", "xe", "xi", "xo", "ya", "ye", "yo", "za", "ze", "zi", "zo"];
    // Syllables
    var syllables = ["ba", "be", "bi", "bo", "bu", "by", "da", "de", "di", "do", "du", "dy", "fa", "fe", "fi", "fo", "fu", "fy", "ga", "ge", "gi", "go", "gu", "gy", "ha", "he", "hi", "ho", "hu", "hy", "ja", "je", "ji", "jo", "ju", "jy", "ka", "ke", "ki", "ko", "ku", "ky", "la", "le", "li", "lo", "lu", "ly", "ma", "me", "mi", "mo", "mu", "my", "na", "ne", "ni", "no", "nu", "ny", "pa", "pe", "pi", "po", "pu", "py", "ra", "re", "ri", "ro", "ru", "ry", "sa", "se", "si", "so", "su", "sy", "ta", "te", "ti", "to", "tu", "ty", "va", "ve", "vi", "vo", "vu", "vy", "wa", "we", "wi", "wo", "wu", "wy", "xa", "xe", "xi", "xo", "xu", "xy", "za", "ze", "zi", "zo", "zu", "zy"];
    // Suffixes
    var suffixes = ["a", "ar", "ca", "da", "e", "en", "er", "ia", "ic", "ie", "ik", "in", "is", "ka", "la", "na", "ne", "on", "or", "os", "ra", "re", "ri", "sa", "ta", "te", "ti", "va", "ve", "vi", "wa", "we", "wi", "ya", "ye", "yo", "za", "ze", "zi",];
    // suffixes += ["bis", "chaeus", "cia", "cion", "cyre", "dalar", "dale", "dell", "din", "dolon", "dore", "dran", "du", "gana", "gar", "garth", "ghar", "goth", "gus", "jan", "la", "lan", "lar", "las", "lion", "lon", "lyn", "mar", "mel", "melan", "mond", "mos", "mund", "nara", "nary", "nata", "nem", "net", "nia", "nica", "nium", "non", "nor", "nys", "phere", "pia", "qar", "que", "rah", "ran", "rant", "rat", "rath", "rea", "rene", "rhia", "ria", "rial", "riel", "rim", "rion", "ron", "rona", "ros", "roth", "rune", "rus", "rynn", "ryon", "sia", "sos", "spea", "tall", "tara", "terra", "tha", "thae", "thaer", "than", "thas", "ther", "this", "thra", "tia", "tika", "tion", "tis", "tope", "topia", "tora", "tria", "tuary", "var", "ven", "ver", "vion", "xar", "xath", "xus", "zan"];
    let new_name = "";
    new_name += prefixes[Math.floor(Math.random() * prefixes.length)];
    let num_syl = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < num_syl; i++) {
        new_name += syllables[Math.floor(Math.random() * syllables.length)];
    }
    new_name += suffixes[Math.floor(Math.random() * suffixes.length)];

    return new_name.charAt(0).toUpperCase() + new_name.slice(1);
}


