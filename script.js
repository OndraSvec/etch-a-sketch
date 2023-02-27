//Create a num X num grid of square divs
const container = document.querySelector('.container');

//create the grid layout
function createGrid(num) {
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
    container.setAttribute('style', `display: grid; grid-template-columns: repeat(${num}, 1fr); grid-template-rows: repeat(${num}, 1fr);`);
    for (let i = 0; i < Math.pow(num, 2); i++) {
        const gridDiv = document.createElement('div');
        gridDiv.setAttribute('style', 'background-color: black; border: none;');
        gridDiv.addEventListener('mousedown', changeColor);
        gridDiv.addEventListener('mouseover', changeColor);
        container.appendChild(gridDiv);
    }
}

//Default grid
window.addEventListener('DOMContentLoaded', defaultGrid);

function defaultGrid() {
    createGrid(16);
    showSize(16);
}

//Have user input the num using the provided input slider range
const slider = document.querySelector('#slider');
slider.addEventListener('change', onChange);

//output the num of sqr divs
function showSize(num) {
    const para = document.querySelector('.output');
    para.textContent = `${num} X ${num}`;
}

//change the layout upon slider event and output the current grid size
function onChange(e, num) {
    e.preventDefault(); //otherwise, the slide would stop at the next grid size
    num = e.target.value;
    createGrid(num);
    showSize(num);
}


//When user "hovers" over a particular grid div, change its background color
let mouseDown = false;
container.addEventListener('mousedown', () => mouseDown = true);
container.addEventListener('mouseup', () => mouseDown = false);

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    else if (e.type === 'mouseover' && mouseDown && eraserActive && !rainbowMode && !defaultMode) {
        e.target.setAttribute('style', 'background-color: black;');
    } else if (e.type === 'mouseover' && mouseDown && defaultMode && !rainbowMode && !eraserActive) {
        e.target.setAttribute('style', 'background-color: white;');
    } else if (e.type === 'mouseover' && mouseDown && rainbowMode && !eraserActive && !defaultMode) {
        let randomR = Math.floor(Math.random() * 256);
        let randomG = Math.floor(Math.random() * 256);
        let randomB = Math.floor(Math.random() * 256);
        e.target.setAttribute('style', `background-color: rgb(${randomR}, ${randomG}, ${randomB});`);
    }
}

//add/remove "active" class and switch between modes upon button clicks
function activateButton(e) {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.classList.remove('active'));
    if (e.target.id === 'eraser') {
        eraserActive = !eraserActive;
        defaultMode = false;
        rainbowMode = false;
        if (eraserActive === true) {
            eraser.classList.add('active');
        }
    } else if (e.target.id === 'rainbow') {
        rainbowMode = !rainbowMode;
        eraserActive = false;
        defaultMode = false;
        if (rainbowMode === true) {
            rainbow.classList.add('active');
        }
    } else if (e.target.id === 'clear') {
        rainbowMode = false;
        eraserActive = false;
        defaultMode = true;
        defaultWhite.classList.add('active');
        clearContainer();
    } else if (e.target.id === 'default') {
        defaultMode = !defaultMode;
        rainbowMode = false;
        eraserActive = false;
        if (defaultMode === true) {
            defaultWhite.classList.add('active');
        }
    }
}

//When default mode is active, set other modes to false
let defaultMode = true;

const defaultWhite = document.querySelector('#default');
defaultWhite.addEventListener('click', activateButton);

//When eraser button is active, set background color of each "hovered" grid div back to black
let eraserActive = false;

const eraser = document.querySelector('#eraser');
eraser.addEventListener('click', activateButton);

//When rainbow mode is activated, set background color of each "hovered" grid div to a random color based on the mouse's position
let rainbowMode = false;

const rainbow = document.querySelector('#rainbow');
rainbow.addEventListener('click', activateButton);

//When clear button is active, set each grid div's bg-color back to black and activate default mode
const clear = document.querySelector('#clear');
clear.addEventListener('click', activateButton);

function clearContainer() {
    const children = container.childNodes;
    children.forEach(child => child.setAttribute('style', 'background-color: black;'));
}