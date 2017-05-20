var tabuleiro;
var damaBranca;
var damaPreta;
var posBranca = createVector(0, 0);
var posPreta = createVector(0, 0);

posPreta[1] // 2

function preload() {
  tabuleiro = loadImage("tabuleiro.jpg");
  for (i = 0; i < 12; i++) {
    damaBranca = loadImage("damaBranca.png");
    damaPreta = loadImage("damaPreta.png");

  }
}

function setPosition(cor, numero, positionX, positionY) {
  if (cor)
    image(damaBranca[numero], positionX, positionY);

  else
    image(damaPreta[numero], positionX, positionY);

}

function startGame() {
  umNaoUmSim = true;
  xBranca = 81;
  yBranca = 25;

  xPreta = 25;
  yPreta = 305;


  for (i = 0; i < 12; i++) {

    setPosition(1, i, xBranca, yBranca);
    setPosition(0, i, xPreta, yPreta);


    xBranca += 112;
    xPreta += 112;

    if (i + 1 % 4 == 0) {
      yPreta += 56;
      yBranca += 56;

      if (umNaoUMSim) {
        xBranca = 25;
        xPreta = 81;
        umNaoUmSim = false;
      } else {
        xBranca = 81;
        xPreta = 25;
        umNaoUmSim = true;
      }
    }
  }


}





function setup() {
  createCanvas(500, 500);
  image(tabuleiro, 0, 0);
  startGame();

}

function draw() {
  //x = 25; posX de baixo 305 posY 305
  // x =112;


}
