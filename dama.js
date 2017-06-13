function Dama(casa, color) {

  this.color = color;
  this.casa = casa;
  this.position = createVector(casa.x*75 + 37.5, casa.y*75 + 37.5);


}

Dama.prototype.begin = function( casa ) {

  
  
};

Dama.prototype.update = function() {
  //console.log(this.position.x, this.position.y);
  if (this.color) {
    fill(255, 89, 89);
  } else {
    fill(255);

  }

  ellipse(this.position.x, this.position.y, 50, 50); // desenhar a ellipse
};

Dama.prototype.move = function(casa, tabu) {
  //console.log("LUIZ", casa);
  //console.log("LUIZ", this.casa);
  if (!casa.equals(this.casa)) { // Se a casa alvo for diferente da casa atual
    console.log(tabu);
    tabu[this.casa.x][this.casa.y] = 0;
    this.casa = casa;
    if (this.color) {
      tabu[this.casa.x][this.casa.y] = 2;
    } else {
      tabu[this.casa.x][this.casa.y] = 3;
    }
  }
  this.position.x = 75 * casa.x + 37.5;
  this.position.y = 75 * casa.y + 37.5;

}
