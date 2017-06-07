int estado =0;
void setup () {
  size (600,600);
}
void draw () {
 if(estado == 0) Menu();
 //if(estado == 1) jogo();
 if(estado == 2) FimDeJogo();
}