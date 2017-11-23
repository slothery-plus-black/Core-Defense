function shootingController(){
	//Disparo, crea una bala en la direccion indicada, desde la posicion dada
	this.shoot = function (x,y,dir,image){
		balas[balas.length] = new bala(x,y,dir,image);
	}
	//Recorre el array de balas y las mueve todas
	this.renderBalas = function(){
		if (balas != null){
			for(var i=0; i<balas.length;i++){   //Recorre el array de balas
				switch(balas[i].dir){           //Mueve la bala
					case 0:
						balas[i].y -= balas[i].vel;
						break;
					case 1:
						balas[i].y += balas[i].vel;
						break;
					case 2:
						balas[i].x -= balas[i].vel;
						break;
					case 3:
						balas[i].x += balas[i].vel;
						break;
				}
				
				//console.log(balas[i].image);
				context.drawImage(balas[i].image, balas[i].x, balas[i].y);
				
				//colision(balas[i]); //Comprueba colision de esa bala
			}
		}
	}
	
	var colision = function(bala){
		//Si la bala está en una casilla con un objeto, se destruye ella y el objeto con el que ha chocado
	}
}