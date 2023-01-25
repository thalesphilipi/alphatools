
const { ipcRenderer } = require('electron');


export default class WindowController{

    static closeApp(){
        ipcRenderer.send("closeApp");
    }

    static maximizeApp(){
        ipcRenderer.send("maximizeApp");
    }

    static unMaximizeApp(){
        ipcRenderer.send("unMaximizeApp");
    }

    static minimizeApp(){
        ipcRenderer.send("minimizeApp");
    }
}