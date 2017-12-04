//Spawner
function gusanoSpawner(arrayEnemigos,dificultad) {
    _this = this;
    this.enemigos = arrayEnemigos;
    this.timer = undefined;
    this.timerReinicio = undefined;
    var random = 0;
    var probabilidad1 = 8;  //Probabilidad del 80%, para los gusanos
    var probabilidad2 = 1;    //10% para los virus
    var probabilidad3 = 1;    //10% para los troyanos
    var stop = false;
    var dificultad = dificultad;
    var diferencia = 5;
    var vInicial = 4;
            //falta acabar el switch y pasar los valores a los constructores
    //Agrégale los valores a los constructor
    var vida1 = 1;
    var vida2 = 1;
    var vida3 = 3;
    var vel1;
    var vel2;
    var vel3;
    var cad1;
    var cad2;
    var cad3;
    
    switch(dificultad){
        case 1:{    //dificultad fácil(1), medio(2),etc
            vida1 = 1;
            vida2 = 1;
            vida3 = 3;
            //etc
        }
            break;
    }
    
    
    this.start = function(x,y,spritesAnimacionDestruccion){
        if(!stop){
            
            
            random = ((Math.random() * diferencia)+vInicial);
            this.timer = setTimeout(function(_this) {
            _this.crearEnemigo(_this,x,y,spritesAnimacionDestruccion);
            }, random*1000, this); 
            
        }
        

    }
    this.stop = function(){
        stop = true;
    }
    
    this.crearEnemigo = function(_this, x,y,spritesAnimacionDestruccion){
        
        //Aparición de gusanos
        random = (Math.random() * 10);

        if (random<probabilidad1)
        {_this.enemigos[_this.enemigos.length] = new Enemigo1(x,y, 2, 0.5, 8,1,spritesAnimacionDestruccion,"g");}
        
        //Aparicion de virus
        random = (Math.random() * 10);
        if (random<probabilidad2)
        {_this.enemigos[_this.enemigos.length] = new Enemigo2(x,y, 2, 0.5, 8,1,spritesAnimacionDestruccion,"v");}
        
        
        //Aparición del troyano
         random = (Math.random() * 10);
        if (random<probabilidad3)
        {_this.enemigos[_this.enemigos.length] = new Enemigo3(x,y, 2, 0.5, 8,3,spritesAnimacionDestruccion,this,"t");}
        
        
        this.start(x,y,spritesAnimacionDestruccion);
    }
    
    //Función llamada por un troyano a la hora de soltar su carga
    this.spawnearGusano = function(_this, x,y,spritesAnimacionDestruccion){
        //Aparición de gusanos
        random = (Math.random() * 10);
        if(random<probabilidad1)
        {_this.enemigos[_this.enemigos.length] = new Enemigo1(x,y, 2, 0.5, 8,vida1,spritesAnimacionDestruccion,"g");}
        
        //Aparicion de virus
        else if((random>=probabilidad1)&&(random<(probabilidad2+probabilidad1+probabilidad3)))
        {_this.enemigos[_this.enemigos.length] = new Enemigo2(x,y, 2, 0.5, 8,vida2,spritesAnimacionDestruccion,"v");}
    }

    this.verificarMuertes = function(){
        for (var i = 0;i<this.enemigos.length;i++){
            if (this.enemigos[i].vida == 0){
                this.enemigos[i].destruir(this,i);
            }
        }
    }
    this.kill = function(i){
        this.enemigos.splice(i,1);
    }
    
}