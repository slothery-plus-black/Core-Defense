//Objeto jugador, tiene su sprite, sus posiciones en x e y ademas de la velocidad
function Jugador(spr,x,y,vel,cadencia,margen) {
	//Velocidad del jugador debe ser multiplo de cellsize
	this.sprite = spr;
	this.posx = x;
	this.posy = y;
	this.velocidad = vel;
	this.dir = 0;
	this.cadencia = cadencia;//disparos por segundo
	this.puedeDisparar = true;
	this.margen = margen;

	this.shoot = function(){
		this.puedeDisparar = false;

		//Se necesita si no, settimeout no podria acceder al objeto que lo invoca
		var _this = this;
		setTimeout(function(){
			_this.puedeDisparar = true;
		}, 1000 /_this.cadencia);
	}

	this.canShoot = function(){
		return this.puedeDisparar;
	}
}