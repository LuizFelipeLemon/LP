void Menu(){
    
    background(0, 0, 0);
    textSize(120); // tamanho do texto "Damas"
    fill(255,255,0); // cor nome "Damas"
    text("Damas", 100, height/2 - 150); // texto do nome "Damas"
    fill(255,0,0); // cor do quadrado de player vs player
    rect(width/2 + 100, height/2 - 100, 150, 75); // quadrado do player vs player
    textSize(40); // tamanho do texto player vs player
    fill(255,255,255); //cor do nome player vs player
    text("Pvp",width/2 + 140, height/2 - 50); // nome player vs player
    fill(255,0,0); // cor do quadrado de player vs pc
    rect(width/2 - 250, height/2 - 100, 150, 75); // quadrado de player vs pc
    textSize(40); // tamanho do texto de player vs pc
    fill(255,255,255); // cor do texto de player vs pc
    text("Pvc",width/2 - 210, height/2 - 50); // texto de player vs pc
    fill (255,0,0); // cor do quadrado de sair
    rect(width/2-70, height/2-100,150,75); // Retângulo de sair
    textSize(40);// tamanho do texto sair
    fill(255,255,255); // cor do nome sair
    text("Sair",width/2-30, height/2-50);// texto para sair
}