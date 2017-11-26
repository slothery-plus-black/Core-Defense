//Objeto casilla, con la imagen y si se puede mover por ella
function casilla(x,y,imagen,mov,destructible) {
	this.movible = mov;
	this.image = imagen;
	this.x = x;
	this.y = y;
	this.destructible = destructible;
	this.golpes = 3;
	
	this.setImagen = function(imagen, mov){
		this.image = imagen;
		this.movible = mov;
	}

	this.golpear = function(){
		if (this.destructible){
			this.golpes--;
			if (this.golpes === 0){
				this.destruir();
			}
		}
	}

	this.destruir = function(){
		var img = new Image();
		img.src = "src/0.png";
		this.setImagen(img,true);
	}
}