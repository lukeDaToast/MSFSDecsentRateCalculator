let distance = 0; //The total distance until leveling out. Needed to be up here for functions to work :D fuck hoisting
//UI CREATION


// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('node:path')

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.




//LOGIC




function main() {
//convert distance to decent ft/min
/*
THE BIG BRAIN MATH:

convert mach number to seconds/mile
find the total distance from the waypoint
find time to go the total distance
convert seconds to minutes
find difference in altitudes
find the diff feet//minutes
*/

let dropdownMenu = document.getElementById("dropdownButton");

let machNumber = parseFloat(document.getElementById("MachNumber").value); //Mach number of plane during decent
let startAlt = parseInt(document.getElementById("StartAlt").value); //The Starting altitude of the plane
let endAlt = parseInt(document.getElementById("EndAlt").value); //the required altitude of the plane


const secondMiles = machNumber * 4.7333647058824; //Convert mach number into number of seconds per mile

//Add all the temporary distances together for the total distance

//Find the time to get to the destionation in seconds
const secondsToDistance = secondMiles * distance;
//Convert time to destination in seconds to time to destination in minutes
const minutesToDistance = secondsToDistance/60;


//Find the difference in altitudes
const altitudeDifference = endAlt - startAlt;


//find the required feet/minute to get destination at altitude
let feetPerMinute = altitudeDifference/minutesToDistance;
console.log(feetPerMinute);

feetPerMinute = Math.floor(feetPerMinute, 0.1); //round to the right digit

console.log(feetPerMinute);
document.querySelector("h2").textContent = `The feet per minute is: ${feetPerMinute}`;
};
//main();
//getdist()

function getDist() {
  let tempDist = parseFloat(document.getElementById("tempDist").value); //The temperary distance between waypoints
  distance += tempDist;
  console.log(distance);
  document.querySelector("h4").textContent = `Current Distance:${distance}`;
}

function selectItem(item) {
  document.getElementById('dropdownButton').textContent = item;
}