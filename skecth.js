var dama1 = []; // cria um array para cada jogador
var dama2 = [];
var canvas;
var update = false;
var index = 0;
var player = true;
var origin;
var tabuleiro = new Array(8); // matriz para mapeamento do tabuleiro
var estado = 0;

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
  //Mostra o tabuleiro
  //background(0);
  //console.log(dama1.length);
  if (estado == 0) {
    menu();
  } else if (estado == 1) {
    drawBoard();
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
    } /////////////////////////////// Jogo Player vc Player\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  } else if (estado == 3) {
    fimDeJogo();
  }else if(estado == 2){
    drawBoard();
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
      
        dama2[index].position = mouse;
        
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
  if (estado == 0) {
    if (mouseX >= 50 && mouseX <= 200 && mouseY >= 200 && mouseY <= 275) {
      estado++;
    } else if (mouseX >= 230 && mouseX <= 380 && mouseY >= 200 && mouseY <= 275) {
      close();
    } else if (mouseX >= 400 && mouseX <= 550 && mouseY >= 200 && mouseY <= 275) {
      estado = 2;
    }
  } else if (estado == 1) {

      var casaMouse = createVector(parseInt(mouseX / 75), parseInt(mouseY / 75)); // Casa respectiva do mouse
      console.log(update);
      if (!update && casaOcupada(casaMouse, player) != -1) { //Verifica se o clique eh para selecionar ou para soltar a peca e se a casa clicada possui uma peca
        console.log("Selected");

        index = casaOcupada(casaMouse, player);

        if (player) {
          origin = createVector(dama1[index].casa.x, dama1[index].casa.y);
        } else {
          origin = createVector(dama2[index].casa.x, dama2[index].casa.y);
        }
        console.log("ORIGIN", origin);
        update = true; //Informa que o proximo clique vai ser para soltar

      } else if (update) { //Se o clique for para soltar a peca
          verifica(casaMouse);
        }         
  } else if (estado == 3) { // Tela de fim de Jogo
    if (mouseX >= 360 && mouseX <= 510 && mouseY >= 200 && mouseY <= 275) {
      estado = 0;
    } else if (mouseX >= 85 && mouseX <= 235 && mouseY >= 200 && mouseY <= 275) {
      close();
    }
  } else if (estado == 2) { // Jogo Player vc PC
    player = false;
    var computer = new Computer();
    var casaMouse = createVector(parseInt(mouseX / 75), parseInt(mouseY / 75)); // Casa respectiva do mouse
      //console.log(casaOcupada(casaMouse, false));
      if (!update && casaOcupada(casaMouse, false) != -1) { //Verifica se o clique eh para selecionar ou para soltar a peca e se a casa clicada possui uma peca
        console.log("Selected");

        index = casaOcupada(casaMouse, false);

        
        origin = createVector(dama2[index].casa.x, dama2[index].casa.y);
    
        console.log("ORIGIN", origin);
        update = true; //Informa que o proximo clique vai ser para soltar

      } else if (update) { //Se o clique for para soltar a peca
          console.log(player);
          verifica(casaMouse);
          console.log(player);
          while(!verifica(computer.play()));
          
        }

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

function menu() {
  background(0, 0, 0);
  textSize(120); // tamanho do texto "Damas"
  fill(255, 255, 0); // cor nome "Damas"
  text("Damas", 100, height / 2 - 150); // texto do nome "Damas"
  fill(255, 0, 0); // cor do quadrado de player vs player
  rect(width / 2 + 100, height / 2 - 100, 150, 75); // quadrado do player vs player
  textSize(40); // tamanho do texto player vs player
  fill(255, 255, 255); //cor do nome player vs player
  text("Pvp", width / 2 + 140, height / 2 - 50); // nome player vs player
  fill(255, 0, 0); // cor do quadrado de player vs pc
  rect(width / 2 - 250, height / 2 - 100, 150, 75); // quadrado de player vs pc
  textSize(40); // tamanho do texto de player vs pc
  fill(255, 255, 255); // cor do texto de player vs pc
  text("Pvc", width / 2 - 210, height / 2 - 50); // texto de player vs pc
  fill(255, 0, 0); // cor do quadrado de sair
  rect(width / 2 - 70, height / 2 - 100, 150, 75); // Retângulo de sair
  textSize(40); // tamanho do texto sair
  fill(255, 255, 255); // cor do nome sair
  text("Sair", width / 2 - 30, height / 2 - 50); // texto para sair
}

function fimDeJogo() {
  background(0, 0, 0);
  textSize(80); // tamanho do texto de fim de jogo
  fill(255, 255, 0); // nome fim de jogo
  text("Fim de jogo", 70, height / 2 - 150); // texto do fim de jogo
  fill(255, 0, 0); // cor do quadrado do menu inicial
  rect(width / 2 + 60, height / 2 - 100, 150, 75); // quadrado do menu inicial
  textSize(40); // tamanho do texto menu inicial
  fill(255, 255, 255); //cor do nome menu inicial
  text("Menu", width / 2 + 80, height / 2 - 50); // nome menu inicial
  fill(255, 0, 0); // cor do quadrado de sair
  rect(width / 2 - 215, height / 2 - 100, 150, 75); // quadrado de sair
  textSize(40); // tamanho do texto de sair
  fill(255, 255, 255); // cor do texto de sair
  text("Sair", width / 2 - 177, height / 2 - 50); // texto de sair
}

function verifica(casaMouse){
  //Aqui estao as condi´çoes pra verificar se o movimento foi válido

      update = false; //Informa que o proximo clique vai ser para selecionar
      var movimento = p5.Vector.sub(casaMouse, origin); // Cria um vetor com a informacao do movimento
      if (movimento.y == 2) { // Se andou duas linhas para baixo

        console.log("Verificação da captura simples");
        if (movimento.x == -2) { // Se andou duas colunas para a esquerda
          if (player) { // Se foi uma pecça vermelha que realizou este movimento
            if (tabuleiro[origin.x - 1][origin.y + 1] == 3) { // Se na casa que foi pulada havia uma peça inimiga
              console.log("Comeu legal");
              dama1[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(origin.sub(1, -1), false);
              dama2.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[origin.x][origin.y] = 0; // remove a peca capturada do tabuleiro
            } else {
              console.log("Não Comeu legal");
              dama1[index].move(origin);
              //player = !player;
              return false;
            }
          } else { // Se foi uma peça branca que realizou este movimento
            if (tabuleiro[origin.x - 1][origin.y + 1] == 2) { // Se na casa que foi pulada havia uma peça inimiga
              console.log("Comeu legal");
              dama2[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(origin.sub(1, -1), true);
              dama1.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[origin.x][origin.y] = 0; // remove a peca capturada do tabuleiro
            } else {
              console.log("Não Comeu legal");
              dama2[index].move(origin);
              //player = !player;
              return false;
            }
          }
        } else if (movimento.x == 2) { // Se andou duas colunas para a direita
          if (player) { // Se foi uma peça vermelha que realizou este movimento
            if (tabuleiro[origin.x + 1][origin.y + 1] == 3) {
              console.log("Comeu legal");
              dama1[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(origin.sub(-1, -1), false);
              dama2.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[origin.x][origin.y] = 0; // remove a peca capturada do tabuleiro
            } else {
              console.log("Não Comeu legal");
              dama1[index].move(origin);
              //player = !player;
              return false;
            }
          } else { // Se foi uma peça branca que realizou este movimento
            if (tabuleiro[origin.x + 1][origin.y + 1] == 2) {
              console.log("Comeu legal");
              dama2[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(origin.sub(-1, -1), true);
              dama1.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[origin.x][origin.y] = 0; // remove a peca capturada do tabuleiro
            } else {
              console.log("Não Comeu legal");
              dama2[index].move(origin);
              //player = !player;
              return false;
            }
          }
        } else {
          console.log("Movimento invalido, voltei para a origem");
          if (player) {
            dama1[index].move(origin);
          } else {
            dama2[index].move(origin);
          }
          //player = !player;
          return false;
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
              tabuleiro[origin.x][origin.y] = 0; // remove a peca capturada do tabuleiro
            } else {
              console.log("Não Comeu legal");
              dama1[index].move(origin);
              //player = !player;
              return false;
            }
          } else { // Se foi uma peça vermelha que realizou este movimento
            if (tabuleiro[origin.x - 1][origin.y - 1] == 2) {
              console.log("Comeu legal");
              dama2[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(origin.sub(1, 1), true);
              dama1.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[origin.x][origin.y] = 0; // remove a peca capturada do tabuleiro
            } else {
              console.log("Não Comeu legal");
              dama2[index].move(origin);
              //player = !player;
              return false;
            }
          }
        } else if (movimento.x == 2) {
          if (player) { // Se foi uma peça vermelha que realizou este movimento
            if (tabuleiro[origin.x + 1][origin.y - 1] == 3) {
              console.log("Comeu legal");
              dama1[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(origin.sub(-1, 1), false);
              dama2.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[origin.x][origin.y] = 0; // remove a peca capturada do tabuleiro
            } else {
              console.log("Não Comeu legal");
              dama1[index].move(origin);
              //player = !player;
              return false;
            }
          } else { // Se foi uma peça branca que realizou este movimento
            if (tabuleiro[origin.x + 1][origin.y - 1] == 2) {
              console.log("Comeu legal");
              dama2[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(origin.sub(-1, 1), true);
              dama1.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[origin.x][origin.y] = 0; // remove a peca capturada do tabuleiro
            } else {
              console.log("Não Comeu legal");
              dama2[index].move(origin);
              //player = !player;
              return false;
            }
          }
        } else {
          console.log("Movimento invalido, voltei para a origem");
          if (player) {
            dama1[index].move(origin);
          } else {
            dama2[index].move(origin);
          }
          //player = !player;
          return false;
        }
      } else if (tabuleiro[casaMouse.x][casaMouse.y] == 0 && movimento.mag() == sqrt(2)) { // Se moveu apenas uma casa e para uma casa vazia
        console.log("Movimento Simples");
        if (player) {
          dama1[index].move(casaMouse, tabuleiro);
        } else {
          dama2[index].move(casaMouse, tabuleiro);
        }
      } else if (movimento.y == 4) {

        if (movimento.x == 0) {

          if (player) {

            if (tabuleiro[casaMouse.x + 1][casaMouse.y - 1] == 3 && tabuleiro[casaMouse.x + 2][casaMouse.y - 2] == 0 && tabuleiro[casaMouse.x + 1][casaMouse.y - 3] == 3) {
              
              console.log("Comeu legal");
              dama1[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(createVector(casaMouse.x + 1,casaMouse.y-1), false);
              dama2.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x+1][casaMouse.y-1] = 0; // remove a peca capturada do tabuleiro
              removeIndex = casaOcupada(createVector(casaMouse.x+1,casaMouse.y - 3), false);
              dama2.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x+1][casaMouse.y-3] = 0; // remove a peca capturada do tabuleiro
            
            } else if (tabuleiro[casaMouse.x - 1][casaMouse.y - 1] == 3 && tabuleiro[casaMouse.x - 2][casaMouse.y - 2] == 0 && tabuleiro[casaMouse.x - 1][casaMouse.y - 3] == 3) {
              
              console.log("Comeu legal");
              dama1[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(createVector(casaMouse.x - 1,casaMouse.y - 1), false);
              dama2.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x-1][casaMouse.y-1] = 0; // remove a peca capturada do tabuleiro              
              removeIndex = casaOcupada(createVector(casaMouse.x - 1,casaMouse.y-3), false);
              dama2.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x-1][casaMouse.y-3] = 0; // remove a peca capturada do tabuleiro
            
            } else {
              console.log("Movimento invalido, voltei para a origem");
              dama1[index].move(origin);
              //player = !player;
              return false;
            }
          } else {

            if (tabuleiro[casaMouse.x + 1][casaMouse.y - 1] == 2 && tabuleiro[casaMouse.x + 2][casaMouse.y - 2] == 0 && tabuleiro[casaMouse.x + 1][casaMouse.y - 3] == 2) {
              
              console.log("Comeu legal");
              dama2[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(createVector(casaMouse.x + 1,casaMouse.y-1), true);
              dama1.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x+1][casaMouse.y-1] = 0; // remove a peca capturada do tabuleiro             
              removeIndex = casaOcupada(createVector(casaMouse.x+1,casaMouse.y - 3), true);
              dama1.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x+1][casaMouse.y-3] = 0; // remove a peca capturada do tabuleiro
            
            } else if (tabuleiro[casaMouse.x - 1][casaMouse.y - 1] == 2 && tabuleiro[casaMouse.x - 2][casaMouse.y - 2] == 0 && tabuleiro[casaMouse.x - 1][casaMouse.y - 3] == 2) {
              
              console.log("Comeu legal");
              dama2[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(createVector(casaMouse.x - 1,casaMouse.y - 1), true);
              dama1.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x-1][casaMouse.y-1] = 0; // remove a peca capturada do tabuleiro              
              removeIndex = casaOcupada(createVector(casaMouse.x - 1,casaMouse.y-3), true);
              dama1.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x-1][casaMouse.y-3] = 0; // remove a peca capturada do tabuleiro
            
            } else {
              console.log("Movimento invalido, voltei para a origem");
              dama2[index].move(origin);
              //player = !player;
              return false;
            }
          }
        } else if (movimento.x == 4) {

          if (player) {

            if (tabuleiro[casaMouse.x - 1][casaMouse.y - 1] == 3 && tabuleiro[casaMouse.x -2 ][casaMouse.y - 2] == 0 && tabuleiro[casaMouse.x -3 ][casaMouse.y - 3] == 3) {
              
              console.log("Comeu legal");
              dama1[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(createVector(casaMouse.x - 1,casaMouse.y-1), false);
              dama2.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x-1][casaMouse.y-1] = 0; // remove a peca capturada do tabuleiro
              removeIndex = casaOcupada(createVector(casaMouse.x-3,casaMouse.y - 3), false);
              dama2.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x-3][casaMouse.y-3] = 0; // remove a peca capturada do tabuleiro
            
            } else {
              console.log("Movimento invalido, voltei para a origem");
              dama1[index].move(origin);
              //player = !player;
              return false;
            }
          } else {

            if (tabuleiro[casaMouse.x - 1][casaMouse.y - 1] == 2 && tabuleiro[casaMouse.x - 2][casaMouse.y - 2] == 0 && tabuleiro[casaMouse.x -3][casaMouse.y - 3] == 2) {
              
              console.log("Comeu legal");
              dama2[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(createVector(casaMouse.x - 1,casaMouse.y-1), true);
              dama1.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x-1][casaMouse.y-1] = 0; // remove a peca capturada do tabuleiro             
              removeIndex = casaOcupada(createVector(casaMouse.x-3,casaMouse.y - 3), true);
              dama1.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x-3][casaMouse.y-3] = 0; // remove a peca capturada do tabuleiro
            
            } else {
              console.log("Movimento invalido, voltei para a origem");
              dama2[index].move(origin);
              //player = !player;
              return false;
            }

          }

        } else if (movimento.x == -4) {
          if (player) {

            if (tabuleiro[casaMouse.x + 1][casaMouse.y - 1] == 3 && tabuleiro[casaMouse.x +2 ][casaMouse.y - 2] == 0 && tabuleiro[casaMouse.x +3 ][casaMouse.y - 3] == 3) {
              
              console.log("Comeu legal");
              dama1[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(createVector(casaMouse.x + 1,casaMouse.y-1), false);
              dama2.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x+1][casaMouse.y-1] = 0; // remove a peca capturada do tabuleiro
              removeIndex = casaOcupada(createVector(casaMouse.x+3,casaMouse.y - 3), false);
              dama2.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x+3][casaMouse.y-3] = 0; // remove a peca capturada do tabuleiro
            
            } else {
              console.log("Movimento invalido, voltei para a origem");
              dama1[index].move(origin);
              //player = !player;
              return false;
            }
          } else {

            if (tabuleiro[casaMouse.x + 1][casaMouse.y - 1] == 2 && tabuleiro[casaMouse.x + 2][casaMouse.y - 2] == 0 && tabuleiro[casaMouse.x +3][casaMouse.y - 3] == 2) {
              
              console.log("Comeu legal");
              dama2[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(createVector(casaMouse.x + 1,casaMouse.y-1), true);
              dama1.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x+1][casaMouse.y-1] = 0; // remove a peca capturada do tabuleiro             
              removeIndex = casaOcupada(createVector(casaMouse.x+3,casaMouse.y - 3), true);
              dama1.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x+3][casaMouse.y-3] = 0; // remove a peca capturada do tabuleiro
            
            } else {
              console.log("Movimento invalido, voltei para a origem");
              dama2[index].move(origin);
              //player = !player;
              return false;
            }

          }

        } else {
          console.log("Movimento invalido, voltei para a origem");
          if (player) {
            dama1[index].move(origin);
          } else {
            dama2[index].move(origin);
          }
          //player = !player;
          return false;
        }
      } else if (movimento.y == -4) {
        if (movimento.x == 0) {

          if (player) {

            if (tabuleiro[casaMouse.x + 1][casaMouse.y + 1] == 3 && tabuleiro[casaMouse.x + 2][casaMouse.y + 2] == 0 && tabuleiro[casaMouse.x + 1][casaMouse.y + 3] == 3) {
              
              console.log("Comeu legal");
              dama1[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(createVector(casaMouse.x + 1,casaMouse.y+1), false);
              dama2.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x+1][casaMouse.y+1] = 0; // remove a peca capturada do tabuleiro
              removeIndex = casaOcupada(createVector(casaMouse.x+1,casaMouse.y + 3), false);
              dama2.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x+1][casaMouse.y+3] = 0; // remove a peca capturada do tabuleiro
            
            } else if (tabuleiro[casaMouse.x - 1][casaMouse.y + 1] == 3 && tabuleiro[casaMouse.x - 2][casaMouse.y + 2] == 0 && tabuleiro[casaMouse.x - 1][casaMouse.y + 3] == 3) {
              
              console.log("Comeu legal");
              dama1[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(createVector(casaMouse.x - 1,casaMouse.y + 1), false);
              dama2.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x-1][casaMouse.y+1] = 0; // remove a peca capturada do tabuleiro              
              removeIndex = casaOcupada(createVector(casaMouse.x - 1,casaMouse.y+3), false);
              dama2.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x-1][casaMouse.y+3] = 0; // remove a peca capturada do tabuleiro
            
            } else {
              console.log("Movimento invalido, voltei para a origem");
              dama1[index].move(origin);
              //player = !player;
              return false;
            }
          } else {

            if (tabuleiro[casaMouse.x + 1][casaMouse.y + 1] == 2 && tabuleiro[casaMouse.x + 2][casaMouse.y + 2] == 0 && tabuleiro[casaMouse.x + 1][casaMouse.y + 3] == 2) {
              
              console.log("Comeu legal");
              dama2[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(createVector(casaMouse.x + 1,casaMouse.y+1), true);
              dama1.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x+1][casaMouse.y+1] = 0; // remove a peca capturada do tabuleiro             
              removeIndex = casaOcupada(createVector(casaMouse.x+1,casaMouse.y + 3), true);
              dama1.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x+1][casaMouse.y+3] = 0; // remove a peca capturada do tabuleiro
            
            } else if (tabuleiro[casaMouse.x - 1][casaMouse.y + 1] == 2 && tabuleiro[casaMouse.x - 2][casaMouse.y + 2] == 0 && tabuleiro[casaMouse.x - 1][casaMouse.y + 3] == 2) {
              
              console.log("Comeu legal");
              dama2[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(createVector(casaMouse.x - 1,casaMouse.y + 1), true);
              dama1.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x-1][casaMouse.y+1] = 0; // remove a peca capturada do tabuleiro              
              removeIndex = casaOcupada(createVector(casaMouse.x - 1,casaMouse.y+3), true);
              dama1.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x-1][casaMouse.y+3] = 0; // remove a peca capturada do tabuleiro
            
            } else {
              console.log("Movimento invalido, voltei para a origem");
              dama2[index].move(origin);
              //player = !player;
              return false;
            }
          }
        } else if (movimento.x == 4) {

          if (player) {

            if (tabuleiro[casaMouse.x - 1][casaMouse.y + 1] == 3 && tabuleiro[casaMouse.x -2 ][casaMouse.y + 2] == 0 && tabuleiro[casaMouse.x -3 ][casaMouse.y + 3] == 3) {
              
              console.log("Comeu legal");
              dama1[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(createVector(casaMouse.x - 1,casaMouse.y+1), false);
              dama2.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x-1][casaMouse.y+1] = 0; // remove a peca capturada do tabuleiro
              removeIndex = casaOcupada(createVector(casaMouse.x-3,casaMouse.y + 3), false);
              dama2.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x-3][casaMouse.y+3] = 0; // remove a peca capturada do tabuleiro
            
            } else {
              console.log("Movimento invalido, voltei para a origem");
              dama1[index].move(origin);
              //player = !player;
              return false;
            }
          } else {

            if (tabuleiro[casaMouse.x - 1][casaMouse.y + 1] == 2 && tabuleiro[casaMouse.x - 2][casaMouse.y + 2] == 0 && tabuleiro[casaMouse.x -3][casaMouse.y + 3] == 2) {
              
              console.log("Comeu legal");
              dama2[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(createVector(casaMouse.x - 1,casaMouse.y+1), true);
              dama1.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x-1][casaMouse.y+1] = 0; // remove a peca capturada do tabuleiro             
              removeIndex = casaOcupada(createVector(casaMouse.x-3,casaMouse.y + 3), true);
              dama1.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x-3][casaMouse.y+3] = 0; // remove a peca capturada do tabuleiro
            
            } else {
              console.log("Movimento invalido, voltei para a origem");
              dama2[index].move(origin);
              //player = !player;
              return false;
            }

          }

        } else if (movimento.x == -4) {
          if (player) {

            if (tabuleiro[casaMouse.x + 1][casaMouse.y + 1] == 3 && tabuleiro[casaMouse.x +2 ][casaMouse.y + 2] == 0 && tabuleiro[casaMouse.x +3 ][casaMouse.y + 3] == 3) {
              
              console.log("Comeu legal");
              dama1[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(createVector(casaMouse.x + 1,casaMouse.y+1), false);
              dama2.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x+1][casaMouse.y+1] = 0; // remove a peca capturada do tabuleiro
              removeIndex = casaOcupada(createVector(casaMouse.x+3,casaMouse.y + 3), false);
              dama2.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x+3][casaMouse.y+3] = 0; // remove a peca capturada do tabuleiro
            
            } else {
              console.log("Movimento invalido, voltei para a origem");
              dama1[index].move(origin);
              //player = !player;
              return false;
            }
          } else {

            if (tabuleiro[casaMouse.x + 1][casaMouse.y + 1] == 2 && tabuleiro[casaMouse.x + 2][casaMouse.y + 2] == 0 && tabuleiro[casaMouse.x +3][casaMouse.y + 3] == 2) {
              
              console.log("Comeu legal");
              dama2[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(createVector(casaMouse.x + 1,casaMouse.y+1), true);
              dama1.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x+1][casaMouse.y+1] = 0; // remove a peca capturada do tabuleiro             
              removeIndex = casaOcupada(createVector(casaMouse.x+3,casaMouse.y + 3), true);
              dama1.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x+3][casaMouse.y+3] = 0; // remove a peca capturada do tabuleiro
            
            } else {
              console.log("Movimento invalido, voltei para a origem");
              dama2[index].move(origin);
              //player = !player;
              return false;
            }

          }

        } else {
          console.log("Movimento invalido, voltei para a origem");
          if (player) {
            dama1[index].move(origin);
          } else {
            dama2[index].move(origin);
          }
          //player = !player;
          return false;
        }
      } else if(movimento.x == -4){
        if (movimento.y == 0) {

          if (player) {

            if (tabuleiro[casaMouse.x + 1][casaMouse.y - 1] == 3 && tabuleiro[casaMouse.x + 2][casaMouse.y - 2] == 0 && tabuleiro[casaMouse.x + 3][casaMouse.y - 1] == 3) {
              
              console.log("Comeu legal");
              dama1[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(createVector(casaMouse.x + 1,casaMouse.y-1), false);
              dama2.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x+1][casaMouse.y-1] = 0; // remove a peca capturada do tabuleiro
              removeIndex = casaOcupada(createVector(casaMouse.x+3,casaMouse.y - 1), false);
              dama2.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x+3][casaMouse.y-1] = 0; // remove a peca capturada do tabuleiro
            
            } else if (tabuleiro[casaMouse.x + 1][casaMouse.y + 1] == 3 && tabuleiro[casaMouse.x + 2][casaMouse.y + 2] == 0 && tabuleiro[casaMouse.x + 3][casaMouse.y + 1] == 3) {
              
              console.log("Comeu legal");
              dama1[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(createVector(casaMouse.x + 1,casaMouse.y + 1), false);
              dama2.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x+1][casaMouse.y+1] = 0; // remove a peca capturada do tabuleiro              
              removeIndex = casaOcupada(createVector(casaMouse.x + 3,casaMouse.y+1), false);
              dama2.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x+3][casaMouse.y+1] = 0; // remove a peca capturada do tabuleiro
            
            } else {
              console.log("Movimento invalido, voltei para a origem");
              dama1[index].move(origin);
              //player = !player;
              return false;
            }
          } else {

            if (tabuleiro[casaMouse.x + 1][casaMouse.y - 1] == 2 && tabuleiro[casaMouse.x + 2][casaMouse.y - 2] == 0 && tabuleiro[casaMouse.x + 3][casaMouse.y - 1] == 2) {
              
              console.log("Comeu legal");
              dama2[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(createVector(casaMouse.x + 1,casaMouse.y-1), true);
              dama1.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x+1][casaMouse.y-1] = 0; // remove a peca capturada do tabuleiro             
              removeIndex = casaOcupada(createVector(casaMouse.x+3,casaMouse.y - 1), true);
              dama1.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x+3][casaMouse.y-1] = 0; // remove a peca capturada do tabuleiro
            
            } else if (tabuleiro[casaMouse.x + 1][casaMouse.y + 1] == 2 && tabuleiro[casaMouse.x + 2][casaMouse.y + 2] == 0 && tabuleiro[casaMouse.x + 3][casaMouse.y +1] == 2) {
              
              console.log("Comeu legal");
              dama2[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(createVector(casaMouse.x + 1,casaMouse.y + 1), true);
              dama1.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x+1][casaMouse.y+1] = 0; // remove a peca capturada do tabuleiro              
              removeIndex = casaOcupada(createVector(casaMouse.x + 3,casaMouse.y+1), true);
              dama1.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x+3][casaMouse.y+1] = 0; // remove a peca capturada do tabuleiro
            
            } else {
              console.log("Movimento invalido, voltei para a origem");
              dama2[index].move(origin);
              //player = !player;
              return false;
            }
          }
        }else {
          console.log("Movimento invalido, voltei para a origem");
          if (player) {
            dama1[index].move(origin);
          } else {
            dama2[index].move(origin);
          }
          //player = !player;
          return false;
        }

      } else if(movimento.x == 4){
        if (movimento.y == 0) {

          if (player) {

            if (tabuleiro[casaMouse.x - 1][casaMouse.y - 1] == 3 && tabuleiro[casaMouse.x - 2][casaMouse.y - 2] == 0 && tabuleiro[casaMouse.x - 3][casaMouse.y - 1] == 3) {
              
              console.log("Comeu legal");
              dama1[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(createVector(casaMouse.x - 1,casaMouse.y-1), false);
              dama2.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x-1][casaMouse.y-1] = 0; // remove a peca capturada do tabuleiro
              removeIndex = casaOcupada(createVector(casaMouse.x-3,casaMouse.y - 1), false);
              dama2.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x-3][casaMouse.y-1] = 0; // remove a peca capturada do tabuleiro
            
            } else if (tabuleiro[casaMouse.x - 1][casaMouse.y + 1] == 3 && tabuleiro[casaMouse.x - 2][casaMouse.y + 2] == 0 && tabuleiro[casaMouse.x - 3][casaMouse.y + 1] == 3) {
              
              console.log("Comeu legal");
              dama1[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(createVector(casaMouse.x - 1,casaMouse.y + 1), false);
              dama2.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x-1][casaMouse.y+1] = 0; // remove a peca capturada do tabuleiro              
              removeIndex = casaOcupada(createVector(casaMouse.x - 3,casaMouse.y+1), false);
              dama2.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x-3][casaMouse.y+1] = 0; // remove a peca capturada do tabuleiro
            
            } else {
              console.log("Movimento invalido, voltei para a origem");
              dama1[index].move(origin);
              //player = !player;
              return false;
            }
          } else {

            if (tabuleiro[casaMouse.x - 1][casaMouse.y - 1] == 2 && tabuleiro[casaMouse.x - 2][casaMouse.y - 2] == 0 && tabuleiro[casaMouse.x - 3][casaMouse.y - 1] == 2) {
              
              console.log("Comeu legal");
              dama2[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(createVector(casaMouse.x - 1,casaMouse.y-1), true);
              dama1.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x-1][casaMouse.y-1] = 0; // remove a peca capturada do tabuleiro             
              removeIndex = casaOcupada(createVector(casaMouse.x-3,casaMouse.y - 1), true);
              dama1.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x-3][casaMouse.y-1] = 0; // remove a peca capturada do tabuleiro
            
            } else if (tabuleiro[casaMouse.x - 1][casaMouse.y + 1] == 2 && tabuleiro[casaMouse.x - 2][casaMouse.y + 2] == 0 && tabuleiro[casaMouse.x - 3][casaMouse.y +1] == 2) {
              
              console.log("Comeu legal");
              dama2[index].move(casaMouse, tabuleiro); //move a peca
              var removeIndex = casaOcupada(createVector(casaMouse.x - 1,casaMouse.y + 1), true);
              dama1.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x-1][casaMouse.y+1] = 0; // remove a peca capturada do tabuleiro              
              removeIndex = casaOcupada(createVector(casaMouse.x - 3,casaMouse.y+1), true);
              dama1.splice(removeIndex, 1); // remove a peca capturada do array
              tabuleiro[casaMouse.x-3][casaMouse.y+1] = 0; // remove a peca capturada do tabuleiro
            
            } else {
              console.log("Movimento invalido, voltei para a origem");
              dama2[index].move(origin);
              //player = !player;
              return false;
            }
          }
        }else {
          console.log("Movimento invalido, voltei para a origem");
          if (player) {
            dama1[index].move(origin);
          } else {
            dama2[index].move(origin);
          }
          //player = !player;
          return false;
        }
        
      }else {
        console.log("Movimento invalido, voltei para a origem",player);
        if (player) {
          dama1[index].move(origin);
        } else {
          dama2[index].move(origin);
        }
        //player = !player;
        return false;
      }
      
      console.log("EU sou daqui, sou da terra inverter");
      player = !player;
      return true;
}


              

