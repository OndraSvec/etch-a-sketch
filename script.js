//Create a num X num grid of square divs
const container = document.querySelector('.container');

function onChange(e, num) {
    //create the grid layout
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
    num = e.target.value;
    console.log(num)
    container.setAttribute('style', `display: grid; grid-template-columns: repeat(${num}, 1fr); grid-template-rows: repeat(${num}, 1fr);`);
    for (let i = 0; i < Math.pow(num, 2); i++) {
        const gridDiv = document.createElement('div');
        gridDiv.setAttribute('style', 'background-color: black; border: none');
        container.appendChild(gridDiv);
    }
    //output the num of sqr divs
    const para = document.querySelector('.output');
    para.textContent = `${e.target.value} X ${e.target.value}`;
}
//Have user input the num using the provided input slider range
const slider = document.querySelector('#slider');
slider.addEventListener('change', onChange);
//When user "hovers" over a particular grid div, change its background color