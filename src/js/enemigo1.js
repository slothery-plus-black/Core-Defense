//Objeto jugador, tiene su sprite, sus posiciones en x e y ademas de la velocidad
function Enemigo1(spr,x,y,vel,cadencia,margen) {
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
        this.apuntarNucleo();
		//Se necesita si no, settimeout no podria acceder al objeto que lo invoca
		var _this = this;
		setTimeout(function(){
			_this.puedeDisparar = true;
		}, 2000 /_this.cadencia);
	}

	this.canShoot = function(){
		return this.puedeDisparar;
	}

	this.cogerSprite = function(){
		return this.sprite[this.dir];
	}
	
	this.animar = function(num){
		this.dir = num;
	}
      
    this.apuntarNucleo = function(){
        var dirX;
        var dirY;
        var random;
        if (this.posx<360){
            dirX=3;
        }
        else {
            dirX=2;
        }
        if (this.posy<360){
            dirY=1;
        }
        else {
            dirY=0;
        }
        random = Math.floor((Math.random() * 2) + 0);
        if (random==0){
            this.dir = dirX;
        }
        else {
            this.dir = dirY;
        }
    }
}