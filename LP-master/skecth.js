var dama1 = []; // cria um array para cada jogador
var dama2 = [];
var canvas;
var update = false;
var index = 0;
var player;
var origin;

function preload() {
  //tabuleiro = loadImage("images/tabuleiro.png");
  //damaBranca = loadImage("images/damapreta.png");
}

function setup() {
  canvas = createCanvas(601, 601); //Cria um tela 600x600
  canvas.mouseClicked(clicou);
  drawBoard(); //Chama a funcao que vai desenhar o tabuleiro
  for (var i = 0; i < 12; i++) {
    dama1[i] = new Dama(true);
    dama2[i] = new Dama(false);
    dama1[i].begin(i);
    dama2[i].begin(i);
  }




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
  if (!update) { //Verifica se o clique eh para selecionar ou para soltar a peca

    var mouseVector = createVector(mouseX, mouseY);
    var dist = Infinity;

    for (var i = 0; i < 24; i++) {
      if (i < 12) { //Procura a peca mais proximas entre as pecas de cima
        var d = p5.Vector.dist(dama1[i].position, mouseVector);
        if (d < dist) {
          dist = d;
          index = i;
          player = 1;
        }
      } else { //Procura a peca mais proximas entre as pecas de baixo

        var d2 = p5.Vector.dist(dama2[i - 12].position, mouseVector);
        if (d2 < dist) {
          dist = d2;
          index = i - 12;
          player = 2;
        }
      }
    }
    if (player == 1) {
      origin = createVector(dama1[index].position.x, dama1[index].position.y);
    } else {
      origin = createVector(dama2[index].position.x, dama2[index].position.y);
    }
    console.log(origin);
    update = true; //Informa que o proximo clique vai ser para soltar

  } else { //Se o clique for para soltar a peca

    update = false; //Informa que o proximo clique vai ser para selecionar

    var casa; // Vetor que vai guardar a linha e a coluna da casa que a peca pertence
    var distMin = Infinity;
    var finalPos; // Vetor que vai guardar as coordenadas da peca
    var k = 0; //garante que somente as casas pretas sejam verificadas

    for (var j = 0; j < 8; j += 1) { //Percorre todas as linhas
      for (var i = k; i < 8; i += 2) { //Percorre todas as casas pretas

        centro = createVector(i * 75 + 37.5, j * 75 + 37.5); // vetor das coordenadas do centro da casa que esta sendo verificada
        var posPeca;
        if (player == 1) {
          posPeca = dama1[index].position;
        } else {
          posPeca = dama2[index].position;
        }
        var d = p5.Vector.dist(centro, posPeca);
        if (d < distMin) { // procura a menor distancia entre a posicao da peca e o centro de uma casa
          finalPos = centro;
          casa = createVector(i, j);
          distMin = d;
        }
      }
      if (j % 2 == 0) {
        k = 1;
      } else {
        k = 0;
      }
    }
    if (player == 1) { // Move a peca para o centro da casa mais proxima
      if (!casaOcupada(casa, 1)) {
        dama1[index].position = finalPos;
        dama1[index].casa = casa;
        console.log("CASA: ", casa.x, casa.y);
      } else {
        dama1[index].position = origin;
      }
    } else if (player == 2) {
      if (!casaOcupada(casa, 2)) {
        dama2[index].position = finalPos;
        dama2[index].casa = casa;
        console.log("CASA: ", casa.x, casa.y);
      } else {
        dama2[index].position = origin;
      }
    } else {
      console.log("Casa OCUPADA!!");
    }
  }
}

function casaOcupada(casa, play) {
  var ocupada = false;
  for (var i = 0; i < 12; i++) {
    console.log(casa, dama1[i].casa);
    if (dama1[i].casa.equals(casa) || dama2[i].casa.equals(casa)) {
      ocupada = true;

    }
  }
  return ocupada;

}
