//Objeto mundo, contiene el mapa y los objetos que lo contiene.
function mundo() {
	this.board = [];
	this.jugador;
	this.cellSize = 40; //No se especifica ancho ni alto por que seran cuadradras, cellsize*cellsize. 
	this.x = (720) / this.cellSize, //Número de CASILLAS horizontales
	this.y = this.x; //Verticales

	this.context;
	// var hcells = x; //número de células horizontales
	// var y = y; //número de células verticales
	this.sc = new shootingController();
	this.cargado = false;

	this.m_fondo = new Image();

	this.initMundo = function (context, mapa) {
		//Aqui hay que leer la estructura del mapa y cargarlo
		this.board = [];

		this.m_fondo.src = 'src/personaje_1.png';

		this.context = context;

		var imagenJ = new Image();
		var tileJ = "src/sprite1.png";
		imagenJ.src = tileJ;
		
		this.jugador = new Jugador(imagenJ, (1 * this.cellSize), (1 * this.cellSize), 4);

		for (i = 0;i<this.x;i++){
			//console.log("Resultados de la fila "+mapa.filas[i].fila);
			this.board[i] = [];
			for (j=0;j<this.y;j++){
				var imagen = new Image();
				var tile = "src/"+mapa.filas[i].datos[j].tile+".png";
				imagen.src = tile;
				if (mapa.filas[i].datos[j].tile === "0"){
					this.board[i][j] = new casilla(imagen, true);
				}else{
					this.board[i][j] = new casilla(imagen, false);
				}
				
				//console.log("Columna "+mapa.filas[i].datos[j].columna+" y tile "+mapa.filas[i].datos[j].tile);
			}
		}

		/*for (i = 0; i < x; i++) {
			board[i] = [];
			
			for (j = 0; j < y; j++) {
				board[i][j] = new casilla(m_Fondo, true); //CREA UNA casilla VACIA
				
				//Prueba para poner un jugador
				if (i === 1 && j ===1){
					//Velocidad del jugador debe ser multiplo de cellsize
					jugador = new Jugador(personaje_1, (i * cellSize), (j * cellSize), 4);
				}
				
				//Falta leer el json y cargar el mapa a partir de aqui
				
				//Bordes
				if (i === 0 || i === x-1){
					board[i][j] = new casilla(m_Bordes, false);
				}
				if (j === 0 || j === y-1){
					board[i][j] = new casilla(m_Bordes, false);
				}
				
				//Esquinas
				if (i === 0 && j ===0){
					board[i][j] = new casilla(m_Bordes, false);
				}
				
				if (i === x-1 && j ===0){
					board[i][j] = new casilla(m_Bordes, false);
				}
				
				if (i === 0 && j ===y-1){
					board[i][j] = new casilla(m_Bordes, false);
				}
				
				if (i === x-1 && j ===y-1){
					board[i][j] = new casilla(m_Bordes, false);
				}
				
				//Apariciones
				if (i === 8 && j === 0){
					board[i][j] = new casilla(m_Aparicion, false);
				}
				if (i === 9 && j === 0){
					board[i][j] = new casilla(m_Aparicion, false);
				}
				if (i === 0 && j === 8){
					board[i][j] = new casilla(m_Aparicion, false);
				}
				if (i === 0 && j === 9){
					board[i][j] = new casilla(m_Aparicion, false);
				}
				
				if (i === 8 && j === 17){
					board[i][j] = new casilla(m_Aparicion, false);
				}
				if (i === 9 && j === 17){
					board[i][j] = new casilla(m_Aparicion, false);
				}
				if (i === 17 && j === 8){
					board[i][j] = new casilla(m_Aparicion, false);
				}
				if (i === 17 && j === 9){
					board[i][j] = new casilla(m_Aparicion, false);
				}
				
				//Centro
				if (i === 8 && j === 8){
					board[i][j] = new casilla(m_Core0, false);
				}
				if (i === 9 && j === 8){
					board[i][j] = new casilla(m_Core1, false);
				}
				if (i === 8 && j === 9){
					board[i][j] = new casilla(m_Core2, false);
				}
				if (i === 9 && j === 9){
					board[i][j] = new casilla(m_Core3, false);
				}
			}
		}*/
		
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

	this.isCargado = function (){
		return this.cargado;
	}

	this.pintado = function () {
		if (this.cargado){
			for (i = 0; i < this.x; i++) {
				for (j = 0; j < this.y; j++) {
					//Caso 0 el que no tiene nada, los demás los diferentes tiles
					/*switch (board[i][j].image){
						case 0:
							context.fillStyle = "rgb(100,100,100)";
							context.fillRect(i * cellSize + extra, j * cellSize + extra, cellSize - extra, cellSize - extra);
							break;
						case 1:
							context.drawImage(m_vert,i * cellSize, j * cellSize);
							break;
						case 2:
							context.drawImage(m_hor,i * cellSize, j * cellSize);
							break;
						case 3:
							context.drawImage(m_ArI,i * cellSize, j * cellSize);
							break;
						case 4:
							context.drawImage(m_ArD,i * cellSize, j * cellSize);
							break;
						case 5:
							context.drawImage(m_AbI,i * cellSize, j * cellSize);
							break;
						case 6:
							context.drawImage(m_AbD,i * cellSize, j * cellSize);
							break;
						case 7:
							context.drawImage(m_Fondo,i * cellSize, j * cellSize);
							break;
						case 8:
							context.drawImage(m_Origen,i * cellSize, j * cellSize);
							break;
					}*/
					//context.globalAlpha = 1.0;
					//console.log("i "+i+" j "+j);
					//console.log(board[i][j]);
					//if (this.context != null)
					try {
						this.context.drawImage(this.board[i*this.cellSize][j*this.cellSize].image, i * this.cellSize, j * this.cellSize);
						} catch(err) {}
						
						//console.log("i "+i+" j "+j);
						//console.log("i "+i*this.cellSize+" j "+j*this.cellSize);
				}
			}

			//console.log(this.board);
			
			//Para imprimir si tiene algun personaje
			//if (this.jugador !== null){
				//context.globalAlpha = 0.7;
				//if (this.context != null)
				try {
					this.context.drawImage(this.jugador.sprite, this.jugador.posx, this.jugador.posy);
					} catch(err) {}
					
			//}
			
			//Balas
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
	this.hasBlock = function(x,y) {
		return this.board[x][y];
	}
	
	//0 arriba, 1 abajo, 2 izquierda y 3 derecha
	this.moverJugador = function (num) {
		this.jugador.dir=num;           //Actualiza la direccion en la que mira
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
		this.sc.shoot(this.jugador.posx,this.jugador.posy,this.jugador.dir, m_Bala);
	}
}