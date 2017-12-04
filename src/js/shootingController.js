//Objeto shootingController, controlara las balas y su pintado
function shootingController(){
	this.context;
	this.balas;
	this.cellSize;
	this.board;
	this.margenBala;
	this.velocidad;
	this.mundo;

	this.init = function (context,board,cellSize,margen,velocidad, mundo){
		this.context = context;
		this.balas = [];
		this.board = board;
		this.cellSize = cellSize;
		this.margenBala = margen;
		this.velocidad = velocidad;
		this.mundo = mundo;
	}
	
	//Disparo, crea una bala en la direccion indicada, desde la posicion dada
	this.shoot = function (x,y,dir,image){
		this.balas[this.balas.length] = new bala(x,y,dir,image,this.velocidad);
	}

	//Recorre el array de balas y las mueve todas
	this.renderBalas = function(){
		if (this.balas != null){
			for(var i=0; i<this.balas.length;i++){
				if (this.colision(this.balas[i])){

					this.golpearBoard(this.balas[i]);
					this.removeBala(this.balas[i],i);
					
				}else{
					this.balas[i].aplicarVelocidad();
					
					try {
						this.context.drawImage(this.balas[i].aplicarAnimacion(), this.balas[i].x, this.balas[i].y);
					} catch(err) {
						//Error en el pintado porque aun no se ha cargado la imagen en firefox, en chrome no hay problema
					}
				}
			}
		}
	}
	
	this.colision = function(bala){
		//Si la bala está en una casilla con un objeto, se destruye ella y el objeto con el que ha chocado
		//Arriba izquierda
		if (!this.board[bala.x+this.margenBala][bala.y+this.margenBala].movible){
			return true;
		}
		//Abajo derecha
		if (!this.board[bala.x+this.cellSize-this.margenBala][bala.y+this.cellSize-this.margenBala].movible){
			return true;
		}
		//Abajo izquierda
		if (!this.board[bala.x+this.margenBala][bala.y+this.cellSize-this.margenBala].movible){
			return true;
		}
		//Arriba derecha
		if (!this.board[bala.x+this.cellSize-this.margenBala][bala.y+this.margenBala].movible){
			return true;
		}
		
		return false;
	}

	this.golpearBoard = function(bala){
		//Arriba izquierda
		if (!this.board[bala.x+this.margenBala][bala.y+this.margenBala].movible){
			this.board[bala.x+this.margenBala][bala.y+this.margenBala].golpear();
			return;
		}
		//Abajo derecha
		if (!this.board[bala.x+this.cellSize-this.margenBala][bala.y+this.cellSize-this.margenBala].movible){
			this.board[bala.x+this.cellSize-this.margenBala][bala.y+this.cellSize-this.margenBala].golpear();
			return;
		}
		//Abajo izquierda
		if (!this.board[bala.x+this.margenBala][bala.y+this.cellSize-this.margenBala].movible){
			this.board[bala.x+this.margenBala][bala.y+this.cellSize-this.margenBala].golpear();
			return;
		}
		//Arriba derecha
		if (!this.board[bala.x+this.cellSize-this.margenBala][bala.y+this.margenBala].movible){
			this.board[bala.x+this.cellSize-this.margenBala][bala.y+this.margenBala].golpear();
			return;
		}
	}
	
	this.removeBala = function(bala,pos){
		this.balas.splice(pos,1);
	}

	this.colisionObjeto = function(objeto){
		//Si la bala está en una casilla con un objeto, se destruye ella y el objeto con el que ha chocado
		if (objeto.vida > 0){
			for (var i = 0;i<this.balas.length;i++){
				if (this.balas[i].colisionObjeto(objeto,this.cellSize,this.margenBala)){
					////////////////////Administrar puntuacion falta

					if (objeto.vida <= 0){
						this.mundo.sumarPuntuacion(objeto.tipo);
					}

					this.removeBala(this.balas[i],i);
				}
			}
		}
	}

	this.colisionEnemigos = function(enemigos){
		//Si la bala está en una casilla con un objeto, se destruye ella y el objeto con el que ha chocado
		for (var i = 0; i<enemigos.length;i++){
			this.colisionObjeto(enemigos[i]);
		}
		
	}
}