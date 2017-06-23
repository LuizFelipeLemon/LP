function Tabuleiro(){
	this.tabuleiro = new Array(8);


}

Tabuleiro.prototype.begin = function(){

	for (var i = 0; i < 8; i++) { //Preenche a matriz com casas pretas e brancas 
		this.tabuleiro[i] = new Array(8);

	    for (var j = 0; j < 8; j++) {

	    	console.log(i,j);
	    	var casa = createVector(i,j);
	    	if((i+j)%2==0){	

	      		if(j<3){
	        		this.tabuleiro[i][j] = new Dama(casa,color(255, 0, 0));
		    	}else if(j>4){
		    	    this.tabuleiro[i][j] = new Dama(casa,color(255, 255, 255));
		    	}else{
		    	   	this.tabuleiro[i][j] = 0;
		    	}
		    	
		    }else{
		    	this.tabuleiro[i][j] = 1;
		    }
	    }
    }
}

Tabuleiro.prototype.draw = function(){
	//console.log("ENTREI");
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
				//console.log("teste",i,j,this.tabuleiro[i][j]);
				fill(this.tabuleiro[i][j].color);
				ellipse(this.tabuleiro[i][j].position.x,this.tabuleiro[i][j].position.y,50,50);
			}
		}
	}
}