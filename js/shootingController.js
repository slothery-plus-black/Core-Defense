//Objeto shootingController, controlara las balas y su pintado
function shootingController(){
	this.context;
	this.balas;
	this.cellSize;
	this.board;
	this.margenBala;

	this.init = function (context,board,cellSize,margen){
		this.context = context;
		this.balas = [];
		this.board = board;
		this.cellSize = cellSize;
		this.margenBala = margen;
	}
	
	//Disparo, crea una bala en la direccion indicada, desde la posicion dada
	this.shoot = function (x,y,dir,image){

		this.balas[this.balas.length] = new bala(x,y,dir,image);
	}
	//Recorre el array de balas y las mueve todas
	this.renderBalas = function(){
		if (this.balas != null){
			for(var i=0; i<this.balas.length;i++){
				if (this.colision(this.balas[i])){
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
	
	this.colision = function(bala,margen){
		//Si la bala está en una casilla con un objeto, se destruye ella y el objeto con el que ha chocado
		if (this.board[bala.x+this.margenBala][bala.y+this.margenBala].movible === false
		|| this.board[bala.x+this.cellSize-this.margenBala][bala.y+this.cellSize-this.margenBala].movible === false
		|| this.board[bala.x+this.margenBala][bala.y+this.cellSize-this.margenBala].movible === false
		|| this.board[bala.x+this.cellSize-this.margenBala][bala.y+this.margenBala].movible === false){
			return true;
		}else{
			return false;
		}
	}

	this.cogerBalas = function(){
		return this.balas;
	}
	
	this.removeBala = function(bala,pos){
		this.balas.splice(pos,1);
	}
}