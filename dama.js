function Dama(color) {
  this.position = createVector();
  this.color = color;
  this.casa;



}

Dama.prototype.begin = function(i) {
  noStroke();

  var y = parseInt(i / 4) * 75 + 37.5;

  if (parseInt(i / 4) < 1) {
    if (this.color) {
      var x = 75 * (2 * i) + 37.5;
      var y = parseInt(i / 4) * 75 + 37.5;
    } else {
      var x = 600 - (75 * (2 * i) + 37.5);
      var y = (8 - parseInt(i / 4)) * 75 - 37.5;
    }

  } else if (parseInt(i / 4) < 2) {
    if (this.color) {
      var x = 75 * (2 * (i - 4) + 1) + 37.5;
      var y = parseInt(i / 4) * 75 + 37.5;
    } else {
      var x = 600 - (75 * (2 * (i - 4) + 1) + 37.5);
      var y = (8 - parseInt(i / 4)) * 75 - 37.5;
    }

  } else {
    if (this.color) {
      var x = 75 * 2 * (i - 8) + 37.5;
      var y = parseInt(i / 4) * 75 + 37.5;
    } else {
      var x = 600 - (75 * 2 * (i - 8) + 37.5);
      var y = (8 - parseInt(i / 4)) * 75 - 37.5;

    }
  }
  this.position.x = x;
  this.position.y = y;
  this.casa = createVector(parseInt(x / 75), parseInt(y / 75));
  if (this.color) {
    tabuleiro[this.casa.x][this.casa.y] = 2;
  } else {
    tabuleiro[this.casa.x][this.casa.y] = 3;
  }

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

Dama.prototype.move = function(casa) {
  console.log("LUIZ", casa);
  console.log(this.position);
  this.position.x = 75 * casa.x + 37.5;
  this.position.y = 75 * casa.y + 37.5;
  console.log(this.position);
  this.casa = casa;
}
