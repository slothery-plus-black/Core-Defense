//Spawner
function gusanoSpawner(arrayEnemigos) {
    this.enemigos = arrayEnemigos;
    this.timer = undefined;
    this.timerReinicio = undefined;
    var random;
    var probabilidad1 = 2;  //Probabilidad del 20%, para los gusanos
    var probabilidad2 = 0.4;    //4%, para los 
    this.start = function(x,y,sprite){
        
        this.timer = setInterval(function(_this) {
            _this.crearEnemigo(_this,x,y,sprite);
        }, 4000, this);

    }
    
    this.crearEnemigo = function(_this, x,y, sprite){
        //Aparición de gusanos
        random = (Math.random() * 10);
        if (random<probabilidad1)
        {_this.enemigos[_this.enemigos.length] = new Enemigo1(sprite,x,y, 2, 0.5, 8);}
        
        //Aparicion de virus
        random = (Math.random() * 10);
        if (random<probabilidad2)
        {_this.enemigos[_this.enemigos.length] = new Enemigo2(sprite,x,y, 2, 0.5, 8);}
        
        //Aparición del troyano
         random = (Math.random() * 10);
        if (random<probabilidad2)
        {_this.enemigos[_this.enemigos.length] = new Enemigo3(sprite,x,y, 2, 0.5, 8,this);}
        
        //Aumentar probabilidad
        probabilidad1 +=0.02;
        probabilidad2 +=0.01;
    }
    
}