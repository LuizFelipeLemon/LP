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
  console.log(this.casa);

};

Dama.prototype.update = function() {
  //console.log(this.position.x, this.position.y);
  if (this.color) {
    fill(255, 89, 89);
  } else {
    fill(255);

  }
  ellipse(this.position.x, this.position.y, 50, 50);
};
