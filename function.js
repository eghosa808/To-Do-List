const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const renderTasks = () => {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.text;
        li.classList.toggle("done", task.done);

        // Toggle done status
        li.addEventListener("click", () => {
            tasks[index].done = !tasks[index].done;
            saveTasks();
            renderTasks();
        });

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.style.marginLeft = "1rem";
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li); // ← FIXED: now appends each <li> to the <ul>
    });
};

addBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    tasks.push({ text: taskText, done: false });
    saveTasks();
    renderTasks();
    taskInput.value = "";
});

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addBtn.click(); // simulate button click
    }
});


renderTasks(); // initial render
