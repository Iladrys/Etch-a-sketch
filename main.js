
//DOM manipulation and creating elements
const container = document.createElement('div');

document.body.appendChild(container);
container.id = "container";

const resetButton = document.createElement('button');
const sizeButton = document.createElement('button');
const buttons = document.getElementById('buttons');
const body = document.getElementsByName('body');
const opacityButton = document.createElement('button');
const borderButton = document.createElement('button');
const randomColorButton = document.createElement('button');


//Global variables
let parameter = 16;
let opacityPrompt = 'true';
let opacity = 0.1;
let randomCount = 0;
let items;

//Making a square grid
function makeRows(parameter) {
  container.style.setProperty('--grid-rows', parameter);
  container.style.setProperty('--grid-cols', parameter);
  for (i = 0; i < (parameter * parameter); i++) {
    let gridItem = document.createElement("div");
    gridItem.setAttribute('data-count',1);
    container.appendChild(gridItem).className = "grid-item";
  };
};
makeRows(parameter);

//Getting grid elements
function getGridItems(){
  return container.querySelectorAll('.grid-item');
}


//Reset grid function
function resetGrid(parameter){
  items = getGridItems();
  items.forEach(b => b.remove());
  makeRows(parameter);
}

//Changing the size of the grid
function setSize(){
  parameter = prompt('Enter the size of the canvas! (ex. 16 = 16x16 grid)','16');
  resetGrid(parameter);
  colorSquares();
}

// Resize button
sizeButton.textContent = 'Resize';
sizeButton.addEventListener('click', ()=>{
  setSize();
});
buttons.appendChild(sizeButton);

//Clear the canvas button
resetButton.textContent ='Clear';
resetButton.addEventListener('click', () =>{
  items = getGridItems();
  items.forEach(item => {
    item.style.backgroundColor='';
  })
})
buttons.appendChild(resetButton);

//Toggle opacity button
opacityButton.textContent = 'Toggle opacity';
opacityButton.addEventListener('click', () => {
  if (opacityPrompt == 'true'){
    opacityPrompt = 'false';
  }
  else {
    opacityPrompt = 'true';
  }
})
buttons.appendChild(opacityButton);

//Toggle grid orders
borderButton.textContent = 'Toggle grid';
borderButton.addEventListener('click', e => {
  items = getGridItems();
  items.forEach(item => {
    if (!item.style.border || item.style.border == ''){
      item.style.border ='dotted blueviolet 1px';
    }
    else {
      item.style.border =''
    }
  })
})
buttons.appendChild(borderButton);

//Random color generator
function randomColor() {
  const random = () => Math.floor(Math.random() * 256);
  return `rgb(${random()}, ${random()}, ${random()})`;
}

//Random color button
randomColorButton.addEventListener('click', () => {
  items = getGridItems();
  if(randomCount % 2 == 0){
  items.forEach(item => item.addEventListener('mouseover', (e) => {
    e.target.style.backgroundColor = randomColor();
    if (opacityPrompt=='true'){
      let count = e.target.getAttribute('data-count');
      e.target.style.filter = `opacity(${10 * count}%)`;
      count++;
      e.target.setAttribute('data-count', count);
      }
    else {
      e.target.style.filter = `opacity(100%)`;
    }
    })
  );
  randomCount++;
  }
  else {
    randomCount++;
    colorSquares();
  }
})
randomColorButton.textContent = 'RANDOM COLORS';
buttons.appendChild(randomColorButton);


//Coloring grid cells
function colorSquares() {
  items = getGridItems();
  items.forEach(item => item.addEventListener('mouseover', (e) => {
    e.target.style.backgroundColor = document.getElementById('colorPicker').value
    if (opacityPrompt=='true'){
      let count = e.target.getAttribute('data-count');
      e.target.style.filter = `opacity(${10 * count}%)`;
      count++;
      e.target.setAttribute('data-count', count);
      }
    else {
      e.target.style.filter = `opacity(100%)`;
    }
    })
  );
}
colorSquares();