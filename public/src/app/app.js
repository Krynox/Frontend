/**
 * Created by James on 25/11/14.
 */
(function(){
    "use strict";
    var app= angular.module("app",[]);
    document.addEventListener('DOMContentLoaded', function () {
        var v = document.getElementById('videoplayer'),
        tvimg=document.getElementById('tvimg'),
        canvas = document.getElementById('videocanvas');

        StaticGen.init('#effectcanvas', {
            tileWidth     : canvas.clientWidth,
            tileHeight    : canvas.clientHeight,
            totalFrames   : 4,
            fps           : 15,
            pixelWidth    : 1,
            pixelHeight   : canvas.clientHeight,
            stretchH      : 8,
            stretchV      : 1,
            scanLines     : true,
            randomizeRows : true
        });
        v.play();
        v.volume=0;
        canvasDrawer.init();

        videoUpload.init();
    }, false);
})();