import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, push, onValue, set, remove } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://we-app-e6e14-default-rtdb.firebaseio.com/"
};

const today = new Date();
const dayOfWeek = today.getDay();
const person = document.getElementById("turn");

if (dayOfWeek % 2 == 0) {
    person.textContent = "Wiktoria's";
} else {
    person.textContent = "Juanes'";
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const kissesRef = ref(database, "counters/kisses");
const hugsRef = ref(database, "counters/hugs");
const hotRef = ref(database, "counters/hot");

// Kiss Updater

const addButtonKiss = document.querySelector("#addKiss");
const subButtonKiss = document.querySelector("#subKiss");
let counterKisses = document.querySelector("#counterKisses");

// Set up listener to fetch data and update the page
onValue(kissesRef, (snapshot) => {
    const data = snapshot.val();
    counterKisses.value = data !== null ? data : 0; // Use 0 if no data exists
});

addButtonKiss.addEventListener("click", function() {
    counterKisses.value++;
    set(kissesRef, counterKisses.value);
});

subButtonKiss.addEventListener("click", function() {
    counterKisses.value--;
    set(kissesRef, counterKisses.value);
});

// Hug Updater

const addHug = document.querySelector("#addHug");
const subHug = document.querySelector("#subHug");
let counterHugs = document.querySelector("#counterHugs");

// Set up listener to fetch data and update the page
onValue(hugsRef, (snapshot) => {
    const data = snapshot.val();
    counterHugs.value = data !== null ? data : 0; // Use 0 if no data exists
});

addHug.addEventListener("click", function() {
    counterHugs.value++;
    set(hugsRef, counterHugs.value);
});

subHug.addEventListener("click", function() {
    counterHugs.value--;
    set(hugsRef, counterHugs.value);
});

// Hot Updater

const addHot = document.querySelector("#addHot");
const subHot = document.querySelector("#subHot");
let counterHots = document.querySelector("#counterHots");

// Set up listener to fetch data and update the page
onValue(hotRef, (snapshot) => {
    const data = snapshot.val();
    counterHots.value = data !== null ? data : 0; // Use 0 if no data exists
});

addHot.addEventListener("click", function() {
    counterHots.value++;
    set(hotRef, counterHots.value);
});

subHot.addEventListener("click", function() {
    counterHots.value--;
    set(hotRef, counterHots.value);
});


// Lista de emojis 
const emojis = ["❤️", "💖", "💘", "💞", "💕", "🌹", "🥰"];
const hotEmojis = ["🔥", "😈", "👹", "🌋", "💥", "🔞"];
const emotionalEmojis = ["😢", "😭", "😱", "😳", "🥺", "😟", "😖"];

// Función para crear un emoji
function crearEmoji(emojiList) {
  // Crear un elemento span para el emoji
  const emoji = document.createElement("span");
  emoji.classList.add("emoji");

  // Seleccionar un emoji al azar de la lista proporcionada
  emoji.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];

  // Posición inicial aleatoria
  emoji.style.left = Math.random() * 100 + "vw"; // En todo el ancho de la ventana
  emoji.style.top = "-50px"; // Por encima del viewport

  // Tamaño aleatorio
  emoji.style.fontSize = Math.random() * 20 + 20 + "px"; // Entre 20px y 40px

  // Añadir el emoji al cuerpo
  document.body.appendChild(emoji);

  // Eliminar el emoji cuando termine su animación
  setTimeout(() => {
    emoji.remove();
  }, 3000); // Coincide con la duración de la animación
}

// Función para iniciar la lluvia de emojis
function iniciarLluviaEmojis(emojiList) {
  // Generar emojis cada 100ms durante 3 segundos
  const interval = setInterval(() => crearEmoji(emojiList), 100);
  setTimeout(() => clearInterval(interval), 1000);
}

// Seleccionar todos los tipos de botones
const botonesAdd = document.querySelectorAll(".add-button");
const botonesMinus = document.querySelectorAll(".minus-button");
const botonesHot = document.querySelectorAll(".hot-button");

// Añadir evento de clic a cada tipo de botón
botonesAdd.forEach(boton => {
  boton.addEventListener("click", () => iniciarLluviaEmojis(emojis));
});

botonesMinus.forEach(boton => {
  boton.addEventListener("click", () => iniciarLluviaEmojis(emotionalEmojis));
});

botonesHot.forEach(boton => {
  boton.addEventListener("click", () => iniciarLluviaEmojis(hotEmojis));
});