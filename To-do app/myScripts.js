let taskInput = document.querySelector(".addtask.text");
let taskList = document.getElementById("tasks");
let deleteNodeList = document.getElementsByClassName("deleteNode");

let task = "";

let add = document.getElementById("Add");
let all = document.getElementById("All");
let pending = document.getElementById("Pending");
let completed = document.getElementById("Completed");
let clear = document.getElementById("Clear");

taskInput.addEventListener("keyup", e => {
    task = taskInput.value.trim();
})

add.onclick = function () {
    if (task != "") {
        let newTask = document.createElement("li");

        let completeNode = document.createElement("input");
        completeNode.type = "checkbox";
        completeNode.className = "completeNode";
        newTask.appendChild(completeNode);

        let inputText = document.createTextNode(task);
        newTask.appendChild(inputText);

        let deleteNode = document.createElement("span");
        deleteNode.className = "deleteNode";
        let deleteNodeText = document.createTextNode("delete");
        deleteNode.appendChild(deleteNodeText);
        deleteNode.onclick = function() {
            let parent = deleteNode.parentElement;
            taskList.removeChild(parent);
        }
        newTask.appendChild(deleteNode);

        taskList.appendChild(newTask);

        task = "";
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
}
