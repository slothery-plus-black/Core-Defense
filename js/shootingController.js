//Objeto shootingController, controlara las balas y su pintado
function shootingController(){
	this.context;
	this.balas;

	this.init = function (context){
		this.context = context;
		this.balas = [];
	}
	
	//Disparo, crea una bala en la direccion indicada, desde la posicion dada
	this.shoot = function (x,y,dir,image){

		this.balas[this.balas.length] = new bala(x,y,dir,image);
	}
	//Recorre el array de balas y las mueve todas
	this.renderBalas = function(){
		if (this.balas != null){
			for(var i=0; i<this.balas.length;i++){
				this.balas[i].aplicarVelocidad();
				
				try {
					this.context.drawImage(this.balas[i].aplicarAnimacion(), this.balas[i].x, this.balas[i].y);
				} catch(err) {
					//Error en el pintado porque aun no se ha cargado la imagen en firefox, en chrome no hay problema
				}

				//Comprueba colision de esa bala
				colision(this.balas[i]);
			}
		}
	}
	
	var colision = function(bala){
		//Si la bala está en una casilla con un objeto, se destruye ella y el objeto con el que ha chocado
	}
}