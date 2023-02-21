let taskInput = document.querySelector(".addtask.text");
let newTaskContent = "";

let taskList = document.getElementById("tasks");

let add = document.getElementById("Add");
let all = document.getElementById("All");
let pending = document.getElementById("Pending");
let completed = document.getElementById("Completed");
let clear = document.getElementById("Clear");

let storageKey = "todo-List";
let todoList = localStorage.getItem(storageKey);
let taskArray = [];
if (todoList) {
    taskArray = JSON.parse(localStorage.getItem(storageKey));
}
else {
    taskArray = [];
}

init();

function init() {
    for (let i = 0; i < taskArray.length; i++) {
        let newTask = document.createElement("li");

        newTask.id = taskArray[i].id;

        let completeNode = document.createElement("input");
        completeNode.type = "checkbox";
        completeNode.className = "completeNode";
        completeNode.checked = taskArray[i].status;
        completeNode.onchange = function () {
            let parent = completeNode.parentElement;
            for (let i = 0; i < taskArray.length; i++) {
                if (taskArray[i].id === parent.getAttribute("id")) {
                    taskArray[i].status = parent.querySelector("input").checked;
                } 
            }
            localStorage.setItem(storageKey, JSON.stringify(taskArray));
        }
        newTask.appendChild(completeNode);

        let inputText = document.createTextNode(taskArray[i].content);
        newTask.appendChild(inputText);

        let deleteNode = document.createElement("span");
        deleteNode.className = "deleteNode";
        let deleteNodeText = document.createTextNode("delete");
        deleteNode.appendChild(deleteNodeText);
        deleteNode.onclick = function () {
            let parent = deleteNode.parentElement;
            taskList.removeChild(parent);
            let i = 0;
            while (i < taskArray.length) {
                if (taskArray[i].id === parent.getAttribute("id")) {
                    taskArray.splice(i, 1);
                    break;
                }
                else {
                    i++;
                }
            }
            localStorage.setItem(storageKey, JSON.stringify(taskArray));
        }
        newTask.appendChild(deleteNode);
        taskList.appendChild(newTask);
    }
}

taskInput.addEventListener("keyup", e => {
    newTaskContent = taskInput.value.trim();
})

add.onclick = function () {
    if (newTaskContent != "") {
        let newTask = document.createElement("li");

        let date = new Date();
        newTask.id = date.getTime().toString();

        let completeNode = document.createElement("input");
        completeNode.type = "checkbox";
        completeNode.className = "completeNode";
        completeNode.onchange = function () {
            let parent = completeNode.parentElement;
            for (let i = 0; i < taskArray.length; i++) {
                if (taskArray[i].id === parent.getAttribute("id")) {
                    taskArray[i].status = parent.querySelector("input").checked;
                } 
            }
            localStorage.setItem(storageKey, JSON.stringify(taskArray));
        }
        newTask.appendChild(completeNode);

        let inputText = document.createTextNode(newTaskContent);
        newTask.appendChild(inputText);

        let deleteNode = document.createElement("span");
        deleteNode.className = "deleteNode";
        let deleteNodeText = document.createTextNode("delete");
        deleteNode.appendChild(deleteNodeText);
        deleteNode.onclick = function () {
            let parent = deleteNode.parentElement;
            taskList.removeChild(parent);
            let i = 0;
            while (i < taskArray.length) {
                if (taskArray[i].id === parent.getAttribute("id")) {
                    taskArray.splice(i, 1);
                    break;
                }
                else {
                    i++;
                }
            }
            localStorage.setItem(storageKey, JSON.stringify(taskArray));
        }
        newTask.appendChild(deleteNode);

        taskList.appendChild(newTask);
        taskArray.push({id: date.getTime().toString(), status: false, content: newTaskContent});
        localStorage.setItem(storageKey, JSON.stringify(taskArray));

        newTaskContent = "";
        taskInput.value = "";
    }
    else {
        alert("You must write something!");
    }
}

all.onclick = function () {
    let allTask = taskList.querySelectorAll("li");
    for (let i = 0; i < allTask.length; i++) {
        allTask[i].style.display = "list-item";
    }
}

completed.onclick = function () {
    let allTask = taskList.querySelectorAll("li");
    for (let i = 0; i < allTask.length; i++) {
        if (allTask[i].querySelector("input").checked === false) {
            allTask[i].style.display = "none";
        }
        else {
            allTask[i].style.display = "list-item";
        }
    }
}

pending.onclick = function () {
    let allTask = taskList.querySelectorAll("li");
    for (let i = 0; i < allTask.length; i++) {
        if (allTask[i].querySelector("input").checked === true) {
            allTask[i].style.display = "none";
        }
        else {
            allTask[i].style.display = "list-item";
        }
    }
}

clear.onclick = function () {
    let theLastTask = taskList.lastChild;
    while (theLastTask) {
        taskList.removeChild(theLastTask);
        theLastTask = taskList.lastChild;
    }
    taskArray.splice(0, taskArray.length);
    localStorage.setItem(storageKey, JSON.stringify(taskArray));
}
