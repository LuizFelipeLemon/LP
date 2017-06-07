void FimDeJogo() {
    background(0, 0, 0);
    textSize(80); // tamanho do texto de fim de jogo
    fill(255,255,0); // nome fim de jogo
    text("Fim de jogo", 70, height/2 - 150); // texto do fim de jogo
    fill(255,0,0); // cor do quadrado do menu inicial
    rect(width/2 + 60, height/2 - 100, 150, 75); // quadrado do menu inicial
    textSize(40); // tamanho do texto menu inicial
    fill(255,255,255); //cor do nome menu inicial
    text("Menu",width/2 + 80, height/2 - 50); // nome menu inicial
    fill(255,0,0); // cor do quadrado de sair
    rect(width/2 - 215, height/2 - 100, 150, 75); // quadrado de sair
    textSize(40); // tamanho do texto de sair
    fill(255,255,255); // cor do texto de sair
    text("Sair",width/2 - 177, height/2 - 50); // texto de sair
}