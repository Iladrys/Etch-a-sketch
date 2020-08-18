const container = document.getElementById("container");
const resetButton = document.createElement('button');

//Making a square grid
function makeRows(parameter) {
  container.style.setProperty('--grid-rows', parameter);
  container.style.setProperty('--grid-cols', parameter);
  for (i = 0; i < (parameter * parameter); i++) {
    let item = document.createElement("div");
    container.appendChild(item).className = "grid-item";
  };
};

let parameter = prompt('Enter the size of the grid','16');
makeRows(parameter);
container.appendChild(resetButton);
//Coloring grid cells
function colorSquares() {
    const items = container.querySelectorAll('.grid-item');
    items.forEach(item => item.addEventListener('mouseover', (e) => {
      e.target.style.backgroundColor = "blueviolet";
      })
    );
}
colorSquares();