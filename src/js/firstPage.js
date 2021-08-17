const electron = require("electron");
const {ipcRenderer}= electron;

let newWindowBtn= document.querySelector("#newWindowBtn");
let textField= document.querySelector("#textField");
let sendBtn = document.querySelector("#sendBtn");
newWindowBtn.addEventListener("click", () => {
    ipcRenderer.send("key:newWindow")
});
sendBtn.addEventListener("click", () => {
    ipcRenderer.send("key:main", textField.value)
});