const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

window.onload = loadTasks;

// Add task
function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  createTask(text, false);
  saveTasks();
  taskInput.value = "";
}

// Create task
function createTask(text, completed) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;

  if (completed) li.classList.add("completed");

  span.onclick = () => {
    li.classList.toggle("completed");
    saveTasks();
    updateCount();
  };

  const actions = document.createElement("div");
  actions.className = "actions";

  // Edit
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit";
  editBtn.onclick = (e) => {
    e.stopPropagation();
    const newText = prompt("Edit task:", span.textContent);
    if (newText) {
      span.textContent = newText;
      saveTasks();
    }
  };

  // Delete
  const delBtn = document.createElement("button");
  delBtn.textContent = "X";
  delBtn.className = "delete";
  delBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
    updateCount();
  };

  actions.appendChild(editBtn);
  actions.appendChild(delBtn);

  li.appendChild(span);
  li.appendChild(actions);

  taskList.appendChild(li);
  updateCount();
}

// Save tasks
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTask(task.text, task.completed));
  updateCount();
}

// Counter
function updateCount() {
  const total = document.querySelectorAll("li").length;
  const completed = document.querySelectorAll(".completed").length;
  document.getElementById("counter").textContent =
    `${completed} / ${total} completed`;
}

// Clear all
function clearAll() {
  taskList.innerHTML = "";
  saveTasks();
  updateCount();
}

// Enter key
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});