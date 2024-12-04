// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, push, onValue, set, remove } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  databaseURL: "https://we-app-e6e14-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const todosRef = ref(database, "todos"); // Reference to the "todos" path in your database

// DOM Elements
const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

// Add a new task
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = todoInput.value.trim();
  if (task) {
    push(todosRef, { task, completed: false }); // Push the task to the database
    todoInput.value = ""; // Clear the input field
  }
});

// Listen for changes in the database and update the DOM
onValue(todosRef, (snapshot) => {
  todoList.innerHTML = ""; // Clear the current list
  const todos = snapshot.val();
  if (todos) {
    Object.entries(todos).forEach(([id, todo]) => {
      const li = document.createElement("li");
      li.textContent = todo.task;

      // Add a checkbox for marking completion
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;
      checkbox.addEventListener("change", () => {
        set(ref(database, `todos/${id}/completed`), checkbox.checked);
      });

      // Add a delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        remove(ref(database, `todos/${id}`));
      });

      li.prepend(checkbox);
      li.appendChild(deleteBtn);
      todoList.appendChild(li);
    });
  }
});