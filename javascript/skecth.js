var dama1 = []; // cria um array para cada jogador
var dama2 = [];



function preload() {
  //tabuleiro = loadImage("images/tabuleiro.png");
  //damaBranca = loadImage("images/damapreta.png");
}

function setup() {
  createCanvas(1700, 1700); //Cria um tela 600x600
  drawBoard(); //Chama a funcao que vai desenhar o tabuleiro
  for (var i = 0; i < 12; i++) {
    dama1[i] = new Dama(true);
    dama2[i] = new Dama(false);
    dama1[i].show(i);
    dama2[i].show(i);
  }




}


function draw() {
  //x = 25; posX de baixo 305 posY 305
  // x =112;


}

function drawBoard() { //Desenha o tabuleiro

  var white = false;

  for (var y = 0; y < 8; y++) { // linhas
    for (var x = 0; x < 8; x++) { //colunas
      if (white) {
        fill(243, 233, 186);
      } else {
        fill(0);
      }
      rect(75 * x, 75 * y, 75, 75); //Desenha a casa
      white = !white; // Alterna entre casas pretas e brancas
    }
    white = !white; // Alterna novamente para cada linha
  }
}
