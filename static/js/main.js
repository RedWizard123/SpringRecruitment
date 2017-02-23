/**
 * Created by faraway on 17-2-18.
 */
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();
window.cancelAnimFrame = (function(){
    return  window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame    ||
        window.oCancelAnimationFrame      ||
        window.msCancelAnimationFrame     ||
        function(n){
            window.clearTimeout(n);
        };
})();

var imgList = [
    "images/img_0.png",
    "images/img_1.png",
    "images/img_2.png",
    "images/img_4.png",
    "static/img/logo.png",
    "static/img/stars.png",
    "static/img/back.png",
    "static/img/small_planet.png",
    "static/img/iOS.png",
    "static/img/Design.png",
    "static/img/planet.png",
    "static/img/android.png",
    "static/img/lab.png",
    "static/img/pm.png",
    "static/img/text/PM.png",
    "static/img/text/Design.png",
    "static/img/text/Game.png",
    "static/img/text/web.png",
    "static/img/text/Lab.png",
    "static/img/text/ios.png",
    "static/img/text/Android.png"

];
var group = ["web","design","game","pm","lab","android","ios"];
var contextBg;
var contextBgF;
var hasInitRocket = false;
var rotateNow = 0;
var timeOri = Date.now();
var imgListObj = [];
var imgLoadedCounter = 0;
var loaded = false;
var loadingAnimStart;
var loadingAnimLoop;
var loadingAnimEnd;
var animationRocket;
var timeoutHandle;
var stars = [
    {"type":1,"x":100,"y":20,"T":0.2},
    {"type":1,"x":11,"y":200,"T":0.3},
    {"type":1,"x":30,"y":54,"T":0.1},
    {"type":1,"x":65,"y":213,"T":0.6},
    {"type":2,"x":160,"y":65,"T":0.5},
    {"type":1,"x":98,"y":35,"T":0.9},
    {"type":1,"x":322,"y":54,"T":1.2},
    {"type":1,"x":250,"y":320,"T":2.2},
    {"type":1,"x":20,"y":78,"T":1.2},
    {"type":1,"x":200,"y":69,"T":0.2},
    {"type":1,"x":300,"y":87,"T":0.8},
    {"type":1,"x":68,"y":42,"T":0.9},
    {"type":1,"x":168,"y":300,"T":0.5},
    {"type":1,"x":79,"y":210,"T":0.3},
    {"type":1,"x":120,"y":150,"T":0.8}
];
if(imgList.length === 0){
    loaded = true;
}
for(var i = 0;i<imgList.length;i++){
    imgListObj.push(new Image());
    imgListObj[i].src=imgList[i];
    imgListObj[i].onload = function(){
        imgLoadedCounter ++;
        $("#percent").html(Math.round(imgLoadedCounter / imgList.length * 100)+"%");
        if(imgLoadedCounter>=imgList.length){
            loaded = true;
        }
    }
}
$(document).ready(function(){
    var backgroundCanvas = document.querySelector("div.background>canvas");
    backgroundCanvas.width =360;
    backgroundCanvas.height =540;
    contextBg = backgroundCanvas.getContext("2d");
    contextBgF = setInterval(function(){
        contextBg.clearRect(0,0,360,540);
        for(var i = 0 ; i<stars.length ;i++){
            var d = Math.sin(Math.PI*((Date.now() - timeOri)/1000  + stars[i].T))/2;
            if(stars[i].type === 1){
                contextBg.drawImage(
                    document.querySelector("div.background>img"),
                    stars[i].x-5*(2+d)/2,
                    stars[i].y-5*(2+d),
                    5*(2+d),10*(2+d)
                );
            }else{
                contextBg.fillStyle = "rgba(255,255,255," + 0.5 + Math.round(d) + ")";
                contextBg.arc(stars[i].x,stars[i].y,2*(2+d),0,2*Math.PI);
                contextBg.fill();
            }
        }
    },1000/60);
    //document.querySelector("div.planet-animals").style.transform =
    var fullpageEle = $('#fullpage');
    fullpageEle.fullpage({
        sectionSelector: '.section',
        slideSelector: '.slide',
        scrollingSpeed: 500,
        lazyLoading: true,
        controlArrows: false,
        onLeave: function(index, nextIndex, direction){if((index === 0 && nextIndex === 1 )){return(false);}},
        afterLoad: function(anchorLink, index){},
        afterRender: function(){},
        afterResize: function(){},
        afterResponsive: function(isResponsive){},
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
        onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){
            if(slideIndex === 0 && nextSlideIndex === 9){
                //return(false);
            }else{
                if(slideIndex === 0 && direction === "left"){
                    //return(false);
                }else{
                    if(hasInitRocket === true){
                        document.querySelector("div.animation").classList.add("hide");
                        document.querySelector("div.animation>div").className = "undefined";
                    }
                    if(direction === "right"){
                        rotateNext();
                    }else{
                        rotatePre();
                    }
                    if((rotateNow+1)%9 === 0){
                        if(hasInitRocket === false){
                            animationRocket = bodymovin.loadAnimation({
                                container: document.querySelector("div.text>div.animation"),
                                renderer:'svg',
                                rendererSettings:{
                                    scaleMode:'fit'
                                },
                                loop: 1,
                                autoplay: false,
                                animationData: rocket
                            });
                            hasInitRocket = true;
                            //animationRocket.play();
                            animationRocket.onComplete = function(){
                                console.log("aaa");
                            };
                        }else{
                            clearTimeout(timeoutHandle);
                            timeoutHandle = setTimeout(function(){
                                document.querySelector("div.animation").classList.remove("hide");
                                animationRocket.goToAndPlay(0);
                                document.querySelector("div.animation>div").className = group[Math.abs(rotateNow%9)-1];
                            },500);
                        }
                    }
                    if(rotateNow === 0 || rotateNow%9 === 0 ||(rotateNow-1)%9 === 0){
                        if(hasInitRocket){
                            clearTimeout(timeoutHandle);
                            timeoutHandle = setTimeout(function(){

                                document.querySelector("div.animation").classList.add("hide");
                                document.querySelector("div.animation>div").className = group[Math.abs(rotateNow%9)-1];
                            },500);
                        }
                    }else{

                        clearTimeout(timeoutHandle);
                        timeoutHandle = setTimeout(function(){
                            document.querySelector("div.animation>div").className = "pm";
                            document.querySelector("div.animation").classList.remove("hide");
                            animationRocket.goToAndPlay(0);
                            document.querySelector("div.animation>div").className = group[Math.abs(rotateNow%9)-1];
                        },500);
                    }
                    return(true);
                }
            }
        }
    });
    $.fn.fullpage.setAllowScrolling(false);
    document.body.classList.add("show");
    loadingAnimStart = bodymovin.loadAnimation({
        container: document.getElementById('bgLoop'),
        renderer:'svg',
        rendererSettings:{
            scaleMode:'fit'
        },
        loop: 1,
        autoplay: false,
        animationData: animationData_loadingBgStart
    });
    loadingAnimStart.play();
    loadingAnimStart.onComplete = function(){
        loadingAnimStart.destroy();
        loadingAnimLoop = bodymovin.loadAnimation({
            container: document.getElementById('bgLoop'),
            renderer:'svg',
            loop: true,
            autoplay: true,
            animationData: animationData_loadingBgLoop
        });
        loadingAnimLoop.play();
        var watcher = setInterval(function(){
            if(loaded === true){
                showBody();
                clearInterval(watcher);
            }
        },1);
    };
    $("button.start").on("click",function(){
        //$(".background").addClass("active");
        $.fn.fullpage.moveSlideRight();
        //document.querySelector("div.mask-slider").style = "";
        //$.fn.fullpage.moveSectionDown();
    });
    $("button.join-now").on("click",function(){
        //$(".background").addClass("active");
        //$.fn.fullpage.silentMoveTo(2,8);
        /*rotateNext();
        rotateNext();
        rotateNext();
        rotateNext();
        rotateNext();
        rotateNext();
        rotateNext();
        rotateNext();*/
        //document.querySelector("div.mask-slider").style = "";
        //$.fn.fullpage.moveSectionDown();
        rotateNow = -8;
        var animals = document.querySelector("div.planet-animals");
        animals.style.transform = "rotateZ("+(rotateNow)*40+"deg)";
    });
});
function showBody(){
    loadingAnimLoop.destroy();
    loadingAnimEnd = bodymovin.loadAnimation({
        container: document.getElementById('bgLoop'),
        renderer:'svg',
        rendererSettings:{
            scaleMode:'fit'
        },
        loop: 1,
        autoplay: true,
        animationData: animationData_loadingBgEnd
    });
    loadingAnimEnd.onComplete = function(){
        $.fn.fullpage.moveSectionDown();
        $.fn.fullpage.setAllowScrolling(true);
        $(".planet-animals").addClass("active");
        $.fn.fullpage.scrollingSpeed = 500;
    };
}
function rotateNext(){
    var animals = document.querySelector("div.planet-animals");
    animals.style.transform = "rotateZ("+(--rotateNow)*40+"deg)";
    console.log(rotateNow);
}
function rotatePre(){

    var animals = document.querySelector("div.planet-animals");
    animals.style.transform = "rotateZ("+(++rotateNow)*40+"deg)";
    console.log(rotateNow);
}