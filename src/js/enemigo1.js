//Objeto jugador, tiene su sprite, sus posiciones en x e y ademas de la velocidad
function Enemigo1(x,y,vel,cadencia,margen,vida,spritesAnimacionDestruccion) {
	//Velocidad del jugador debe ser multiplo de cellsize
    this.isAlive = true;
	this.sprite = new Image();
    this.sprite.src = "../images/enemigo_1.png";
	this.posx = x;
	this.posy = y;
	this.velocidad = vel;
	this.dir = 0;
	this.cadencia = cadencia;//disparos por segundo
	this.puedeDisparar = true;
    this.margen = margen;
    this.vida = vida;

    this.animacionDestruccion=1;
    this.spritesAnimacionDestruccion = spritesAnimacionDestruccion;

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

    this.daniar = function(){
        if (this.vida > 0)
        this.vida--;
    }

    this.destruir = function(){
		
		var _this = this;

		//Se va a llamar a si misma para ir avanzando la animacion de destruccion del tile
		setTimeout(function(){
			if (_this.animacionDestruccion <=8){
                _this.sprite = _this.spritesAnimacionDestruccion[_this.animacionDestruccion];
                _this.animacionDestruccion++;
                _this.destruir();
			}else{
				//_this.spritesAnimacionDestruccion[_this.animacionDestruccion]
				_this.isAlive = false;
			}
		}, 50);
	}
}
function Enemigo2(x,y,vel,cadencia,margen,vida,spritesAnimacionDestruccion) {
	//Velocidad del jugador debe ser multiplo de cellsize
    this.isAlive = true;
	this.sprite = new Image();
    this.sprite.src = "../images/enemigo_2.png";
	this.posx = x;
	this.posy = y;
	this.velocidad = vel*1.5;
	this.dir = 0;
	this.cadencia = cadencia*3;//disparos por segundo
	this.puedeDisparar = true;
	this.margen = margen;
    var random;
    this.vida = vida;

    this.animacionDestruccion = 1;
    this.spritesAnimacionDestruccion = spritesAnimacionDestruccion;

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
    this.daniar = function(){
        if (this.vida > 0)
            this.vida--;
    }

    this.destruir = function(enemigos,i){
		
		var _this = this;

		//Se va a llamar a si misma para ir avanzando la animacion de destruccion del tile
		setTimeout(function(){
			if (_this.animacionDestruccion <=8){
                _this.sprite = _this.spritesAnimacionDestruccion[_this.animacionDestruccion];
                _this.animacionDestruccion++;
                _this.destruir();
			}else{
				//_this.spritesAnimacionDestruccion[_this.animacionDestruccion]
				
                enemigos.splice(i,1);
			}
        }, 50);
    }
}
function Enemigo3(x,y,vel,cadencia,margen,vida,spritesAnimacionDestruccion,spawnPadre) {
	//Velocidad del jugador debe ser multiplo de cellsize
    this.isAlive = true;
    enemigoV_stand = new Image();
	this.sprite = new Image();
    this.sprite.src = "../images/enemigo_3.png";
	this.posx = x;
	this.posy = y;
	this.velocidad = vel*0.5;
	this.dir = 0;
    var timeleft=6;
    this.spawn = spawnPadre;
    this.vida = vida;

    
    this.animacionDestruccion = 1;
    this.spritesAnimacionDestruccion=spritesAnimacionDestruccion;
    
	this.cadencia = setInterval(function(_this) {
            
        timeleft--;
        _this.apuntarNucleo();  //Se direcciona
        
        //Si se le ha acabado el tiempo
        if (timeleft==0 && _this.vida >0){
            //_this, x,y, spriteGusano,spriteVirus,spriteTroyano,spritesAnimacionDestruccion
            //Se muere
            _this.vida=0;
            
            //Spawnea 3 enemigos
            _this.spawn.spawnearGusano(_this.spawn,_this.posx,_this.posy,spritesAnimacionDestruccion);
            _this.spawn.spawnearGusano(_this.spawn,_this.posx,_this.posy,spritesAnimacionDestruccion);
            _this.spawn.spawnearGusano(_this.spawn,_this.posx,_this.posy,spritesAnimacionDestruccion);
            
            
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
        if (random===0){
            this.dir = dirX;
        }
        else {
            this.dir = dirY;
        }
    }
    this.daniar = function(){
        if (this.vida > 0)
        this.vida--;
    }

    this.destruir = function(){
		
		var _this = this;

		//Se va a llamar a si misma para ir avanzando la animacion de destruccion del tile
		setTimeout(function(){
			if (_this.animacionDestruccion <=8){
                _this.sprite = _this.spritesAnimacionDestruccion[_this.animacionDestruccion];
                _this.animacionDestruccion++;
                _this.destruir();
			}else{
				//_this.spritesAnimacionDestruccion[_this.animacionDestruccion]
                _this.isAlive = false;
			}
        }, 50);
    }
}