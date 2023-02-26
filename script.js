//Create a num X num grid of square divs
const container = document.querySelector('.container');

//Have user input the num using the provided input slider range
const slider = document.querySelector('#slider');
slider.addEventListener('change', onChange);

//create the grid layout
function createGrid(num) {
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
    container.setAttribute('style', `display: grid; grid-template-columns: repeat(${num}, 1fr); grid-template-rows: repeat(${num}, 1fr);`);
    for (let i = 0; i < Math.pow(num, 2); i++) {
        const gridDiv = document.createElement('div');
        gridDiv.setAttribute('style', 'background-color: black; border: none');
        gridDiv.addEventListener('mousedown', changeColor);
        gridDiv.addEventListener('mouseover', changeColor);
        container.appendChild(gridDiv);
    }
}

//When user "hovers" over a particular grid div, change its background color
let mouseDown = false;
container.addEventListener('mousedown', () => mouseDown = true);
container.addEventListener('mouseup', () => mouseDown = false);

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    e.target.setAttribute('style', 'background-color: white;');
}

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

//Default grid
window.addEventListener('DOMContentLoaded', defaultGrid);

function defaultGrid() {
    createGrid(16);
    showSize(16);
}

//Add clear functionality
const clear = document.querySelector('#clear');
clear.addEventListener('click', clearContainer);

function clearContainer() {
    const children = container.childNodes;
    children.forEach(child => child.setAttribute('style', 'background-color: black;'));
}