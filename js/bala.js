//Objeto bala, tiene su sprite, sus posiciones en x e, ademas de la velocidad y animacion
function bala(x,y,dir,imagen, vel){
	this.x = x;
	this.y = y;
	this.dir = dir;
	this.animacion = 0;
	this.image = imagen;
	this.vel = vel;

    //Mueve la bala
	this.aplicarVelocidad = function(){
		switch(this.dir){
			case 0:
				this.y -= this.vel;
				break;
			case 1:
				this.y += this.vel;
				break;
			case 2:
				this.x -= this.vel;
				break;
			case 3:
				this.x += this.vel;
				break;
		}
	}

    //Cambia el sprite de la bala
	this.aplicarAnimacion = function(){
		this.animacion++;

		if (this.animacion === this.image.length){
			this.animacion = 0;
		}

		return this.image[this.animacion];
	}
}