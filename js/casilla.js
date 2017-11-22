//Objeto casilla, con la imagen y si se puede mover por ella
function casilla(imagen,mov) {
	//this.stat = 0;
	/*var aliveTime = 0;
	this.turnoMas = function () {
		aliveTime++;
	}
	this.getTiempo = function () {
		return aliveTime;
	}
	this.setTiempo = function (time) {
		aliveTime = time + 1;
	}*/
	this.movible = mov;
	this.image = imagen;
	
	this.setImagen = function(imagen, mov){
		this.image = imagen;
		this.movible = mov;
	}
}