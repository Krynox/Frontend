/**
 * Created by James on 12/12/2014.
 */
var canvasDrawer = (function (){
    var v = document.getElementById('videoplayer'),
        tvimg=document.getElementById('tvimg'),
        canvas = document.getElementById('videocanvas'),
        context = canvas.getContext('2d'),
        back = document.createElement('canvas'),
        backcontext = back.getContext('2d'),
        cw,
        ch,
        timer=true,
        image= new Image(),
        staticcanvas,
        staticcontext
        canvasColor=false;

        cw = canvas.clientWidth;
        ch = canvas.clientHeight;
        canvas.width = cw;
        canvas.height = ch;
        back.width = cw;
        back.height = ch;
        image.src="../../images/dirt.png";
    var init=function(){
        staticcanvas=document.getElementsByClassName('static');
        staticcontext = staticcanvas[0].getContext('2d');
        draw(false);
    }
    var switchMode=function(switchColor)
    {
        canvasColor=switchColor;

    }
    var draw=function(){

        if (v) {
            if (v.paused || v.ended) return false;
            backcontext.drawImage(v, 0, 0, cw, ch);
            var idata = backcontext.getImageData(0, 0, cw, ch);
            var data = idata.data;
            if(canvasColor===false)
            {
                for (var i = 0; i < data.length; i += 4) {
                    var r = data[i];
                    var g = data[i + 1];
                    var b = data[i + 2];
                    var brightness = (3 * r + 4 * g + b) >>> 3;
                    data[i] = brightness;
                    data[i + 1] = brightness;
                    data[i + 2] = brightness;
                }
            }
            idata.data = data;
            context.putImageData(idata, 0, 0);
            staticcontext.drawImage(image,0,0);

            setTimeout(draw, 20);
        }
    }
    return {
      init:  init,
      switchMode:switchMode
    };

})()