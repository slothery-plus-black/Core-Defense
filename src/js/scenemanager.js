function SceneManager(){
	var scenes = [];
    var numScenes=1;
    this.init = function(){
        //scenes[0]= new nombreEscena1();
        //scenes[1]= new nombreEscena2();
        //etc
    }
    var clearscene = function(){
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0,  canvas.width, canvas.height);
    }
    
    this.startScene = function(num){
        clearscene();
        scene[num].init();
    }
}