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
	this.animacion = this.sprite.length;
	this.tiempo = 0;

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

	this.cogerSprite = function(){
		return this.sprite[this.animacion];
	}
	this.avanzarTiempo = function(){
		this.tiempo++;
		if (this.tiempo > 2){
			this.animacion = 4;
		}
	}
	
	this.animar = function(num){
		this.animacion = num;
		this.tiempo = 0;
	}
}