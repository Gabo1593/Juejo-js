const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const botonUp = document.querySelector('#up');
const botonLef = document.querySelector('#left');
const botonRig = document.querySelector('#right');
const botonDow = document.querySelector('#down');
let canvasSize;
let elementsSize;

const playerPosition = {
x: undefined,
y: undefined,
};

//Botones de arriba/abajo/derecha/izquierda
function botones (boton, direccion){
  boton.addEventListener("click", ()=>{
    console.log(direccion);
  })
}
botones (botonUp, "arriba");
botones (botonDow, "abajo");
botones (botonLef, "izquierda");
botones (botonRig, "derecha");

//teclas de movimiento arriba/abajo/derecha/izquierda
window.addEventListener("keydown",teclado)
function teclado(event){
 if (event.key == "ArrowUp"){
  playerPosition.y -= elementsSize;
  movePlayer();
 }else if(event.key == "ArrowDown"){
  console.log("abajo");
 }else if(event.key == "ArrowLeft"){
  console.log("izquierda");
 }else if(event.key == "ArrowRight"){
  console.log("derecha");
 }
}



window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }
  
  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);
  
  elementsSize = canvasSize / 10;

  startGame();
}

function startGame() {
  console.log({ canvasSize, elementsSize });

  game.font = elementsSize + 'px Verdana';
  game.textAlign = 'end';

  const map = maps[0];
  const mapRows = map.trim().split("\n");
  const mapRowCol = mapRows.map(row => row.trim().split(""));
  console.log({map, mapRows, mapRowCol});

  mapRowCol.forEach((row, rowI) => {
    row.forEach((col, colI) =>{
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);

      if (col == "O"){
        playerPosition.x = posX;
        playerPosition.y = posY;
        console.log({playerPosition})
      }

      game.fillText(emoji, posX, posY);
    });
  });
  movePlayer();
}

//movimiento del personaje
function movePlayer(){
  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}
