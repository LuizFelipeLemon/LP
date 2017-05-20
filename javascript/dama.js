function Dama(color) {
  this.position = createVector();
  this.color = color;




}

Dama.prototype.show = function(i) {
  fill(255, 89, 89);
  noStroke();
  push();
  if (!this.color) {
    translate(600, 600);
    rotate(PI);
    fill(255);
    console.log("Luiz");

  }
  var y = parseInt(i / 4) * 75 + 37.5;
  if (parseInt(i / 4) < 1) {

    var x = 75 * (2 * i) + 37.5;

  } else if (parseInt(i / 4) < 2) {

    var x = 75 * (2 * (i - 4) + 1) + 37.5;

  } else {

    var x = 75 * 2 * (i - 8) + 37.5;

  }

  ellipse(x, y, 50, 50);
  pop();
  this.position.x = x;
  this.position.y = y;

};
/*
if (y < 3) {
  if (x % 2 == 0 && y % 2 == 0) { //formação da peça em posições pares
    fill(255, 89, 89);
    noStroke();
    ellipse(75 * x + 37.5, 75 * y + 37.5, 50, 50);
  }

  if (x % 2 != 0 && y % 2 != 0) { //formação da peça em posições ímpares
    fill(250, 89, 89);
    noStroke();
    ellipse(75 * x + 37.5, 75 * y + 37.5, 50, 50);
  }
}
if (y > 4) {
  if (x % 2 == 0 && y % 2 == 0) { //formação da peça em posições pares
    fill(255);
    noStroke();
    ellipse(75 * x + 37.5, 75 * y + 37.5, 50, 50);
  }

  if (x % 2 != 0 && y % 2 != 0) { //formação da peça em posições ímpares
    fill(255);
    noStroke();
    ellipse(75 * x + 37.5, 75 * y + 37.5, 50, 50);
  }*/
