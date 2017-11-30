//Spawner
function gusanoSpawner(arrayEnemigos) {
    this.enemigos = arrayEnemigos;
    this.cadencia = 1;
    this.timer = undefined;
    this.timerReinicio = undefined;
    
    this.start = function(x,y,sprite){
        //var _this = this;
        //setInterval(this.crearEnemigo(_this, x,y,sprite), 2000/this.cadencia);
        //setInterval(this.aumentar(), 10000);

        this.timer = setInterval(function(_this) {
            _this.crearEnemigo(_this,x,y,sprite);
        }, 2000/this.cadencia, this);

        this.timerReinicio = setInterval(function(_this) {
            _this.cadencia++;

            window.clearInterval(_this.timer);
            _this.timer = undefined;

            _this.timer = setInterval(function(__this) {
                __this.crearEnemigo(__this,x,y,sprite);
            }, 2000/_this.cadencia, _this);

        }, 4000, this);


        setInterval(function(_this) {
            _this.parar();
        }, 10000, this);
    }
    
    this.crearEnemigo = function(_this, x,y, sprite){
        //console.log("crear");
        _this.enemigos[_this.enemigos.length] = new Enemigo1(sprite,x,y, 2, 0.5, 8);
    }
    
    this.aumentar = function(){
        this.cadencia++;
    }

    this.parar = function(){
        window.clearInterval(this.timer);
        this.timer = undefined;
        window.clearInterval(this.timerReinicio);
        this.timerReinicio = undefined;
    }
    
}