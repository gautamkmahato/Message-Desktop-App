const {app, BrowserWindow, Tray} = require('electron');
let window;
const createWindow = function(){
     window = new BrowserWindow({
        show: true,
        frame: true,
        width: 900,
        height: 600,
        fullscreenable: true,
        resizable: true,
        enableRemoteModule: true
    })

    window.loadURL("https://messages.google.com/web/")

    window.on('blur', function(){
        window.hide();
    })
}

const toggleWindow = function(){
    window.isVisible() ? window.hide() : showWindow()
}

const showWindow = function(){
    const windowBounds = window.getBounds()
    const trayBounds = tray.getBounds();

    const x = Math.round(trayBounds.x + (trayBounds.width/2) - (windowBounds.width));
    const y = Math.round(trayBounds.y + (trayBounds.height) - (windowBounds.width/1.3));

    window.setPosition(x,y,false);
    window.show();
}
let tray;
const createTray = function(){
    tray = new Tray('msg.png');
    tray.on('click', function(){
        toggleWindow();
    })
}


//app.dock.hide();

app.on('ready', function(){
    console.log("the app has started...");
    createTray();
    createWindow();
});

app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
  })
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })