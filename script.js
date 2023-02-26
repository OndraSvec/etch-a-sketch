//Create a num X num grid of square divs
const container = document.querySelector('.container');

function createGrid(num) {
    container.setAttribute('style', `display: grid; grid-template-columns: repeat(${num}, 1fr); grid-template-rows: repeat(${num}, 1fr);`);
    for (let i = 0; i < Math.pow(num, 2); i++) {
        const gridDiv = document.createElement('div');
        gridDiv.setAttribute('style', 'background-color: black; border: none');
        container.appendChild(gridDiv);
    }
}

createGrid(16);
//Have user input the num using the provided input slider range
//When user "hovers" over a particular grid div, change its background color