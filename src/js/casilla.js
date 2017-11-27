//Objeto casilla, con la imagen y si se puede mover por ella
function casilla(nombre,x,y,image,mov,destructible,srcImagenes) {
	this.nombre = nombre;
	this.movible = mov;
	this.image = image;
	this.x = x;
	this.y = y;
	this.destructible = destructible;
	this.golpes = 0;
	this.srcImagenes = srcImagenes;
	
	this.setImagen = function(image, mov){
		this.image = image;
		this.movible = mov;
	}

	this.golpear = function(){
		if (this.destructible){
			this.golpes++;

			if (this.golpes === 3){
				this.destruir();
			}else{
				var img = new Image();
				img.src = this.srcImagenes+""+this.nombre+"_"+this.golpes+".png";
				this.setImagen(img,false);
			}
		}
	}

	this.destruir = function(){
		var img = new Image();
		img.src = this.srcImagenes+"0.png";
		this.setImagen(img,true);
	}
}