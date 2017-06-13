function Tabuleiro(){
	this.tabuleiro = new Array(8);


}

Tabuleiro.prototype.begin = function(){

	for (var i = 0; i < 8; i++) { //Preenche a matriz com casas pretas e brancas 
    this.tabuleiro[i] = new Array(8);

    for (var j = 0; j < 8; j++) {
      if ((i + j) % 2 == 0) {
      	var casa = createVector(i,j);
      	if(i<3){
        	this.tabuleiro[i][j] = new Dama(casa,color(255, 0, 0));
      	}else if(i>4){
      		this.tabuleiro[i][j] = new Dama(casa, color(255,255,255));
      	}else {
      		this.tabuleiro[i][j] = 0;
      	}
      } else {
        this.tabuleiro[i][j] = 1;
      }
      draw();
    }

  }
  console.log(this.tabuleiro);
}

Tabuleiro.prototype.draw = function(){

	for(var i = 0; i < 8; i++){
		for(var j = 0; j < 8; j++){
			if(this.tabuleiro[i][j] == 0){
				fill(0);
				rect(75 * i, 75 * j, 75, 75); //Desenha a casa
			}else if(this.tabuleiro[i][j] == 1){
				fill(255);
				rect(75 * i, 75 * j, 75, 75); //Desenha a casa
			}else{
				fill(0);
				rect(75 * i, 75 * j, 75, 75); //Desenha a casa
				fill(this.tabuleiro[i][j].color);
				ellipse(this.tabuleiro[i][j].position.x,this.tabuleiro[i][j].position.y,50,50);
			}
		}
	}
}