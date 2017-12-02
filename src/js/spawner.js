//Spawner
function gusanoSpawner(arrayEnemigos) {
    this.enemigos = arrayEnemigos;
    this.timer = undefined;
    this.timerReinicio = undefined;
    var random;
    var probabilidad1 = 2;  //Probabilidad del 20%, para los gusanos
    var probabilidad2 = 0.4;    //4%, para los 
    this.start = function(x,y,spriteG,spriteV,spriteT,spritesAnimacionDestruccion){
        
        this.timer = setInterval(function(_this) {
            _this.crearEnemigo(_this,x,y,spriteG,spriteV,spriteT,spritesAnimacionDestruccion);
        }, 4000, this);

    }
    
    this.crearEnemigo = function(_this, x,y,spritesAnimacionDestruccion){
        //Aparición de gusanos
        random = (Math.random() * 10);
        if (random<probabilidad1)
        {_this.enemigos[_this.enemigos.length] = new Enemigo1(x,y, 2, 0.5, 8,1,spritesAnimacionDestruccion);}
        
        //Aparicion de virus
        random = (Math.random() * 10);
        if (random<probabilidad2)
        {_this.enemigos[_this.enemigos.length] = new Enemigo2(x,y, 2, 0.5, 8,1,spritesAnimacionDestruccion);}
        
        
        //Aparición del troyano
         random = (Math.random() * 10);
        if (random<probabilidad2)
        {_this.enemigos[_this.enemigos.length] = new Enemigo3(x,y, 2, 0.5, 8,3,spritesAnimacionDestruccion,this);}
        
        
        //Aumentar probabilidad
        probabilidad1 +=0.02;
        probabilidad2 +=0.01;
    }

    this.verificarMuertes = function(){
        for (var i = 0;i<this.enemigos.length;i++){
            if (this.enemigos[i].vida == 0){
                
                this.enemigos[i].destruir();
            }

            /*if (this.enemigos[i].vida < 0){
                
                this.enemigos.splice(i,1);
            }*/
        }
    }
    
}