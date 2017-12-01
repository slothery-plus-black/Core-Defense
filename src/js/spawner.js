//Spawner
function gusanoSpawner(arrayEnemigos) {
    this.enemigos = arrayEnemigos;
    this.timer = undefined;
    this.timerReinicio = undefined;
    var random;
    var probabilidad1 = 2;  //Probabilidad del 20%, para los gusanos
    var probabilidad2 = 0.4;    //4%, para los 
    this.start = function(x,y,spriteG,spriteV,spriteT){
        
        this.timer = setInterval(function(_this) {
            _this.crearEnemigo(_this,x,y,spriteG,spriteV,spriteT);
        }, 4000, this);

    }
    
    this.crearEnemigo = function(_this, x,y, spriteGusano,spriteVirus,spriteTroyano){
        //Aparición de gusanos
        random = (Math.random() * 10);
        if (random<probabilidad1)
        {_this.enemigos[_this.enemigos.length] = new Enemigo1(spriteGusano,x,y, 2, 0.5, 8,1);}
        
        //Aparicion de virus
        random = (Math.random() * 10);
        if (random<probabilidad2)
        {_this.enemigos[_this.enemigos.length] = new Enemigo2(spriteVirus,x,y, 2, 0.5, 8,1);}
        
        //Aparición del troyano
         random = (Math.random() * 10);
        if (random<probabilidad2)
        {_this.enemigos[_this.enemigos.length] = new Enemigo3(spriteTroyano,x,y, 2, 0.5, 8,1,this);}
        
        //Aumentar probabilidad
        probabilidad1 +=0.02;
        probabilidad2 +=0.01;
    }

    this.verificarMuertes = function(){
        for (var i = 0;i<this.enemigos.length;i++){
            if (this.enemigos[i].vida <= 0){
                this.enemigos.splice(i,1);
            }
        }
    }
    
}