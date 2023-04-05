let paraList = document.getElementById("para-list");

let currentPara1 = "New";
let currentKey = "currentKey";
let storageKey = "abcd";
let paraArray = [];
let oldList = null;

let checkList = window.localStorage.getItem(storageKey);
if (checkList === null) {
    paraArray = [];
    paraArray.push({ id: "New", para: "" });

    let paraLi = document.createElement("li");
    let paraName = document.createElement("span");
    paraName.className = "paragraphs";
    paraName.appendChild(document.createTextNode(paraArray[0].id));
    paraName.onclick = function () {
        currentPara1 = this.innerText;
        localStorage.setItem(currentKey, currentPara1);
    }
    paraLi.appendChild(paraName);
    paraList.appendChild(paraLi);
    window.localStorage.setItem(storageKey, JSON.stringify(paraArray));
    checkList = window.localStorage.getItem(storageKey);
}

function init() {
    checkList = window.localStorage.getItem(storageKey);
    if (checkList !== oldList) {
        while (paraList.hasChildNodes()) {
            paraList.removeChild(paraList.lastChild);
        }
        paraArray = JSON.parse(window.localStorage.getItem(storageKey));

        for (let i = 0; i < paraArray.length; i++) {
            let paraLi = document.createElement("li");
            let paraName = document.createElement("span");
            paraName.className = "paragraphs";
            paraName.appendChild(document.createTextNode(paraArray[i].id));
            paraName.onclick = function () {
                currentPara1 = this.innerText;
                localStorage.setItem(currentKey, currentPara1);
            }
            paraLi.appendChild(paraName);
            if (paraArray[i].id !== "New") {
                let deleteButton = document.createElement("span");
                deleteButton.className = "delete";
                deleteButton.appendChild(document.createTextNode("\u00D7"));
                deleteButton.onclick = function() {
                    let deletedPara = editButton.parentNode.querySelector("span.paragraphs").innerText;
                    paraList.removeChild(this.parentNode);

                    for (let j = 0; j < paraArray.length; j++) {
                        if (paraArray[j].id === deletedPara) {
                            paraArray.splice(j, 1);
                            break;
                        }
                    }

                    if (currentPara1 === deletedPara) {
                        currentPara1 = "New";
                        localStorage.setItem(currentKey, currentPara1);
                    }
                    localStorage.setItem(currentKey, currentPara1);
                    window.localStorage.setItem(storageKey, JSON.stringify(paraArray));
                }
                paraLi.appendChild(deleteButton);

                let editButton = document.createElement("span");
                editButton.className = "edit";
                editButton.appendChild(document.createTextNode("edit"));
                editButton.onclick = function() {
                    let oldName = editButton.parentNode.querySelector("span.paragraphs").innerText;
                    let inputName = prompt("Enter your file name:");
                    while (inputName === "") {
                        inputName = prompt("Your file name");
                    }

                    for (let j = 0; j < paraArray.length; j++) {
                        if (paraArray[j].id === oldName) {
                            paraArray[j].id = inputName;
                            break;
                        }
                    }

                    if (currentPara1 === oldName) {
                        currentPara1 = inputName;
                        localStorage.setItem(currentKey, currentPara1);
                    }
                    window.localStorage.setItem(storageKey, JSON.stringify(paraArray));
                }
                paraLi.appendChild(editButton);
            }
            paraList.appendChild(paraLi);
        }
        oldList = checkList;
    }
}

setInterval(init, 1000);

