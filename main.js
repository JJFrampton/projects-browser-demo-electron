const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // create browser window with no chrome (OS title bar)
  // this will disable the ability to move the window at all
  // should look into making this a toggle, or a hot key before mouse click anywhere on window
  mainWindow = new BrowserWindow({ frame: false, width: 800, height: 600 })

  // Create the browser window.
  // mainWindow = new BrowserWindow({width: 800, height: 600})
  // mainWindow = new BrowserWindow({width: 800, height: 600, titleBarStyle: 'hidden'})
  // mainWindow = new BrowserWindow({width: 800, height: 600,
  // titleBarStyle: 'hidden',
  // titleBarOverlay: true})

  // mainWindow.setWindowButtonVisibility(false)

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  let mod = process.platform === 'darwin' ? 'Meta' : 'Alt'
  const {Menu, MenuItem} = require('electron')
  const menu = new Menu()
  menu.append(new MenuItem({
    label: 'YOSHIDA',
    submenu: [{
      label: 'another',
      accelerator: 'Atl+F',
      click: (menuItem, win, event) => {
        console.log('time to print stuff')
        win.flashFrame(true)
      }
    }]
  }))
  menu.append(new MenuItem({
    label: 'Actions',
    submenu: [{
      label: 'Close',
      accelerator: `${mod}+W`,
      click: (menuItem, focusedWindow, event) => {
        console.log('Closing')
        focusedWindow.close()
      }
    },
    {
      label: 'Full Screen',
      accelerator: `${mod}+F`,
      click: (menuItem, focusedWindow, event) => {
        console.log('Full Screen')
        let toggle = !focusedWindow.isSimpleFullScreen()
        focusedWindow.setSimpleFullScreen(toggle)

        // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        // THIS VERSION OF ELECTRON SO INCREDIBLY OLD !!!!!
        // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        // this is v1.6.2
        // current is .... v18.2.0
        // need to port all this code over to a new project

        // focusedWindow.setWindowButtonVisibility(false)
      }
    },
    {
      label: 'Toggle Movable',
      accelerator: `${mod}+M`,
      click: (menuItem, focusedWindow, event) => {
        console.log('Toggle Movable')
        // const { ipcMain } = require('electron');
        // ipcMain.send('toggleMovable')

        focusedWindow.webContents.insertCSS('html, body { background-color: #f00; }')
      }
    },
    {
      label: 'Toggle Opacity',
      accelerator: `${mod}+O`,
      click: (menuItem, focusedWindow, event) => {
        console.log('Toggle Opacity')
        let toggle = focusedWindow.getOpacity()
        toggle = toggle === 0.5? 1.0: 0.5
        focusedWindow.setOpacity(toggle)
      }
    }]
  }))
  Menu.setApplicationMenu(menu)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// listen for toggle bar in render
// const ipc = require('electron').ipcRenderer;
// const { ipcMain } = require('electron');
// ipcMain.on('toggleBar', (event, path) => {
//   console.log('In main, changin browser window');
//   mainWindow.setAutoHideMenuBar(true)
// })

// const {Menu, MenuItem} = require('electron')
// const menu = new Menu()
// menu.append(new MenuItem({
//   label: 'YOSHIDA',
//   submenu: [{
//     role: 'hide',
//     accelerator: 'Atl+F',
//     click: () => {
//       console.log('time to print stuff')
//       mainWindow.flashFrame(true)
//     }
//   }]
// }))
// Menu.setApplicationMenu(menu)
