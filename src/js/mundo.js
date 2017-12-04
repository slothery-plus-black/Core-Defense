//Objeto mundo, contiene el mapa y los objetos que lo contiene.
function mundo(cellsize, tam) {
	this.board = [];
	this.jugador;
	this.jugador2;

	this.multiplayer = false;
	this.sonido = "on";
	this.idioma = "es";

	this.cellSize = cellsize; //No se especifica ancho ni alto por que seran cuadradras, cellsize*cellsize. 
	this.x = (tam) / this.cellSize, //Número de CASILLAS horizontales
	this.y = this.x; //Verticales

	this.context;

	this.sc = new shootingController();
	this.scEnemigos = new shootingController();
	this.cargado = false;

	this.puntuacion =0;

	this.srcImagenes = "../images/";

	//Imagenes de balas
	this.imagenBala_1w = new Image();
	this.imagenBala_2w = new Image();
	this.imagenBala_3w = new Image();
	this.imagenBala_1s = new Image();
	this.imagenBala_2s = new Image();
	this.imagenBala_3s = new Image();
	this.imagenBala_1a = new Image();
	this.imagenBala_2a = new Image();
	this.imagenBala_3a = new Image();
	this.imagenBala_1d = new Image();
	this.imagenBala_2d = new Image();
	this.imagenBala_3d = new Image();
	
    //De enemigos
	this.imagenBala_1wE = new Image();
	this.imagenBala_2wE = new Image();
	this.imagenBala_3wE = new Image();
	this.imagenBala_1sE = new Image();
	this.imagenBala_2sE = new Image();
	this.imagenBala_3sE = new Image();
	this.imagenBala_1aE = new Image();
	this.imagenBala_2aE = new Image();
	this.imagenBala_3aE = new Image();
	this.imagenBala_1dE = new Image();
	this.imagenBala_2dE = new Image();
	this.imagenBala_3dE = new Image();

	this.enemigos = [];
	
	this.spawns = [];
	this.cores = 4;

	this.initMundo = function (context, mapa, multi, sound, idio) {
		this.board = [];

		this.multiplayer = multi;
		this.sonido = sound;
		this.idioma = idio;
		
		this.context = context;

		//Imagenes jugador
		imagenJ1_stand = new Image();
		imagenJ1_w = new Image();
		imagenJ1_s = new Image();
		imagenJ1_a = new Image();
		imagenJ1_d = new Image();
		
		imagenJ1_stand.src = this.srcImagenes+"sprite1.png";
		imagenJ1_w.src = this.srcImagenes+"sprite1_arriba.png";
		imagenJ1_s.src = this.srcImagenes+"sprite1_abajo.png";
		imagenJ1_a.src = this.srcImagenes+"sprite1_izquierda.png";
		imagenJ1_d.src = this.srcImagenes+"sprite1_derecha.png";

		//Imagenes jugador2
		if (this.multiplayer){
			imagenJ2_stand = new Image();
			imagenJ2_w = new Image();
			imagenJ2_s = new Image();
			imagenJ2_a = new Image();
			imagenJ2_d = new Image();
			
			imagenJ2_stand.src = this.srcImagenes+"sprite1_jugador2.png";
			imagenJ2_w.src = this.srcImagenes+"sprite1_arriba_jugador2.png";
			imagenJ2_s.src = this.srcImagenes+"sprite1_abajo_jugador2.png";
			imagenJ2_a.src = this.srcImagenes+"sprite1_izquierda_jugador2.png";
			imagenJ2_d.src = this.srcImagenes+"sprite1_derecha_jugador2.png";
		}

		enemigo_explosion1 = new Image();
		enemigo_explosion1.src = this.srcImagenes+"explosion_1.png";
		enemigo_explosion2 = new Image();
		enemigo_explosion2.src = this.srcImagenes+"explosion_2.png";
		enemigo_explosion3 = new Image();
		enemigo_explosion3.src = this.srcImagenes+"explosion_3.png";
		enemigo_explosion4 = new Image();
		enemigo_explosion4.src = this.srcImagenes+"explosion_4.png";
		enemigo_explosion5 = new Image();
		enemigo_explosion5.src = this.srcImagenes+"explosion_5.png";
		enemigo_explosion6 = new Image();
		enemigo_explosion6.src = this.srcImagenes+"explosion_6.png";
		enemigo_explosion7 = new Image();
		enemigo_explosion7.src = this.srcImagenes+"explosion_7.png";
		enemigo_explosion8 = new Image();
		enemigo_explosion8.src = this.srcImagenes+"explosion_8.png";

		//Imagenes balas
		this.imagenBala_1w.src = this.srcImagenes+"disparo_1w.png";
		this.imagenBala_2w.src = this.srcImagenes+"disparo_2w.png";
		this.imagenBala_3w.src = this.srcImagenes+"disparo_3w.png";

		this.imagenBala_1s.src = this.srcImagenes+"disparo_1s.png";
		this.imagenBala_2s.src = this.srcImagenes+"disparo_2s.png";
		this.imagenBala_3s.src = this.srcImagenes+"disparo_3s.png";

		this.imagenBala_1a.src = this.srcImagenes+"disparo_1a.png";
		this.imagenBala_2a.src = this.srcImagenes+"disparo_2a.png";
		this.imagenBala_3a.src = this.srcImagenes+"disparo_3a.png";

		this.imagenBala_1d.src = this.srcImagenes+"disparo_1d.png";
		this.imagenBala_2d.src = this.srcImagenes+"disparo_2d.png";
		this.imagenBala_3d.src = this.srcImagenes+"disparo_3d.png";

		//Imagenes balas Enemigos
		this.imagenBala_1wE.src = this.srcImagenes+"disparo_1wE.png";
		this.imagenBala_2wE.src = this.srcImagenes+"disparo_2wE.png";
		this.imagenBala_3wE.src = this.srcImagenes+"disparo_3wE.png";

		this.imagenBala_1sE.src = this.srcImagenes+"disparo_1sE.png";
		this.imagenBala_2sE.src = this.srcImagenes+"disparo_2sE.png";
		this.imagenBala_3sE.src = this.srcImagenes+"disparo_3sE.png";

		this.imagenBala_1aE.src = this.srcImagenes+"disparo_1aE.png";
		this.imagenBala_2aE.src = this.srcImagenes+"disparo_2aE.png";
		this.imagenBala_3aE.src = this.srcImagenes+"disparo_3aE.png";

		this.imagenBala_1dE.src = this.srcImagenes+"disparo_1dE.png";
		this.imagenBala_2dE.src = this.srcImagenes+"disparo_2dE.png";
		this.imagenBala_3dE.src = this.srcImagenes+"disparo_3dE.png";

		var posiciones = [];
		for (var i = 0;i<mapa.jugador.length;i++){
			posiciones[i] = mapa.jugador[i];
		}

		//Return a random number between 1 and 10:
		//Math.floor((Math.random() * 10) + 1);
		var posAleatoria = Math.floor((Math.random() * posiciones.length) + 0);
		//Creamos el jugador en una de las posiciones de inicio aleatoriamente
		this.jugador = new Jugador([imagenJ1_w,imagenJ1_s, imagenJ1_a, imagenJ1_d, imagenJ1_stand],
			(posiciones[posAleatoria].posx * this.cellSize), (posiciones[posAleatoria].posy * this.cellSize), 4, 2, 8,"j1");

		if (this.multiplayer){
			var posAleatoria2 = Math.floor((Math.random() * posiciones.length) + 0);
			do {
				posAleatoria2 = Math.floor((Math.random() * posiciones.length) + 0);
			}while(posAleatoria === posAleatoria2)

			this.jugador2 = new Jugador([imagenJ2_w,imagenJ2_s, imagenJ2_a, imagenJ2_d, imagenJ2_stand],
				(posiciones[posAleatoria2].posx * this.cellSize), (posiciones[posAleatoria2].posy * this.cellSize), 4, 2, 8,"j2");
		}
		
		this.spawns[0] = new gusanoSpawner([]);
		this.spawns[0].start(1*cellsize,8*cellsize,
			[enemigo_explosion1,enemigo_explosion2,enemigo_explosion3,enemigo_explosion4,enemigo_explosion5,enemigo_explosion6,enemigo_explosion7,enemigo_explosion8]);
        this.spawns[1] = new gusanoSpawner([]);
		this.spawns[1].start(8*cellsize,1*cellsize,
			[enemigo_explosion1,enemigo_explosion2,enemigo_explosion3,enemigo_explosion4,enemigo_explosion5,enemigo_explosion6,enemigo_explosion7,enemigo_explosion8]);
        this.spawns[2] = new gusanoSpawner([]);
		this.spawns[2].start(16*cellsize,8*cellsize,
			[enemigo_explosion1,enemigo_explosion2,enemigo_explosion3,enemigo_explosion4,enemigo_explosion5,enemigo_explosion6,enemigo_explosion7,enemigo_explosion8]);
        this.spawns[3] = new gusanoSpawner([]);
		this.spawns[3].start(8*cellsize,16*cellsize,
			[enemigo_explosion1,enemigo_explosion2,enemigo_explosion3,enemigo_explosion4,enemigo_explosion5,enemigo_explosion6,enemigo_explosion7,enemigo_explosion8]);

		//Casilla (x,y,imagen,movible,destructible)
		for (var i = 0;i<this.x;i++){
			this.board[i] = [];
			for (var j=0;j<this.y;j++){
				var imagen = new Image();
				imagen.src = this.srcImagenes+""+mapa.filas[j].datos[i].tile+".png";
				if (mapa.filas[j].datos[i].tile === "0"){
					this.board[i][j] = new casilla(mapa.filas[j].datos[i].tile, i,j,imagen, true, false,this.srcImagenes,false);
				}else{
					if (mapa.filas[j].datos[i].tile === "1" || mapa.filas[j].datos[i].tile === "C"){
						this.board[i][j] = new casilla(mapa.filas[j].datos[i].tile, i,j,imagen, false, false,this.srcImagenes,false);
					}else{
						if (mapa.filas[j].datos[i].tile === "8" || mapa.filas[j].datos[i].tile === "9"
						|| mapa.filas[j].datos[i].tile === "A" || mapa.filas[j].datos[i].tile === "B"){
							this.board[i][j] = new casilla(mapa.filas[j].datos[i].tile,i,j,imagen, false, true,this.srcImagenes,true,this);
						}else{
							this.board[i][j] = new casilla(mapa.filas[j].datos[i].tile,i,j,imagen, false, true,this.srcImagenes,false);
						}
					}
				}
			}
		}

		var boardtemp = [];
		//Ampliamos la board al tamaño del lienzo, de [18][18] pasa a [18*cellSize][18*cellSize] para mayor precision
		for (var i = 0;i<this.x*this.cellSize;i++){
			boardtemp[i] = [];
			for (var j = 0;j<this.y*this.cellSize;j++){
				//Se copia la imagen de la x,y hasta la x+cellSize-1,y+cellSize-1 para que contengan la misma informacion
				boardtemp[i][j] = this.board[Math.floor(i/this.cellSize)][Math.floor(j/this.cellSize)];
			}
		}
		this.board = boardtemp;
		this.cargado = true;

		//sc (context, board, cellSize, margenBalas, velocidad)
		this.sc.init(this.context,this.board, this.cellSize, 12, 20,this);
		this.scEnemigos.init(this.context,this.board, this.cellSize, 12, 20,this);
	}

	this.mover = function (keysDown) {
		//w
		if (keysDown[87]){
			this.moverJugador(0, this.jugador);
		}
		//s
		if (keysDown[83]){
			this.moverJugador(1, this.jugador);
		}
		//a
		if (keysDown[65]){
			this.moverJugador(2, this.jugador);
		}
		//d
		if (keysDown[68]){
			this.moverJugador(3, this.jugador);
		}
		//f
		if (keysDown[70]){
			this.disparar(this.jugador);
		}
		//espacio
		if (keysDown[32]){
			this.disparar(this.jugador);
		}

		//Segundo jugador
		if (this.multiplayer){
			//up arrow
			if (keysDown[38]){
				this.moverJugador(0, this.jugador2);
			}
			//down arrow
			if (keysDown[40]){
				this.moverJugador(1, this.jugador2);
			}
			//left arrow
			if (keysDown[37]){
				this.moverJugador(2, this.jugador2);
			}
			//right arrow
			if (keysDown[39]){
				this.moverJugador(3, this.jugador2);
			}
			//0
			if (keysDown[96]){
				this.disparar(this.jugador2);
			}
		}
	}
    
	this.colisionesDisparos = function(){
		for(var i=0;i<this.spawns.length;i++){
			this.sc.colisionEnemigos(this.spawns[i].enemigos);
        }

		this.scEnemigos.colisionObjeto(this.jugador);

		if (this.multiplayer){
			this.scEnemigos.colisionObjeto(this.jugador2);
		}
	}

	this.sumarPuntuacion = function(tipo){
		switch (tipo){
			case "g":
				this.puntuacion += 100;
				break;
			case "v":
				this.puntuacion += 300;
				break;
			case "t":
				this.puntuacion += 900;
				break;
		}
	}

	this.quitarVida = function(tipoJugador){
		if (tipoJugador === "j1"){
			console.log(this.jugador.vida);
			document.getElementById("vidaj1"+this.jugador.vida).style.visibility = 'hidden';
		}
		if (tipoJugador === "j2"){
			document.getElementById("vidaj2"+this.jugador2.vida).style.visibility = 'hidden';
		}
	}

	this.verificarMuertes = function(){
		for(var i=0;i<this.spawns.length;i++){
			//Para hacer animacion de destruccion
			this.spawns[i].verificarMuertes();
		}
		
		if (this.jugador.vida<=0){
			if (!this.multiplayer){
				this.gameOver();
			}else{
				this.jugador.morir(this,[enemigo_explosion1,enemigo_explosion2,enemigo_explosion3,enemigo_explosion4,enemigo_explosion5,enemigo_explosion6,enemigo_explosion7,enemigo_explosion8]);
			}
		}

		if (this.multiplayer){
			if (this.jugador2.vida<=0){
				this.jugador2.morir(this,[enemigo_explosion1,enemigo_explosion2,enemigo_explosion3,enemigo_explosion4,enemigo_explosion5,enemigo_explosion6,enemigo_explosion7,enemigo_explosion8]);
			}

			if (this.jugador.vida<=0 && this.jugador2.vida<=0){
				this.gameOver();
			}
		}
		
			
	}

	this.pintado = function () {
		if (this.cores <= 0){
			this.gameOver();
		}

		console.log(this.puntuacion);

		if (this.cargado){
			this.moverEnemigos();

			this.colisionesDisparos();

			for (var i = 0; i < this.x; i++) {
				for (var j = 0; j < this.y; j++) {
					this.pintar(this.board[i*this.cellSize][j*this.cellSize].image, i * this.cellSize, j * this.cellSize);
				}
			}

			//Para imprimir el personaje
			this.pintar(this.jugador.cogerSprite(), this.jugador.posx, this.jugador.posy);
			this.jugador.avanzarTiempo();
			if (this.multiplayer){
				this.pintar(this.jugador2.cogerSprite(), this.jugador2.posx, this.jugador2.posy);
				this.jugador2.avanzarTiempo();
			}

			//Impresion de las balas
			this.sc.renderBalas();
			this.scEnemigos.renderBalas();

			this.verificarMuertes();

			this.pintarEnemigos();
		}
	}

	this.pintar = function(img, x, y){
		try{
			this.context.drawImage(img, x, y);
		} catch(err) {
			//Error en el pintado porque aun no se ha cargado la imagen en firefox, en chrome no hay problema
		}
	}

	this.pintarEnemigos = function(){
        var temp;
        var tempx;
        var tempy;
		for(var i=0;i<this.spawns.length;i++){
			for (var j=0;j<this.spawns[i].enemigos.length;j++){
                try {
                    tempx = this.spawns[i].enemigos[j].posx;
                    tempy = this.spawns[i].enemigos[j].posy;
                    temp = this.spawns[i].enemigos[j].animar();
                }
                catch(err) {
                    temp = enemigo_explosion8;
                    tempx = -10;
                    tempy = -10;
                }
				this.pintar(temp, tempx,tempy);
			}
		}
	}
	
	//0 arriba, 1 abajo, 2 izquierda y 3 derecha
	this.moverJugador = function (num, jugador) {
		//Actualiza la direccion en la que mira
		jugador.dir=num;
		var jxOriginal = jugador.posx;
		var jyOriginal = jugador.posy;

		switch (jugador.dir){
			case 0:
				jugador.posy = jugador.posy - jugador.velocidad;
				if (jugador.posy < 0)
					jugador.posy = 0;
				break;
			case 1:
				jugador.posy = jugador.posy + jugador.velocidad;
				if (jugador.posy >= (this.y*this.cellSize)-jugador.velocidad)
					jugador.posy = (this.y*this.cellSize)-jugador.velocidad;
				break;
			case 2:
				jugador.posx = jugador.posx - jugador.velocidad;
				if (jugador.posx < 0)
					jugador.posx = 0;
				break;
			case 3:
				jugador.posx = jugador.posx + jugador.velocidad;
				if (jugador.posx >= (this.x*this.cellSize)-jugador.velocidad)
					jugador.posx = (this.x*this.cellSize)-jugador.velocidad;
				break;
		}
		
		if (this.colision(jugador.posx,jugador.posy,jugador.margen)){
			jugador.posx = jxOriginal;
			jugador.posy = jyOriginal;
		}

		jugador.animar(num);
	}

	this.moverEnemigos = function(){
		//Actualiza la direccion en la que mira
		for(var i=0;i<this.spawns.length;i++){
			for (var j=0;j<this.spawns[i].enemigos.length;j++){
				var jxOriginal = this.spawns[i].enemigos[j].posx;
				var jyOriginal = this.spawns[i].enemigos[j].posy;
				this.dispararEnemigo(this.spawns[i].enemigos[j]);
		
				switch (this.spawns[i].enemigos[j].dir){
					case 0:
					this.spawns[i].enemigos[j].posy = this.spawns[i].enemigos[j].posy - this.spawns[i].enemigos[j].velocidad;
						if (this.spawns[i].enemigos[j].posy < 0)
						this.spawns[i].enemigos[j].posy = 0;
						break;
					case 1:
					this.spawns[i].enemigos[j].posy = this.spawns[i].enemigos[j].posy + this.spawns[i].enemigos[j].velocidad;
						if (this.spawns[i].enemigos[j].posy >= (this.y*this.cellSize)-this.spawns[i].enemigos[j].velocidad)
						this.spawns[i].enemigos[j].posy = (this.y*this.cellSize)-this.spawns[i].enemigos[j].velocidad;
						break;
					case 2:
					this.spawns[i].enemigos[j].posx = this.spawns[i].enemigos[j].posx - this.spawns[i].enemigos[j].velocidad;
						if (this.spawns[i].enemigos[j].posx < 0)
						this.spawns[i].enemigos[j].posx = 0;
						break;
					case 3:
					this.spawns[i].enemigos[j].posx = this.spawns[i].enemigos[j].posx + this.spawns[i].enemigos[j].velocidad;
						if (this.spawns[i].enemigos[j].posx >= (this.x*this.cellSize)-this.spawns[i].enemigos[j].velocidad)
						this.spawns[i].enemigos[j].posx = (this.x*this.cellSize)-this.spawns[i].enemigos[j].velocidad;
						break;
				}
				
				if (this.colision(this.spawns[i].enemigos[j].posx,this.spawns[i].enemigos[j].posy,this.spawns[i].enemigos[j].margen)){
					this.spawns[i].enemigos[j].posx = jxOriginal;
					this.spawns[i].enemigos[j].posy = jyOriginal;
					this.spawns[i].enemigos[j].dir = Math.floor((Math.random() * 4) + 0);
				}
			}
		}
	}
	
	this.disparar = function (jugador) {
		if (jugador.canShoot()){
            jugador.shoot();
			switch(jugador.dir){
				case 0:
					this.sc.shoot(jugador.posx, jugador.posy, jugador.dir, [this.imagenBala_1w,this.imagenBala_2w,this.imagenBala_3w]);
					break;
				case 1:
					this.sc.shoot(jugador.posx, jugador.posy, jugador.dir, [this.imagenBala_1s,this.imagenBala_2s,this.imagenBala_3s]);
					break;
				case 2:
					this.sc.shoot(jugador.posx, jugador.posy, jugador.dir, [this.imagenBala_1a,this.imagenBala_2a,this.imagenBala_3a]);
					break;
				case 3:
					this.sc.shoot(jugador.posx, jugador.posy, jugador.dir, [this.imagenBala_1d,this.imagenBala_2d,this.imagenBala_3d]);
					break;
			}

			jugador.animar(jugador.dir);
		}
	}

	this.dispararEnemigo = function (ene) {
		if (ene.canShoot() && ene.vida >0){
            ene.shoot();
			switch(ene.dir){
				case 0:
					this.scEnemigos.shoot(ene.posx, ene.posy, ene.dir, [this.imagenBala_1wE,this.imagenBala_2wE,this.imagenBala_3wE]);
					break;
				case 1:
					this.scEnemigos.shoot(ene.posx, ene.posy, ene.dir, [this.imagenBala_1sE,this.imagenBala_2sE,this.imagenBala_3sE]);
					break;
				case 2:
					this.scEnemigos.shoot(ene.posx, ene.posy, ene.dir, [this.imagenBala_1aE,this.imagenBala_2aE,this.imagenBala_3aE]);
					break;
				case 3:
					this.scEnemigos.shoot(ene.posx, ene.posy, ene.dir, [this.imagenBala_1dE,this.imagenBala_2dE,this.imagenBala_3dE]);
					break;
			}
			ene.puedeDisparar = false;
			ene.animar(ene.dir);
		}
	}

	this.colision = function(colx,coly,margen){
		//Arriba izquierda
		if (!this.board[colx+margen][coly+margen].movible){
			return true;
		}
		//Abajo derecha
		if (!this.board[colx+this.cellSize-margen][coly+this.cellSize-margen].movible){
			return true;
		}
		//Abajo izquierda
		if (!this.board[colx+margen][coly+this.cellSize-margen].movible){
			return true;
		}
		//Arriba derecha
		if (!this.board[colx+this.cellSize-margen][coly+margen].movible){
			return true;
		}

		return false;
	}
    
    this.gameOver = function(){
		if (!this.multiplayer){
			this.jugador.morir(this,[enemigo_explosion1,enemigo_explosion2,enemigo_explosion3,enemigo_explosion4,enemigo_explosion5,enemigo_explosion6,enemigo_explosion7,enemigo_explosion8]);
			setTimeout(stopNS,3000);
		}else{
			this.jugador.morir(this,[enemigo_explosion1,enemigo_explosion2,enemigo_explosion3,enemigo_explosion4,enemigo_explosion5,enemigo_explosion6,enemigo_explosion7,enemigo_explosion8]);
			this.jugador2.morir(this,[enemigo_explosion1,enemigo_explosion2,enemigo_explosion3,enemigo_explosion4,enemigo_explosion5,enemigo_explosion6,enemigo_explosion7,enemigo_explosion8]);
			setTimeout(stopNS,3000);
		}
    }
}