const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const botonUp = document.querySelector('#up');
const botonLef = document.querySelector('#left');
const botonRig = document.querySelector('#right');
const botonDow = document.querySelector('#down');
let canvasSize;
let elementsSize;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

const playerPosition = {
x: undefined,
y: undefined,
};

// Dimensiones del canvas
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

  game.clearRect(0, 0, canvasSize, canvasSize);
 
  mapRowCol.forEach((row, rowI) => {
    row.forEach((col, colI) =>{
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);

      if (col == "O"){
        if (!playerPosition.x && !playerPosition.y){
          playerPosition.x = posX;
          playerPosition.y = posY;
          console.log({playerPosition})
        }
       
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

//funcion para los movimientos de teclas y botones
function moveUp (){
  playerPosition.y -= elementsSize;
  startGame();
}
function moveDown (){
  playerPosition.y += elementsSize;
  startGame();
}
function moveRight (){
  playerPosition.x += elementsSize;
  startGame();
}
function moveLeft (){
  playerPosition.x -= elementsSize;
  startGame();
}



//teclas de movimiento arriba/abajo/derecha/izquierda
window.addEventListener("keydown",teclado)
function teclado(event){
 if (event.key == "ArrowUp"){
  moveUp ();
 }else if(event.key == "ArrowDown"){
  console.log("abajo");
  moveDown();
 }else if(event.key == "ArrowLeft"){
  console.log("izquierda");
  moveLeft ()
 }else if(event.key == "ArrowRight"){
  console.log("derecha");
  moveRight ()
 }
}

//Botones de arriba/abajo/derecha/izquierda
botonUp.addEventListener("click", moveUp);
botonDow.addEventListener("click", moveDown);
botonLef.addEventListener("click", moveLeft);
botonRig.addEventListener("click", moveRight);



