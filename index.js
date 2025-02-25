const taskContainer = document.getElementById("tasks");

if (localStorage.getItem("nextIndex") == null) {
    localStorage.setItem("nextIndex", 1);
}

function showTasks() {
    for (let child of taskContainer.children) taskContainer.removeChild(child);
    if (localStorage.length < 2) taskContainer.innerText = "Add tasks";
    else taskContainer.innerText = "";
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key == "nextIndex" || key == "length") continue;
        const task = localStorage.getItem(key);
        let taskP = document.createElement("p");
        taskP.innerText = task;
        taskP.classList.add("task");
        taskP.addEventListener("click", (ev) => {
            localStorage.removeItem(key);
            showTasks();
        })
        taskContainer.appendChild(taskP);
    };
}

if (typeof Storage) {
    showTasks();
} else {
    alert("Your browser does not support local storage, which is required to run this website.")
}

function processInput(value) {
    alert(value);
}

document.getElementById("newTask").addEventListener("keyup", (ev) => {
    if (ev.key == "Enter") add();
})

function add() {
    let nextIndex = localStorage.getItem("nextIndex");
    const taskElement = document.getElementById("newTask");
    localStorage.setItem("nextIndex", Number(nextIndex) + 1);
    localStorage.setItem(nextIndex, taskElement.value);
    taskElement.value = "";
    showTasks()
}