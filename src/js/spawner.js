//Spawner
function gusanoSpawner(arrayEnemigos) {
    var enemigos = arrayEnemigos;
	var cadencia = 1;
    
    this.start = function(x,y){
        setInterval(crearEnemigo(x,y), 2000/cadencia);
        setInterval(aumentar(), 10000);
    }
    
    var crearEnemigo = function(x,y){
        enemigos[enemigos.length] = new Enemigo1(enemigo1_stand,x,y, 2, 0.5, 8);
    }
    
    var aumentar = function(){
        cadencia++;
    }
    
}