let tasks = [];
let currentFilter= "All";




//addTask
function addTask() {
    let taskName = document.getElementById("taskName").value;
    let category = document.getElementById("category").value;
    let deadline = document.getElementById("deadline").value;
    let statusTask = document.getElementById("status").value;

    //Dont leave empty
    if (taskName ==="") {
        alert("Please enter a task");
        return;
    }

    //Task Object
    let newTask = {
        id: Date.now(),
        name: taskName,
        category: category,
        deadline: deadline,
        status: statusTask
    };

    tasks.push(newTask);
    saveTasks();
    showTasks();
    

    //clearing the box
    document.getElementById("taskName").value = "";
}

//Updating the task's status

function updateStatus(id, newStatus) {
    for (let i =0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].status = newStatus;
        }
    }
    saveTasks();
    showTasks();
}

//Check overdue tasks

function isOverdue(task) {
    if (task.deadline === "" || task.status === "Done") {
        return false;
    }
    let today = new Date().toLocaleDateString("en-CA");
    if (task.deadline < today) {
        return true;
    }
    return false;
}

//filter
function setFilter(filter) {
    currentFilter = filter;
    showTasks();
}

//showing tasks on the actual page

function showTasks() {
    let list =document.getElementById("taskList");
    list.innerHTML = "";

    for(let i = 0; i < tasks.length; i++) {
        let task = tasks[i];

        //Skipping the tasks that arent in filter
        if (currentFilter !=="All" && task.status !== currentFilter) {
            continue;
        }

        let li =document.createElement("li");

        // Building the inside as text

        li.innerHTML =
            task.name + "|" + task.category + "| Due:" + task.deadline  +
            "<select>" +
                "<option>Not Done</option>" +
                "<option> In Progress</option>" +
                "<option>Done</option>" +
            "</select>";

        // Picking a status
        let select = li.querySelector("select");
        select.value = task.status;

        select.addEventListener("change", function () {
            updateStatus(task.id, select.value);
    });

        list.appendChild(li);
    }
}

//Local storage

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
 function loadTasks() {
    let saved = localStorage.getItem("tasks");
    if (saved !== null) {
        tasks =JSON.parse(saved);
    }
 }


 //Connecting buttons
document.getElementById("add-Btn").addEventListener("click", addTask);


document.getElementById("filterAll").addEventListener("click", function () {
    setFilter("All");
});
document.getElementById("filterDone").addEventListener("click", function () {
    setFilter("Done");
});
document.getElementById("filterInProgress").addEventListener("click", function () {
    setFilter("In Progress");
});
document.getElementById("filterNotDone").addEventListener("click", function () {
    setFilter("Not Done");
});

// Run when the page opens
loadTasks();
showTasks();
    






