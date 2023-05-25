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

const giftPosition = {};
let enemiesPositions = [];

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

  enemiesPositions = [];
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
       //posicion del regalo
      }else if(col == "I"){
        giftPosition.x = posX;
        giftPosition.y = posY;
      } 
      // posicion de las bombas
      else if(col == "X"){
        enemiesPositions.push({
          x: posX,
          y: posY,
        });
      }

      game.fillText(emoji, posX, posY);
    });
  });
  movePlayer();
}

//movimiento del personaje
function movePlayer(){

//Detecta colision entre el personaje y el regalo
const giftCollisionX = playerPosition.x.toFixed(3) ==
giftPosition.x.toFixed(3);
const giftCollisionY = playerPosition.y.toFixed(3) ==
giftPosition.y.toFixed(3);
const giftCollision = giftCollisionX && giftCollisionY;
if(giftCollision){
  console.log("Yupi!! Subiste de nivel")
}

const enemiesColision = enemiesPositions.find(enemy =>{
  const enemiesColisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
  const enemiesColisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
  return enemiesColisionX && enemiesColisionY;
});
if(enemiesColision){
  console.log("chocaste");
}

  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
  console.log(playerPosition.x, playerPosition.y);
}

//funcion para los movimientos de teclas y botones
function moveUp (){
  if((playerPosition.y - elementsSize) < elementsSize){
    console.log("No puedes salirte");
  }else{
    playerPosition.y -= elementsSize;
    startGame();
  }
  
}
function moveDown (){
  if((playerPosition.y + elementsSize) > canvasSize){
    console.log("No puedes salirte");
  }else{
    playerPosition.y += elementsSize;
    startGame();
  }
}
function moveRight (){
  if((playerPosition.x + elementsSize) > canvasSize){
    console.log("No puedes salirte");
  }else{
    playerPosition.x += elementsSize;
    startGame();
  }
}
function moveLeft (){
  if((playerPosition.x - elementsSize) < elementsSize){
    console.log("No puedes salirte");
  }else{
    playerPosition.x -= elementsSize;
    startGame();
  }
  
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



