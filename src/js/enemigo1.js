//Objeto jugador, tiene su sprite, sus posiciones en x e y ademas de la velocidad
function Enemigo1(spr,x,y,vel,cadencia,margen) {
	//Velocidad del jugador debe ser multiplo de cellsize
    this.isAlive = true;
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
        random = Math.floor((Math.random() * 10) + 0);
        if (random<7){this.apuntarNucleo();}
       
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
function Enemigo2(spr,x,y,vel,cadencia,margen) {
	//Velocidad del jugador debe ser multiplo de cellsize
    this.isAlive = true;
	this.sprite = spr;
	this.posx = x;
	this.posy = y;
	this.velocidad = vel*1.5;
	this.dir = 0;
	this.cadencia = cadencia*3;//disparos por segundo
	this.puedeDisparar = true;
	this.margen = margen;
    var random;

	this.shoot = function(){
		this.puedeDisparar = false;
        
        this.apuntarNucleo();
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
		return this.sprite[this.dir];
	}
	
	this.animar = function(num){
		this.dir = num;
	}
      
    this.apuntarNucleo = function(){
        var dirX;
        var dirY;
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
function Enemigo3(spr,x,y,vel,cadencia,margen,spawnPadre) {
	//Velocidad del jugador debe ser multiplo de cellsize
    this.isAlive = true;
	this.sprite = spr;
	this.posx = x;
	this.posy = y;
	this.velocidad = vel*0.5;
	this.dir = 0;
    var timeleft=6;
    this.spawn = spawnPadre;
    
	this.cadencia = setInterval(function(_this) {
            
        timeleft--;
        _this.apuntarNucleo();  //Se direcciona
        
        //Si se le ha acabado el tiempo
        if (timeleft==0){
            
            //Spawnea 3 enemigos
            _this.spawn.crearEnemigo(_this.spawn,_this.posx,_this.posy,_this.sprite);
            _this.spawn.crearEnemigo(_this.spawn,_this.posx,_this.posy,_this.sprite);
            _this.spawn.crearEnemigo(_this.spawn,_this.posx,_this.posy,_this.sprite);
             _this.spawn = null;
            
            //Se muere
            _this.isAlive = false;
        }
        
        },2000,this);
    
	this.puedeDisparar = false;
	this.margen = margen;
    var random; //Variable auxiliar
   

	
    

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