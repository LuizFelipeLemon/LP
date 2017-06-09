function Computer() {
  



}

Computer.prototype.play = function() {
	
	index = parseInt(random(0,dama1.length));
	origin = dama1[index].casa;
	var aleatoryVector = createVector(parseInt(random(0,7)),parseInt(random(0,7)));
	console.log("Chuto essa daqui",index);
	return createVector(7,3); 
 }
