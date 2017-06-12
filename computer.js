//Objeto criado para instancias condições de jogadas mais inteligentes
//Se der tempo

function Computer() {


}

Computer.prototype.play = function() {
	
	index = parseInt(random(0,dama1.length));
	origin = dama1[index].casa;
	var aleatoryIndex = parseInt(random(0,7));
	console.log("Vai sair daqui",origin);
	return createVector(parseInt(random(0,7)),parseInt(random(0,7))); 

 }
