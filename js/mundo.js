//Objeto mundo, contiene el mapa y los objetos que lo contiene.
function mundo() {
	this.board = [];
	this.jugador;
	this.jugador2;
	this.cellSize = 40; //No se especifica ancho ni alto por que seran cuadradras, cellsize*cellsize. 
	this.x = (720) / this.cellSize, //Número de CASILLAS horizontales
	this.y = this.x; //Verticales

	this.context;

	this.sc = new shootingController();
	this.cargado = false;

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

	this.initMundo = function (context, mapa) {
		this.board = [];
		
		this.context = context;

		//Imagenes jugador
		imagenJ1_stand = new Image();
		imagenJ1_w = new Image();
		imagenJ1_s = new Image();
		imagenJ1_a = new Image();
		imagenJ1_d = new Image();
		
		imagenJ1_stand.src = "src/sprite1.png";
		imagenJ1_w.src = "src/sprite1_arriba.png";
		imagenJ1_s.src = "src/sprite1_abajo.png";
		imagenJ1_a.src = "src/sprite1_izquierda.png";
		imagenJ1_d.src = "src/sprite1_derecha.png";

		//Imagenes balas
		this.imagenBala_1w.src = "src/disparo_1w.png";
		this.imagenBala_2w.src = "src/disparo_2w.png";
		this.imagenBala_3w.src = "src/disparo_3w.png";

		this.imagenBala_1s.src = "src/disparo_1s.png";
		this.imagenBala_2s.src = "src/disparo_2s.png";
		this.imagenBala_3s.src = "src/disparo_3s.png";

		this.imagenBala_1a.src = "src/disparo_1a.png";
		this.imagenBala_2a.src = "src/disparo_2a.png";
		this.imagenBala_3a.src = "src/disparo_3a.png";

		this.imagenBala_1d.src = "src/disparo_1d.png";
		this.imagenBala_2d.src = "src/disparo_2d.png";
		this.imagenBala_3d.src = "src/disparo_3d.png";

		/*var imagenJ2 = new Image();
		imagenJ2.src = "src/personaje_1.png";*/
		
		//this.jugador = new Jugador(this.imagenJ1_stand, (1 * this.cellSize), (1 * this.cellSize), 4, 2, 8);
		//Jugador (sprite,x,y,velocidad,cadencia,margen)
		
		var posiciones = [];
		for (i = 0;i<mapa.jugador.length;i++){
			posiciones[i] = mapa.jugador[i];
		}

		//Return a random number between 1 and 10:
		//Math.floor((Math.random() * 10) + 1);
		var posAleatoria = Math.floor((Math.random() * posiciones.length) + 0);

		this.jugador = new Jugador([imagenJ1_w,imagenJ1_s, imagenJ1_a, imagenJ1_d, imagenJ1_stand],
			(posiciones[posAleatoria].posx * this.cellSize), (posiciones[posAleatoria].posy * this.cellSize), 4, 2, 8);
		//this.jugador2 = new Jugador(imagenJ2, (1 * this.cellSize), (2 * this.cellSize), 4, 2, 8);

		//Casilla (x,y,imagen,movible,destructible)
		for (i = 0;i<this.x;i++){
			this.board[i] = [];
			for (j=0;j<this.y;j++){
				var imagen = new Image();
				imagen.src = "src/"+mapa.filas[j].datos[i].tile+".png";
				if (mapa.filas[j].datos[i].tile === "0"){
					this.board[i][j] = new casilla(i,j,imagen, true, false);
				}else{
					if (mapa.filas[j].datos[i].tile === "1" || mapa.filas[j].datos[i].tile === "C"
					|| mapa.filas[j].datos[i].tile === "8" || mapa.filas[j].datos[i].tile === "9"
					|| mapa.filas[j].datos[i].tile === "A" || mapa.filas[j].datos[i].tile === "B"){
						this.board[i][j] = new casilla(i,j,imagen, false, false);
					}else{
						this.board[i][j] = new casilla(i,j,imagen, false, true);
					}
				}
			}
		}

		//Recorrer posiciones jugador inicio
		//console.log(mapa.jugador[0].posx);
		//console.log(mapa.jugador[0].posy);
		//console.log(mapa.jugador[1].posx);
		//console.log(mapa.jugador[1].posy);

		var boardtemp = [];
		//Ampliamos la board al tamaño del lienzo, de [18][18] pasa a [18*cellSize][18*cellSize] para mayor precision
		for (i = 0;i<this.x*this.cellSize;i++){
			boardtemp[i] = [];
			for (j = 0;j<this.y*this.cellSize;j++){
				//Se copia la imagen de la x,y hasta la x+cellSize-1,y+cellSize-1 para que contengan la misma informacion
				boardtemp[i][j] = this.board[Math.floor(i/this.cellSize)][Math.floor(j/this.cellSize)];
			}
		}
		this.board = boardtemp;
		this.cargado = true;

		//sc (context, board, cellSize, margenBalas, velocidad)
		this.sc.init(this.context,this.board, this.cellSize, 12, 20);
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
		/*
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
		}*/
	}

	this.pintado = function () {
		if (this.cargado){
			///////Falta mover enemigos
			this.moverEnemigos();

			for (i = 0; i < this.x; i++) {
				for (j = 0; j < this.y; j++) {
					this.pintar(this.board[i*this.cellSize][j*this.cellSize].image, i * this.cellSize, j * this.cellSize);
				}
			}

			//Para imprimir el personaje
			this.pintar(this.jugador.cogerSprite(), this.jugador.posx, this.jugador.posy);
			this.jugador.avanzarTiempo();
			//this.pintar(this.jugador2.sprite, this.jugador2.posx, this.jugador2.posy);

			//Impresion de las balas
			this.sc.renderBalas();
		}
	}

	this.pintar = function(img, x, y){
		try{
			this.context.drawImage(img, x, y);
		} catch(err) {
			//Error en el pintado porque aun no se ha cargado la imagen en firefox, en chrome no hay problema
		}
	}
	
	//Pintar en la casilla pinchada
	/*this.onCanvasClick = function (evt) {
		var x = evt.clientX - canvas.offsetLeft;
		var y = evt.clientY - canvas.offsetTop;
		
		//Se divide entre cellSize para coger el menor valor para el board de esa casilla
		//Luego se ira recorriendo en ponerImagenNueva hasta llegar al valor menor+cellSize-1
		var boardX = Math.floor(parseInt(x / cellSize));
		var boardY = Math.floor(parseInt(y / cellSize));
		//console.log(boardX+" "+boardY);
		
		var imagen = null;
		var mov = false;
		
		//estado = tecla del 1 al 8 que selecciona el tile a pintar
		switch (estado){
			case 1:
				imagen = m_vert;
				break;
			case 2:
				imagen = m_hor;
				break;
			case 3:
				imagen = m_ArI;
				break;
			case 4:
				imagen = m_ArD;
				break;
			case 5:
				imagen = m_AbI;
				break;
			case 6:
				imagen = m_AbD;
				break;
			case 7:
				imagen = m_Fondo;
				mov = true;
				break;
		}
		if (imagen !== null)
			m.ponerImagenNueva(boardX*cellSize, boardY*cellSize, imagen, mov);
		
		m.pintado();
	}*/
	
	/*this.ponerImagenNueva = function (x, y, ima, m) {
		//console.log(board);
		for (i = 0;i<cellSize;i++){
			for (j = 0;j<cellSize;j++){
				board[x+i][y+j].setImagen(ima, m);
			}
		}
	}*/
	
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

	}
	
	this.disparar = function (jugador) {
		if (jugador.canShoot()){
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
			jugador.shoot();
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
}