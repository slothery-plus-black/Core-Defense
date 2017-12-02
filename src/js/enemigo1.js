//Objeto jugador, tiene su sprite, sus posiciones en x e y ademas de la velocidad
function Enemigo1(x, y, vel, cadencia, margen, vida, spritesAnimacionDestruccion) {
    //Velocidad del jugador debe ser multiplo de cellsize
    this.isAlive = true;
    var anim = [];
    anim[0] = new Image();
    anim[0].src = "../images/enemigo_1.png";
    anim[1] = new Image();
    anim[1].src = "../images/enemigo_1_pata1.png";
    anim[2] = new Image();
    anim[2].src = "../images/enemigo_1_pata2.png";
    var aniNum = 0;
    this.sprite = anim;
    this.posx = x;
    this.posy = y;
    this.velocidad = vel;
    this.dir = 0;
    this.cadencia = cadencia; //disparos por segundo
    this.puedeDisparar = true;
    this.margen = margen;
    this.vida = vida;

    var animacionDestruccion = 0;
    this.spritesAnimacionDestruccion = spritesAnimacionDestruccion;

    this.shoot = function () {
        this.puedeDisparar = false;
        random = Math.floor((Math.random() * 10) + 0);
        if (random < 7) {
            this.apuntarNucleo();
        }

        //Se necesita si no, settimeout no podria acceder al objeto que lo invoca
        var _this = this;
        setTimeout(function () {
            _this.puedeDisparar = true;
        }, 1000 / _this.cadencia);
    }

    this.canShoot = function () {
        return this.puedeDisparar;
    }

    this.cogerSprite = function () {
        return this.sprite[this.dir];
    }

    this.animar = function () {
        if (aniNum >= 2) {
            aniNum = 0;
        } else {
            aniNum += 1;
        }
        return this.sprite[aniNum];
    }

    this.apuntarNucleo = function () {
        var dirX;
        var dirY;
        var random;
        if (this.posx < 360) {
            dirX = 3;
        } else {
            dirX = 2;
        }
        if (this.posy < 360) {
            dirY = 1;
        } else {
            dirY = 0;
        }
        random = Math.floor((Math.random() * 2) + 0);
        if (random == 0) {
            this.dir = dirX;
        } else {
            this.dir = dirY;
        }
    }

    this.daniar = function () {
        if (this.vida > 0)
            this.vida--;
    }

    this.destruir = function (enemigos, i) {

        //var _this = this;
        this.animar = function () {
            if (animacionDestruccion >= 8) {
                animacionDestruccion = 0;
            } else {
                animacionDestruccion++;
            }
            return this.spritesAnimacionDestruccion[animacionDestruccion];
        }
        this.kill(enemigos, i);

    }
    this.kill = function (enemigos, i) {
        setTimeout(function (enemigos, i) {
            enemigos.splice(i, 1);
        }, 400, enemigos, i);
    }
}

function Enemigo2(x, y, vel, cadencia, margen, vida, spritesAnimacionDestruccion) {
    //Velocidad del jugador debe ser multiplo de cellsize
    this.isAlive = true;
    var anim = [];
    anim[0] = new Image();
    anim[0].src = "../images/enemigo_2.png";
    anim[1] = new Image();
    anim[1].src = "../images/enemigo_2_pata1.png";
    anim[2] = new Image();
    anim[2].src = "../images/enemigo_2_pata2.png";
    anim[3] = new Image();
    anim[3].src = "../images/enemigo_2_pata3.png";
    anim[4] = new Image();
    anim[4].src = "../images/enemigo_2_atras.png";
    anim[5] = new Image();
    anim[5].src = "../images/enemigo_2_pata1_atras.png";
    anim[6] = new Image();
    anim[6].src = "../images/enemigo_2_pata2_atras.png";
    anim[7] = new Image();
    anim[7].src = "../images/enemigo_2_pata3_atras.png";

    this.sprite = anim;
    this.posx = x;
    this.posy = y;
    this.velocidad = vel * 1.5;
    this.dir = 0;
    this.cadencia = cadencia * 3; //disparos por segundo
    this.puedeDisparar = true;
    this.margen = margen;
    var random;
    this.vida = vida;
    var aniNum = 0;

    var animacionDestruccion = 0;
    this.spritesAnimacionDestruccion = spritesAnimacionDestruccion;

    this.shoot = function () {
        this.puedeDisparar = false;

        this.apuntarNucleo();
        //Se necesita si no, settimeout no podria acceder al objeto que lo invoca
        var _this = this;
        setTimeout(function () {
            _this.puedeDisparar = true;
        }, 1000 / _this.cadencia);
    }

    this.canShoot = function () {
        return this.puedeDisparar;
    }

    this.cogerSprite = function () {
        return this.sprite[this.dir];
    }

    this.animar = function () {
        if (this.dir != 0) {
            if (aniNum >= 3) {
                aniNum = 0;
            } else {
                aniNum += 1;
            }
        } else {
            if ((aniNum < 4) || (aniNum >= 7)) {
                aniNum = 4;
            } else {
                aniNum++;
            }
        }


        return this.sprite[aniNum];
    }

    this.apuntarNucleo = function () {
        var dirX;
        var dirY;
        if (this.posx < 360) {
            dirX = 3;
        } else {
            dirX = 2;
        }
        if (this.posy < 360) {
            dirY = 1;
        } else {
            dirY = 0;
        }
        random = Math.floor((Math.random() * 2) + 0);
        if (random == 0) {
            this.dir = dirX;
        } else {
            this.dir = dirY;
        }
    }
    this.daniar = function () {
        if (this.vida > 0)
            this.vida--;
    }

    this.destruir = function (enemigos, i) {

        //var _this = this;
        this.animar = function () {
            if (animacionDestruccion >= 8) {
                animacionDestruccion = 0;
            } else {
                animacionDestruccion++;
            }
            return this.spritesAnimacionDestruccion[animacionDestruccion];
        }
        this.kill(enemigos, i);

    }
    this.kill = function (enemigos, i) {
        setTimeout(function (enemigos, i) {
            enemigos.splice(i, 1);
        }, 400, enemigos, i);
    }
}

