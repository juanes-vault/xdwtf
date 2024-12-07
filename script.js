// Seleccionamos el botón
const boton = document.getElementById("boton");

// Lista de emojis románticos
const emojis = ["❤️", "💖", "💘", "💞", "💕", "🌹", "🥰", "😘", "💌"];

// Función para crear un emoji
function crearEmoji() {
  // Crear un elemento span para el emoji
  const emoji = document.createElement("span");
  emoji.classList.add("emoji");

  // Seleccionar un emoji al azar
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

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

// Evento para iniciar la lluvia al hacer clic
boton.addEventListener("click", () => {
  // Generar emojis cada 100ms durante 3 segundos
  const interval = setInterval(crearEmoji, 100);
  setTimeout(() => clearInterval(interval), 3000);
});
