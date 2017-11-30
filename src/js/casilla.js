//Objeto casilla, con la imagen y si se puede mover por ella
function casilla(nombre,x,y,image,mov,destructible,srcImagenes, core) {
	this.nombre = nombre;
	this.movible = mov;
	this.image = image;
	this.x = x;
	this.y = y;
	this.destructible = destructible;
	this.golpes = 0;
	this.srcImagenes = srcImagenes;
	this.destruido = false;

	this.core = core;
	
	this.setImagen = function(image, mov){
		this.image = image;
		this.movible = mov;
	}

	this.golpear = function(){
		if (this.destructible && !this.destruido){
			if (this.core){
				this.golpes = 3;
			}else{
				this.golpes++;
			}

			if (this.golpes === 3){
				this.destruido = true;
				this.destruir();
			}else{
				var img = new Image();
				img.src = this.srcImagenes+""+this.nombre+"-"+this.golpes+".png";
				this.setImagen(img,false);
			}
		}
	}

	this.destruir = function(){
		
		var _this = this;

		//Se va a llamar a si misma para ir avanzando la animacion de destruccion del tile
		setTimeout(function(){
			if (_this.golpes === 6){
				var img = new Image();
				img.src = _this.srcImagenes+""+_this.nombre+"-"+_this.golpes+".png";
				_this.setImagen(img,true);
			}else{
				var img = new Image();
				img.src = _this.srcImagenes+""+_this.nombre+"-"+_this.golpes+".png";
				_this.setImagen(img,false);
				_this.golpes++;
				_this.destruir();
			}
		}, 50);
	}
}