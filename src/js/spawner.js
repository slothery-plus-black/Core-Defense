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
    var vel1 = 2;
    var vel2 = 2;
    var vel3 = 2;
    var cad1 = 0.5;
    var cad2 = 0.5;
    var cad3 = 0.5;
    
   switch(dificultad){
        case 0:   //dificultad fácil(1), medio(2),etc
            vida1 = 1;
            vida2 = 1;
            vida3 = 3;
            vel1 = 1;
            vel2 = 2;
            vel3 = 1;
            cad1 = 0.7;
            cad2 = 0.5;
            
            probabilidad1 = 8; 
            probabilidad2 = 1.5;
            probabilidad3 = 0.5;
            
            diferencia = 5;
            vInicial = 5;
        
          break;
        case 1:   //dificultad fácil(1), medio(2),etc
            vida1 = 1;
            vida2 = 2;
            vida3 = 4;
            vel1 = 2;
            vel2 = 3;
            vel3 = 1;
            cad1 = 0.6;
            cad2 = 0.4;
            
            probabilidad1 = 7;
            probabilidad2 = 2; 
            probabilidad3 = 1; 
            
            diferencia = 4;
            vInicial = 4;
        
          break;
        case 2: //dificultad fácil(1), medio(2),etc
            vida1 = 2;
            vida2 = 3;
            vida3 = 5;
            vel1 = 3;
            vel2 = 4;
            vel3 = 2;
            cad1 = 0.5;
            cad2 = 0.3;
            
            probabilidad1 = 6;
            probabilidad2 = 2.5;
            probabilidad3 = 1.5;
            
            diferencia = 3;
            vInicial = 3;
        
          break;
        case 3:  //dificultad fácil(1), medio(2),etc
            vida1 = 2;
            vida2 = 4;
            vida3 = 6;
            vel1 = 3;
            vel2 = 5;
            vel3 = 2;
            cad1 = 0.4;
            cad2 = 0.3;
            
            probabilidad1 = 5; 
            probabilidad2 = 3;  
            probabilidad3 = 2; 
            
            diferencia = 2;
            vInicial = 3;
        
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
        {_this.enemigos[_this.enemigos.length] = new Enemigo1(x,y, vel1, cad1, 8,vida1,spritesAnimacionDestruccion,"g");}
        
        //Aparicion de virus
        random = (Math.random() * 10);
        if (random<probabilidad2)
        {_this.enemigos[_this.enemigos.length] = new Enemigo2(x,y, vel2, cad2, 8,vida2,spritesAnimacionDestruccion,"v");}
        
        
        //Aparición del troyano
         random = (Math.random() * 10);
        if (random<probabilidad3)
        {_this.enemigos[_this.enemigos.length] = new Enemigo3(x,y, vel3, cad3, 8,vida3,spritesAnimacionDestruccion,this,"t");}
        
        
        this.start(x,y,spritesAnimacionDestruccion);
    }
    
    //Función llamada por un troyano a la hora de soltar su carga
    this.spawnearGusano = function(_this, x,y,spritesAnimacionDestruccion){
        //Aparición de gusanos
        random = (Math.random() * 10);
        if(random<probabilidad1)
        {_this.enemigos[_this.enemigos.length] = new Enemigo1(x,y, vel1, cad1, 8,vida1,spritesAnimacionDestruccion,"g");}
        
        //Aparicion de virus
        else if((random>=probabilidad1)&&(random<(probabilidad2+probabilidad1+probabilidad3)))
        {_this.enemigos[_this.enemigos.length] = new Enemigo2(x,y, vel2, cad2, 8,vida2,spritesAnimacionDestruccion,"v");}
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
