import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase,
        ref,
        push,
        onValue,
        set,
        remove } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://we-app-e6e14-default-rtdb.firebaseio.com/"
}


const today = new Date();
const dayOfWeek = today.getDay();
const person = document.getElementById("turn")

if (dayOfWeek % 2 == 0) {
    person.textContent = "Juanes'"
} else {
    person.textContent = "Wiktoria's"
}


const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const kissesRef = ref(database, "counters/kisses");
const hugsRef = ref(database, "counters/hugs");
const hotRef = ref(database, "counters/hot");


// Kiss Updater

const addButtonKiss = document.querySelector("#addKiss")
const subButtonKiss = document.querySelector("#subKiss")
let counterKisses = document.querySelector("#counterKisses")

// Set up listener to fetch data and update the page
onValue(kissesRef, (snapshot) => {
    const data = snapshot.val();
    counterKisses.value = data !== null ? data : 0; // Use 0 if no data exists
});


addButtonKiss.addEventListener("click", function() {
    counterKisses.value++
    set(kissesRef, counterKisses.value)
})

subButtonKiss.addEventListener("click", function() {
    counterKisses.value--
    set(kissesRef, counterKisses.value)
})


// Hug Updater 

const addHug = document.querySelector("#addHug")
const subHug = document.querySelector("#subHug")
let counterHugs = document.querySelector("#counterHugs")

// Set up listener to fetch data and update the page
onValue(hugsRef, (snapshot) => {
    const data = snapshot.val();
    counterHugs.value = data !== null ? data : 0; // Use 0 if no data exists
});


addHug.addEventListener("click", function() {
    counterHugs.value++
    set(hugsRef, counterHugs.value)
})

subHug.addEventListener("click", function() {
    counterHugs.value--
    set(hugsRef, counterHugs.value)
})


// Hot Updater 

const addHot = document.querySelector("#addHot")
const subHot = document.querySelector("#subHot")
let counterHots = document.querySelector("#counterHots")

// Set up listener to fetch data and update the page
onValue(hotRef, (snapshot) => {
    const data = snapshot.val();
    counterHots.value = data !== null ? data : 0; // Use 0 if no data exists
});


addHot.addEventListener("click", function() {
    counterHots.value++
    set(hotsRef, counterHots.value)
})

subHot.addEventListener("click", function() {
    counterHots.value--
    set(hotsRef, counterHots.value)
})