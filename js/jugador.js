//Objeto jugador, tiene su sprite, sus posiciones en x e y ademas de la velocidad
function Jugador(spr,x,y,vel) {
	//Velocidad del jugador debe ser multiplo de cellsize
	this.sprite = spr;
	this.posx = x;
	this.posy = y;
	this.velocidad = vel;
	this.dir = 0;
	this.cadencia = 1;
}