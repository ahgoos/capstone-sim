// === GLOBALS === //
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

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

export function saveSim() {
    var sim_name = document.getElementById("save-sim-name").value;
    const db = getDatabase(app);
    const reference = ref(db, 'sims/' + sim_name);

    set(reference, exportSim());
    console.log("Wrote data to database");
}


