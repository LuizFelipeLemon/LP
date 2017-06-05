var dama1 = []; // cria um array para cada jogador
var dama2 = [];
var canvas;
var update = false;
var index = 0;
var player = true;
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
  //console.log(dama1.length);
  for (var i = dama1.length - 1; i >= 0; i--) { //Mostra as pecas
    dama1[i].update();

    ///console.log("entreiaslf");
  }
  for (var i = dama2.length - 1; i >= 0; i--) { //Mostra as pecas
    dama2[i].update();

    ///console.log("entreiaslf");
  }
  if (update) { //atualiza as posicoes da peca
    mouse = createVector(mouseX, mouseY);
    if (player) {
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

  if (!update && casaOcupada(mouseVector, player) != -1) { //Verifica se o clique eh para selecionar ou para soltar a peca e se a casa clicada possui uma peca
    console.log("Selected");

    index = casaOcupada(mouseVector, player);

    if (player) {
      origin = createVector(dama1[index].casa.x, dama1[index].casa.y);
    } else {
      origin = createVector(dama2[index].casa.x, dama2[index].casa.y);
    }
    console.log("ORIGIN", origin);
    update = true; //Informa que o proximo clique vai ser para soltar

  } else if (update) { //Se o clique for para soltar a peca
    // TODO: evitar andar mais de 3 casas
    //Aqui estao as condi´çoes pra verificar se o movimento foi válido

    update = false; //Informa que o proximo clique vai ser para selecionar

    var casaMouse = createVector(parseInt(mouseX / 75), parseInt(mouseY / 75)); // casa que se deseja mover
    var movimento = p5.Vector.sub(casaMouse, origin); // Cria um vetor com a informacao do movimento
    console.log(movimento);

    if (tabuleiro[casaMouse.x][casaMouse.y] == 1) { // verifica se eh uma casa branca
      console.log("NÂO PODE FICAR PQ È CASA BRANCA", casaMouse, tabuleiro[casaMouse.x][casaMouse.y]);
      if (player) {
        dama1[index].move(origin);
      } else {
        dama2[index].move(origin);
      }
      player = !player;

    } else if (tabuleiro[casaMouse.x][casaMouse.y] == 2 || tabuleiro[casaMouse.x][casaMouse.y] == 3) { // verifica se a casa ja esta ocupada
      console.log("Casa ocupada ou eh sua origem", casaMouse, tabuleiro[casaMouse.x][casaMouse.y]);
      if (player) {
        dama1[index].move(origin);
      } else {
        dama2[index].move(origin);
      }
      player = !player;

    } else if (movimento.y == -1 && player) { // Se uma peca vermelha andou para tras
      console.log("Andou pra tras");
      dama1[index].move(origin);
      player = !player;

    } else if (movimento.y == 1 && !player) { // Se uma peca branca andou para tras
      console.log("Andou pra tras");
      dama2[index].move(origin);
      player = !player;

    } else if (movimento.y == 2) { // Se andou duas linhas para baixo

      console.log("Verificação da captura simples", casaMouse, origin);
      if (movimento.x == -2) { // Se andou duas colunas para a esquerda
        if (player) { // Se foi uma pecça vermelha que realizou este movimento
          if (tabuleiro[origin.x - 1][origin.y + 1] == 3) { // Se na casa que foi pulada havia uma peça inimiga
            console.log("Comeu legal");
            dama1[index].move(casaMouse, tabuleiro); //move a peca
            var removeIndex = casaOcupada(origin.sub(1, -1), false);
            dama2.splice(removeIndex, 1); // remove a peca capturada do array
            tabuleiro[origin.x][origin.y] = 0; // remove a peca do tabuleiro
          } else {
            console.log("Não Comeu legal");
            dama1[index].move(origin);
            player = !player;
          }
        } else { // Se foi uma peça branca que realizou este movimento
          if (tabuleiro[origin.x - 1][origin.y + 1] == 2) { // Se na casa que foi pulada havia uma peça inimiga
            console.log("Comeu legal");
            dama2[index].move(casaMouse, tabuleiro); //move a peca
            var removeIndex = casaOcupada(origin.sub(1, -1), true);
            dama1.splice(removeIndex, 1); // remove a peca capturada do array
            tabuleiro[origin.x][origin.y] = 0; // remove a peca do tabuleiro
          } else {
            console.log("Não Comeu legal");
            dama2[index].move(origin);
            player = !player;
          }
        }
      } else if (movimento.x == 2) { // Se andou duas colunas para a direita
        if (player) { // Se foi uma peça vermelha que realizou este movimento
          if (tabuleiro[origin.x + 1][origin.y + 1] == 3) {
            console.log("Comeu legal");
            dama1[index].move(casaMouse, tabuleiro); //move a peca
            var removeIndex = casaOcupada(origin.sub(-1, -1), false);
            dama2.splice(removeIndex, 1); // remove a peca capturada do array
            tabuleiro[origin.x][origin.y] = 0; // remove a peca do tabuleiro
          } else {
            console.log("Não Comeu legal");
            dama1[index].move(origin);
            player = !player;
          }
        } else { // Se foi uma peça branca que realizou este movimento
          if (tabuleiro[origin.x + 1][origin.y + 1] == 2) {
            console.log("Comeu legal");
            dama2[index].move(casaMouse, tabuleiro); //move a peca
            var removeIndex = casaOcupada(origin.sub(-1, -1), true);
            dama1.splice(removeIndex, 1); // remove a peca capturada do array
            tabuleiro[origin.x][origin.y] = 0; // remove a peca do tabuleiro
          } else {
            console.log("Não Comeu legal");
            dama2[index].move(origin);
            player = !player;
          }
        }

      }
    } else if (movimento.y == -2) { // Se andou duas linhas para cima
      console.log("Verificação da captura simples", casaMouse, origin);
      if (movimento.x == -2) {
        if (player) { // Se foi uma peça vermelha que realizou este movimento
          if (tabuleiro[origin.x - 1][origin.y - 1] == 3) {
            console.log("Comeu legal");
            dama1[index].move(casaMouse, tabuleiro); //move a peca
            var removeIndex = casaOcupada(origin.sub(1, 1), false);
            dama2.splice(removeIndex, 1); // remove a peca capturada do array
            tabuleiro[origin.x][origin.y] = 0; // remove a peca do tabuleiro
          } else {
            console.log("Não Comeu legal");
            dama1[index].move(origin);
            player = !player;
          }
        } else { // Se foi uma peça vermelha que realizou este movimento
          if (tabuleiro[origin.x - 1][origin.y - 1] == 2) {
            console.log("Comeu legal");
            dama2[index].move(casaMouse, tabuleiro); //move a peca
            var removeIndex = casaOcupada(origin.sub(1, 1), true);
            dama1.splice(removeIndex, 1); // remove a peca capturada do array
            tabuleiro[origin.x][origin.y] = 0; // remove a peca do tabuleiro
          } else {
            console.log("Não Comeu legal");
            dama2[index].move(origin);
            player = !player;
          }
        }
      } else if (movimento.x == 2) {
        if (player) { // Se foi uma peça vermelha que realizou este movimento
          if (tabuleiro[origin.x + 1][origin.y - 1] == 3) {
            console.log("Comeu legal");
            dama1[index].move(casaMouse, tabuleiro); //move a peca
            var removeIndex = casaOcupada(origin.sub(-1, 1), false);
            dama2.splice(removeIndex, 1); // remove a peca capturada do array
            tabuleiro[origin.x][origin.y] = 0; // remove a peca do tabuleiro
          } else {
            console.log("Não Comeu legal");
            dama1[index].move(origin);
            player = !player;
          }
        } else { // Se foi uma peça branca que realizou este movimento
          if (tabuleiro[origin.x + 1][origin.y - 1] == 2) {
            console.log("Comeu legal");
            dama2[index].move(casaMouse, tabuleiro); //move a peca
            var removeIndex = casaOcupada(origin.sub(-1, 1), true);
            dama1.splice(removeIndex, 1); // remove a peca capturada do array
            tabuleiro[origin.x][origin.y] = 0; // remove a peca do tabuleiro
          } else {
            console.log("Não Comeu legal");
            dama2[index].move(origin);
            player = !player;
          }
        }

      }
    } else if (tabuleiro[casaMouse.x][casaMouse.y] == 0 && movimento.mag() == sqrt(2)) { // Se moveu apenas uma casa e para uma casa vazia
      console.log("PODE FICAR");
      if (player) {
        dama1[index].move(casaMouse, tabuleiro);
      } else {
        dama2[index].move(casaMouse, tabuleiro);
      }
    }
    player = !player;
  }
}

function casaOcupada(casa, play) {
  var indexOcupado = -1;
  //console.log("Casa Ocupada", casa);
  if (play) {
    for (var i = dama1.length - 1; i >= 0; i--) {
      if (dama1[i].casa.equals(casa)) {
        indexOcupado = i;
      }
    }
  } else {
    for (var i = dama2.length - 1; i >= 0; i--) {
      if (dama2[i].casa.equals(casa)) {
        indexOcupado = i;
      }
    }
  }
  return indexOcupado;
}
return indexOcupado;
}
