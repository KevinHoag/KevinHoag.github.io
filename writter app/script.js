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
let openButton = document.getElementById("open");
let textInput = document.getElementById("text-input");
let paraList = document.getElementById("para-list");

let currentPara = "New";
let storageKey = "abcd";
let paraArray = [];

let checkList = localStorage.getItem(storageKey);
if (checkList) {
    paraArray = JSON.parse(localStorage.getItem(storageKey));

    for (let i = 0; i < paraArray.length; i++) {
        let paraLi = document.createElement("li");
        let paraName = document.createElement("span");
        paraName.className = "paragraphs";
        paraName.appendChild(document.createTextNode(paraArray[i].id));
        paraName.onclick = function() {
            currentPara = paraName.innerText;
            for (let i = 0; i < paraArray.length; i++) {
                if (paraArray[i].id === paraName.innerText) {
                    textInput.innerHTML = paraArray[i].para;
                    break;
                }
            }
            options.style.display = "flex";
            textInput.style.display = "block";
            paraList.style.display = "none";
        }
        paraLi.appendChild(paraName);
        paraList.appendChild(paraLi);
    }
} else {
    paraArray = [];
    paraArray.push({id: "New", para: ""});

    let paraLi = document.createElement("li");
    let paraName = document.createElement("span");
    paraName.className = "paragraphs";
    paraName.appendChild(document.createTextNode(paraArray[0].id));
    paraName.onclick = function() {
        options.style.display = "flex";
        textInput.style.display = "block";
        paraList.style.display = "none";
    }
    paraLi.appendChild(paraName);
    paraList.appendChild(paraLi);
    
    localStorage.setItem(storageKey, JSON.stringify(paraArray));
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
    console.log(currentPara);
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

        let paraLi = document.createElement("li");
        let paraName = document.createElement("span");
        paraName.className = "paragraphs";
        paraName.appendChild(document.createTextNode(inputName));
        paraName.onclick = function() {
            currentPara = paraName.innerText;
            for (let i = 0; i < paraArray.length; i++) {
                if (paraArray[i].id === paraName.innerText) {
                    textInput.innerHTML = paraArray[i].para;
                    break;
                }
            }
            options.style.display = "flex";
            textInput.style.display = "block";
            paraList.style.display = "none";
        }
        paraLi.appendChild(paraName);
        paraList.appendChild(paraLi);
    }
    localStorage.setItem(storageKey, JSON.stringify(paraArray));
})

openButton.addEventListener("click", function() {
    options.style.display = "none";
    textInput.style.display = "none";
    paraList.style.display = "block";
})

saveAsButton.addEventListener("click", function() {
    oldName = currentPara;
    let inputName = prompt("Your file name");
    if (inputName !== "") {

    }
})


