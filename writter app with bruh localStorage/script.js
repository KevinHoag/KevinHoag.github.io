let options = document.getElementById("options");
let optionsButtons = document.querySelectorAll(".option-button");
let advanceOptionButton = document.querySelectorAll(".adv-option-button");
let fontNames = document.getElementById("fontName"); 
let fontSizes = document.getElementById("fontSize");
let fontColor = document.getElementById("foreColor");
let backColor = document.getElementById("backColor");
let linkButton = document.getElementById("createLink");
let saveButton = document.getElementById("save");
let saveAsButton = document.getElementById("save-as");
let openButton = document.getElementById("open");11
let textInput = document.getElementById("text-input");

let currentPara = "New";
let storageKey = "abcd";
let currentKey = "currentKey";
let paraArray = [];

localStorage.setItem(currentKey, "New");

let checkList = window.localStorage.getItem(storageKey);
if (checkList) {
    paraArray = JSON.parse(window.localStorage.getItem(storageKey));
} else {
    paraArray = [];
    paraArray.push({id: "New", para: ""});
    window.localStorage.setItem(storageKey, JSON.stringify(paraArray));
    window.localStorage.setItem(currentKey, "New");
}

let fontList = [
    "Arial",
    "Verdana",
    "Time New Roman",
    "Courier",
    "sans-serif",
    "Georgia",
    "cursive",
];

(function () {
    for (let x = 0; x < fontList.length; x++) {
        let newFontName = document.createElement("option");
        newFontName.appendChild(document.createTextNode(fontList[x]));
        newFontName.value = fontList[x];
        fontNames.appendChild(newFontName);
    }

    for (let x = 1; x <= 10; x++) {
        let newFontSize = document.createElement("option");
        newFontSize.appendChild(document.createTextNode(x));
        newFontSize.value = x;
        fontSizes.appendChild(newFontSize);
    }
    fontSizes.value = 3;

    fontColor.value = "#000000";
    backColor.value = "#ffffff";
})();


function modifyText(command, defaultUI, value) {
    document.execCommand(command, defaultUI, value);
}

optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, null);
    });
});

advanceOptionButton.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, button.value);
    });
})

linkButton.addEventListener("click", function(){
    let inputLink = prompt("Enter a URL");
    if (/https/i.test(inputLink)) {
        modifyText(linkButton.id, false, inputLink);
    } else {
        inputLink = "https://" + inputLink;
        modifyText(linkButton.id, false, inputLink);
    }
})

saveButton.addEventListener("click", function() {
    let paragraph = textInput.innerHTML;
    if (currentPara !== "New") {
        for (let i = 0; i < paraArray.length; i++) {
            if (paraArray[i].id === currentPara) {
                paraArray[i].para = paragraph;    
                break;
            }
        }
    } else {
        let inputName = prompt("Your file name");
        paraArray.push({id: inputName, para: paragraph})
        currentPara = inputName;
        localStorage.setItem(currentKey, currentPara);
    }
    window.localStorage.setItem(storageKey, JSON.stringify(paraArray));
})

openButton.addEventListener("click", function() {
    window.open("http://127.0.0.1:5500/index2.html", "_blank");
})

saveAsButton.addEventListener("click", function() {
    let oldPara = currentPara;
    let paragraph = textInput.innerHTML;
    let inputName = prompt("Your file name");
    while (inputName === "") {
        inputName = prompt("Your file name");
    }
    currentPara = inputName;

    if (oldPara !== "New") {
        for (let i = 0; i < paraArray.length; i++) {
            if (paraArray[i].id === oldPara) {
                paraArray[i].id = currentPara;
                paraArray[i].para = paragraph;    
                break;
            }
        }
    } else {
        paraArray.push({id: inputName, para: paragraph})
    }
    localStorage.setItem(currentKey, currentPara);
    window.localStorage.setItem(storageKey, JSON.stringify(paraArray));
})

function setParagraph() {
    let ParaName = localStorage.getItem(currentKey);
    if (ParaName !== currentPara) {
        currentPara = ParaName;
        for (let i = 0; i < paraArray.length; i++) {
            if (paraArray[i].id === currentPara) {
                textInput.innerHTML = paraArray[i].para;
                break;
            }
        }
    }
}

setInterval(setParagraph, 1000);

