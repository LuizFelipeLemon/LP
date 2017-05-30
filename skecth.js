var dama1 = []; // cria um array para cada jogador
var dama2 = [];
var canvas;
var update = false;
var index = 0;
var player;
var origin;
var tabuleiro = new Array(8); // matriz para mapeamento do tabuleiro

function preload() {
  //tabuleiro = loadImage("images/tabuleiro.png");
  //damaBranca = loadImage("images/damapreta.png");
}

function setup() {

  canvas = createCanvas(601, 601); //Cria um tela 600x600
  canvas.mouseClicked(clicou);
  drawBoard(); //Chama a funcao que vai desenhar o tabuleiro
  /*
    ___________________________________
    | 0 --> casa preta                 |
    | 1 --> casa Branca                |
    | 2 -- > peça vermelha             |
    | 3 -- > peça brnca                |
    |__________________________________|
  */

  for (var i = 0; i < 8; i++) { //Preenche a matriz com casas pretas e brancas
    tabuleiro[i] = new Array(8);
    var k = 0;
    for (var j = 0; j < 8; j++) {
      if ((i + j) % 2 == 0) {
        tabuleiro[i][j] = 0;
      } else {
        tabuleiro[i][j] = 1;
      }
    }

  }
  console.log(tabuleiro);

  for (var i = 0; i < 12; i++) {
    dama1[i] = new Dama(true);
    dama2[i] = new Dama(false);
    dama1[i].begin(i, tabuleiro);
    dama2[i].begin(i, tabuleiro);
  }
  //console.log(tabuleiro);
}


function draw() {
  drawBoard(); //Mostra o tabuleiro

  for (var i = 0; i < 12; i++) { //Mostra as pecas
    dama1[i].update();
    dama2[i].update();
    ///console.log("entreiaslf");
  }
  if (update) { //atualiza as posicoes da peca
    mouse = createVector(mouseX, mouseY);
    if (player == 1) {
      dama1[index].position = mouse;
      //console.log(mouse);
    } else {
      dama2[index].position = mouse;
      //console.log(mouse);
    }
  }

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

function clicou() { //Quando o mouse for clicado, procura pela peca mais proxima da posicao do mouse
  var mouseVector = createVector(parseInt(mouseX / 75), parseInt(mouseY / 75));
  if (!update && casaOcupada(mouseVector) != -1) { //Verifica se o clique eh para selecionar ou para soltar a peca e se a casa clicada possui uma peca
    console.log("Selected");

    index = casaOcupada(mouseVector);

    if (player == 1) {
      origin = createVector(dama1[index].casa.x, dama1[index].casa.y);
    } else {
      origin = createVector(dama2[index].casa.x, dama2[index].casa.y);
    }
    console.log("ORIGIN", origin);
    update = true; //Informa que o proximo clique vai ser para soltar

  } else if (update) { //Se o clique for para soltar a peca
    //Aqui estao as condi´çoes pra verificar se o movimento foi válido

    update = false; //Informa que o proximo clique vai ser para selecionar

    var casaMouse = createVector(parseInt(mouseX / 75), parseInt(mouseY / 75)); // casa que se deseja mover
    var movimento = p5.Vector.sub(origin, casaMouse); // Cria um vetor com a informacao do movimento
    console.log(tabuleiro[casaMouse.x][casaMouse.y]);

    if (tabuleiro[casaMouse.x][casaMouse.y] == 1) { // verifica se eh uma casa branca
      console.log("NÂO PODE FICAR PQ È CASA BRANCA", casaMouse, tabuleiro[casaMouse.x][casaMouse.y]);
      if (player == 1) {
        dama1[index].move(origin);
      } else {
        dama2[index].move(origin);
      }
    } else if (tabuleiro[casaMouse.x][casaMouse.y] == 2 || tabuleiro[casaMouse.x][casaMouse.y] == 3) { // verifica se tem a casa ja esta ocupada
      console.log("Casa ocupada ou eh sua origem", casaMouse, tabuleiro[casaMouse.x][casaMouse.y]);
      if (player == 1) {
        dama1[index].move(origin);
      } else {
        dama2[index].move(origin);
      }
    } else if (movimento.y > 0 && player == 1) { // Se uma peca vermelha andou para tras
      console.log("Andou pra tras");
      if (player == 1) {
        dama1[index].move(origin);
      } else {
        dama2[index].move(origin);
      }


    } else if (movimento.y < 0 && player == 2) { // Se uyma peca branca andou para tras
      console.log("Andou pra tras");
      if (player == 1) {
        dama1[index].move(origin);
      } else {
        dama2[index].move(origin);
      }


    } else if (tabuleiro[casaMouse.x][casaMouse.y] == 0 && movimento.mag() > sqrt(2)) { // Se andou mais que uma casa mas foi pra uma casa vazia
      console.log("Será que comeu", casaMouse, origin);
      if (player == 1) {
        dama1[index].move(casaMouse, tabuleiro);
      } else {
        dama2[index].move(casaMouse, tabuleiro);
      }

      if (eaiComeu(casaMouse, origin)) {
        console.log("Comeu MSM", casaMouse);

      }


    } else if (tabuleiro[casaMouse.x][casaMouse.y] == 0 && movimento.mag() == sqrt(2)) { // Se moveu apenas uma casa para uma casa vazia
      console.log("PODE FICAR");
      if (player == 1) {
        dama1[index].move(casaMouse, tabuleiro);
      } else {
        dama2[index].move(casaMouse, tabuleiro);
      }
    }

  }
}

function casaOcupada(casa) {
  var indexOcupado = -1;
  for (var i = 0; i < 12; i++) {
    if (dama1[i].casa.equals(casa)) {
      indexOcupado = i;
      player = 1;
    } else if (dama2[i].casa.equals(casa)) {
      indexOcupado = i;
      player = 2;
    }
  }
  return indexOcupado;
}

function eaiComeu(casaMouse, origin) {
  console.log(tabuleiro, casaMouse);
  if (tabuleiro[casaMouse.x + 2][casaMouse.y - 2] == 0 && tabuleiro[casaMouse.x + 1][casaMouse.y - 1] == 3) {
    return true;
  } else if (tabuleiro[casaMouse.x - 2][casaMouse.y - 2] == 0) {

  } else if (tabuleiro[casaMouse.x - 2][casaMouse.y + 2] == 0) {

  } else if (tabuleiro[casaMouse.x + 2][casaMouse.y + 2] == 0) {

  }
  return false;
}
