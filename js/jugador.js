//Objeto jugador, tiene su sprite, sus posiciones en x e y ademas de la velocidad
function Jugador(spr,x,y,vel,margen) {
	//Velocidad del jugador debe ser multiplo de cellsize
	this.sprite = spr;
	this.posx = x;
	this.posy = y;
	this.velocidad = vel;
	this.dir = 0;
	this.cadencia = 1;//disparos por segundo
	this.puedeDisparar = true;
	this.margen = margen;

	this.shoot = function(){
		this.puedeDisparar = false;

		//Se necesita si no, settimeout no podria acceder al objeto que lo invoca
		var _this = this;
		setTimeout(function(){
			_this.puedeDisparar = true;
		}, _this.cadencia * 1000);
	}

	this.canShoot = function(){
		return this.puedeDisparar;
	}
}