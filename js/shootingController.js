function shootingController(context){
	this.context = context;
	this.balas = [];

	//Disparo, crea una bala en la direccion indicada, desde la posicion dada
	this.shoot = function (x,y,dir,image){
		this.balas[this.balas.length] = new bala(x,y,dir,image);
	}
	//Recorre el array de balas y las mueve todas
	this.renderBalas = function(){
		if (this.balas != null){
			for(var i=0; i<this.balas.length;i++){   //Recorre el array de balas
				switch(this.balas[i].dir){           //Mueve la bala
					case 0:
						this.balas[i].y -= this.balas[i].vel;
						break;
					case 1:
						this.balas[i].y += this.balas[i].vel;
						break;
					case 2:
						this.balas[i].x -= this.balas[i].vel;
						break;
					case 3:
						this.balas[i].x += this.balas[i].vel;
						break;
				}
				
				//console.log(balas[i].image);
				try {
					this.context.drawImage(this.balas[i].image, this.balas[i].x, this.balas[i].y);
					} catch(err) {}
				
				
				//colision(balas[i]); //Comprueba colision de esa bala
			}
		}
	}
	
	var colision = function(bala){
		//Si la bala está en una casilla con un objeto, se destruye ella y el objeto con el que ha chocado
	}
}