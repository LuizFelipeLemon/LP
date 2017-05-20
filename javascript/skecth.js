var tabuleiro;
var damaBranca;
var damaPreta;
//var posBranca = createVector();
//var posPreta = createVector();

var posPreta = []; // 2

function preload() {
  tabuleiro = loadImage("images/tabuleiro.png");
  for (i = 0; i < 12; i++) {
    damaBranca = loadImage("images/damapreta.png");
    //damaPreta = loadImage("images/damapreta.png");

  }
}

function setup() {
  createCanvas(500, 500);
  image(tabuleiro, 0, 0);


}

function draw() {
  //x = 25; posX de baixo 305 posY 305
  // x =112;


}
