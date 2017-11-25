//Objeto mundo, contiene el mapa y los objetos que lo contiene.
function mundo() {
	this.board = [];
	this.jugador;
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
		//Aqui hay que leer la estructura del mapa y cargarlo
		this.board = [];
		
		this.context = context;

		this.sc.init(this.context);
		
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

		var imagenJ = new Image();
		imagenJ.src = "src/sprite1.png";
		
		this.jugador = new Jugador(imagenJ, (1 * this.cellSize), (1 * this.cellSize), 4);

		for (i = 0;i<this.x;i++){
			this.board[i] = [];
			for (j=0;j<this.y;j++){
				var imagen = new Image();
				imagen.src = "src/"+mapa.filas[j].datos[i].tile+".png";
				if (mapa.filas[j].datos[i].tile === "0"){
					this.board[i][j] = new casilla(imagen, true);
				}else{
					this.board[i][j] = new casilla(imagen, false);
				}
			}
		}
		
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
	}

	this.mover = function (keysDown) {
		//w
		if (keysDown[87]){
			this.moverJugador(0);
		}
		//s
		if (keysDown[83]){
			this.moverJugador(1);
		}
		//a
		if (keysDown[65]){
			this.moverJugador(2);
		}
		//d
		if (keysDown[68]){
			this.moverJugador(3);
		}
		//f
		if (keysDown[70]){
			this.disparar();
		}
		//espacio
		if (keysDown[32]){
			this.disparar();
		}
	}

	this.pintado = function () {
		if (this.cargado){
			for (i = 0; i < this.x; i++) {
				for (j = 0; j < this.y; j++) {
					//context.globalAlpha = 1.0;
					try {
						this.context.drawImage(this.board[i*this.cellSize][j*this.cellSize].image, i * this.cellSize, j * this.cellSize);
					} catch(err) {
						//Error en el pintado porque aun no se ha cargado la imagen en firefox, en chrome no hay problema
					}
				}
			}

			//Para imprimir el personaje
			try {
				this.context.drawImage(this.jugador.sprite, this.jugador.posx, this.jugador.posy);
			} catch(err) {
				//Error en el pintado porque aun no se ha cargado la imagen en firefox, en chrome no hay problema
			}
			
			//Impresion de las balas
			this.sc.renderBalas();
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
	
	//Devuelve si tiene un bloque o lo que sea.
	/*this.hasBlock = function(x,y) {
		return this.board[x][y];
	}*/
	
	//0 arriba, 1 abajo, 2 izquierda y 3 derecha
	this.moverJugador = function (num) {
		//Actualiza la direccion en la que mira
		this.jugador.dir=num;
		var jxOriginal = this.jugador.posx;
		var jyOriginal = this.jugador.posy;
		
		switch (this.jugador.dir){
			case 0:
				this.jugador.posy = this.jugador.posy - this.jugador.velocidad;
				if (this.jugador.posy < 0)
				this.jugador.posy = 0;
				break;
			case 1:
				this.jugador.posy = this.jugador.posy + this.jugador.velocidad;
				if (this.jugador.posy >= (this.y*this.cellSize)-this.jugador.velocidad)
					this.jugador.posy = (this.y*this.cellSize)-this.jugador.velocidad;
				break;
			case 2:
				this.jugador.posx = this.jugador.posx - this.jugador.velocidad;
				if (this.jugador.posx < 0)
					this.jugador.posx = 0;
				break;
			case 3:
				this.jugador.posx = this.jugador.posx + this.jugador.velocidad;
				if (this.jugador.posx >= (this.x*this.cellSize)-this.jugador.velocidad)
					this.jugador.posx = (this.x*this.cellSize)-this.jugador.velocidad;
				break;
		}
		
		if (this.board[this.jugador.posx][this.jugador.posy].movible === false
		|| this.board[this.jugador.posx+this.cellSize-1][this.jugador.posy+this.cellSize-1].movible === false
		|| this.board[this.jugador.posx][this.jugador.posy+this.cellSize-1].movible === false
		|| this.board[this.jugador.posx+this.cellSize-1][this.jugador.posy].movible === false){
			this.jugador.posx = jxOriginal;
			this.jugador.posy = jyOriginal;
		}
	}
	
	this.disparar = function () {
		switch(this.jugador.dir){
			case 0:
				this.sc.shoot(this.jugador.posx, this.jugador.posy, this.jugador.dir, [this.imagenBala_1w,this.imagenBala_2w,this.imagenBala_3w]);
				break;
			case 1:
				this.sc.shoot(this.jugador.posx, this.jugador.posy, this.jugador.dir, [this.imagenBala_1s,this.imagenBala_2s,this.imagenBala_3s]);
				break;
			case 2:
				this.sc.shoot(this.jugador.posx, this.jugador.posy, this.jugador.dir, [this.imagenBala_1a,this.imagenBala_2a,this.imagenBala_3a]);
				break;
			case 3:
				this.sc.shoot(this.jugador.posx, this.jugador.posy, this.jugador.dir, [this.imagenBala_1d,this.imagenBala_2d,this.imagenBala_3d]);
				break;
		}
	}
}