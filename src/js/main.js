const electron = require("electron");
const url = require("url");
const path = require("path");

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let secondWindow;


app.on('ready', () => {
    mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, 
    }
  });
  mainWindow.loadURL(
    url.format({
      pathname: "../main.html",
      protocol: "file",
      slashes: true
    })
  );
  console.log(process.platform);
  ipcMain.on("key:newWindow", (err, data) =>{
    createWindow(secondWindow,"Second Window", "../src/html/secondWindow.html");
  });
  ipcMain.on("key:main", (err, data) =>{
    console.log(data);
  });
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);

});

const mainMenuTemplate = [
    {
      label: "Dosya",
      submenu: [
        {
          label: "Yeni"
        },
        {
          type: "separator"
        },
        {
          label: "Reload",
          role: "reload"
        },
        {
          label: "Çıkış",
          accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
          role: "quit"
        }
      ]
    }
]

if(process.platform == "darwin"){
  mainMenuTemplate.unshift({
    label: app.getName(), 
    role: "TODO"
  })
}

if(process.env.NODE_ENV !== "production"){
  mainMenuTemplate.push(
    {
      label: "Dev-Tool",
      submenu: [
        {
          label: "Open Dev Tool",
          click(item, focusedWindows){
            focusedWindows.toggleDevTools();
          }
        }
      ]
    }
  )
}
function createWindow(setWindow,title,pathname){
  console.log("denemesadasd");
  let fakeWindow = new BrowserWindow({
    height: 400,
    width: 300,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: true
    },
    title: title,
  });
  fakeWindow.setTitle(title);
  fakeWindow.loadURL(url.format({
    pathname: pathname,
    protocol: "file",
    slashes: true
  }));
  setWindow=fakeWindow;
  fakeWindow=null;
}