

void setup() {
  size(600, 600);
  background(0);
  boolean white = false;
  for (int y = 0; y < 8; y++) { // linhas
    for (int x = 0; x < 8; x++) { //colunas
      if (white)
        fill(243,233,186);
      else
        fill(0);
      rect(75*x, 75*y, 75, 75);
      white = !white; 
      if (y<3) { 
        if (x%2==0 && y%2==0) { //formação da peça em posições pares 
          fill(255, 89, 89);
          noStroke();
          ellipse(75*x + 37.5, 75*y + 37.5, 50, 50);
        }

        if (x%2!=0 && y%2!=0) { //formação da peça em posições ímpares 
          fill(250, 89, 89);
          noStroke();
          ellipse(75*x + 37.5, 75*y + 37.5, 50, 50);
        }
      }
      if (y>4) { 
        if (x%2==0 && y%2==0) { //formação da peça em posições pares 
          fill(255);
          noStroke();
          ellipse(75*x + 37.5, 75*y + 37.5, 50, 50);
        }

        if (x%2!=0 && y%2!=0) { //formação da peça em posições ímpares 
          fill(255);
          noStroke();
          ellipse(75*x + 37.5, 75*y + 37.5, 50, 50);
        }
      }
    }
    white = !white;
  }
}

void draw() {

  //println(mouseX);
  fill(255, 0, 0);
}