function Enemigo3(x, y, vel, cadencia, margen, vida, spritesAnimacionDestruccion, spawnPadre) {
    //Velocidad del jugador debe ser multiplo de cellsize
    this.isAlive = true;
    var anim = [];
    anim[0] = new Image();
    anim[0].src = "../images/enemigo_3.png";
    anim[1] = new Image();
    anim[1].src = "../images/enemigo_3_pata1.png";
    anim[2] = new Image();
    anim[2].src = "../images/enemigo_3_pata2.png";
    anim[3] = new Image();
    anim[3].src = "../images/enemigo_3_atras.png";
    anim[4] = new Image();
    anim[4].src = "../images/enemigo_3_atras_pata1.png";
    anim[5] = new Image();
    anim[5].src = "../images/enemigo_3_atras_pata2.png";

    this.sprite = anim;
    this.posx = x;
    this.posy = y;
    this.velocidad = vel * 0.5;
    this.dir = 0;
    var timeleft = 6;
    this.spawn = spawnPadre;
    this.vida = vida;
    var aniNum = 0;


    var animacionDestruccion = 0;
    this.spritesAnimacionDestruccion = spritesAnimacionDestruccion;

    this.cadencia = setInterval(function (_this) {

        timeleft--;
        _this.apuntarNucleo(); //Se direcciona

        //Si se le ha acabado el tiempo
        if (timeleft == 0 && _this.vida > 0) {
            //_this, x,y, spriteGusano,spriteVirus,spriteTroyano,spritesAnimacionDestruccion
            

            //Spawnea 3 enemigos
            _this.spawn.spawnearGusano(_this.spawn, _this.posx, _this.posy, spritesAnimacionDestruccion);
            _this.spawn.spawnearGusano(_this.spawn, _this.posx, _this.posy, spritesAnimacionDestruccion);
            _this.spawn.spawnearGusano(_this.spawn, _this.posx, _this.posy, spritesAnimacionDestruccion);
            
            //Se muere
            _this.vida = 0;


        }
    }, 2000, this);

    this.puedeDisparar = false;
    this.margen = margen;
    var random; //Variable auxiliar


    this.canShoot = function () {
        return this.puedeDisparar;
    }

    this.cogerSprite = function () {
        return this.sprite[this.dir];
    }

    this.animar = function () {
        if (this.dir != 0) {
            if (aniNum >= 2) {
                aniNum = 0;
            } else {
                aniNum += 1;
            }
        } 
        else {
            if ((aniNum < 3) || (aniNum >= 5)) {
                aniNum = 3;
            } else {
                aniNum++;
            }
        }

        return this.sprite[aniNum];
    }

    this.apuntarNucleo = function () {
        var dirX;
        var dirY;
        if (this.posx < 360) {
            dirX = 3;
        } else {
            dirX = 2;
        }
        if (this.posy < 360) {
            dirY = 1;
        } else {
            dirY = 0;
        }
        random = Math.floor((Math.random() * 2) + 0);
        if (random === 0) {
            this.dir = dirX;
        } else {
            this.dir = dirY;
        }
    }
    this.daniar = function () {
        if (this.vida > 0)
            this.vida--;
    }

    this.destruir = function (enemigos, i) {

        
        this.animar = function () {
            if (animacionDestruccion >= 8) {
                animacionDestruccion = 0;
            } else {
                animacionDestruccion++;
            }
            return this.spritesAnimacionDestruccion[animacionDestruccion];
        }
        this.kill(enemigos, i);

    }
    this.kill = function (enemigos, i) {
        setTimeout(function (enemigos, i) {
            enemigos.splice(i, 1);
        }, 400, enemigos, i);
    }

}