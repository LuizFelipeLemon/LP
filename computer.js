function Computer() {
  a = createVector(1,1);
  b = createVector(-1,1);
  c = createVector(1,-1);
  d = createVector(-1,-1);
  e = createVector(-2,-2);
  f = createVector(2,-2);
  g = createVector(-2,2);
  h = createVector(2,2);

/*
  simple1 = createVector(1,1);
  simple2 = createVector(-1,1);
  simple3 = createVector(1,-1);
  simple4 = createVector(-1,-1);
  capturaSimples1 = createVector(-2,-2);
  capturaSimples2 = createVector(2,-2);
  capturaSimples3 = createVector(-2,2);
  capturaSimples4 = createVector(2,2);
*/
	this.vectors = [];
	this.vectors[0] = a;
	this.vectors[0] = b;
	this.vectors[0] = c;
	this.vectors[0] = d;
	this.vectors[0] = e;
	this.vectors[0] = f;
	this.vectors[0] = g;
	this.vectors[0] = h;


}

Computer.prototype.play = function() {
	
	index = parseInt(random(0,dama1.length));
	origin = dama1[index].casa;
	var aleatoryIndex = parseInt(random(0,7));
	console.log("Vai sair daqui",origin);
	return createVector(parseInt(random(0,7)),parseInt(random(0,7))); 

 }
