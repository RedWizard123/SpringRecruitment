/**
 * Created by faraway on 17-2-18.
 */
browserRedirect();
console.warn("联创团队WEB组欢迎你！");
console.warn("制作者：Web-洪志远");
wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '', // 必填，公众号的唯一标识
    timestamp: Date.now(), // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '',// 必填，签名，见附录1
    jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});
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
        onLeave: function(index, nextIndex, direction){if((index === 2 && nextIndex === 1)){return false;}},
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
                            animationRocket.onComplete = function(){};
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
    desc = "你有一封来自联创火箭的邀请函";
    imgURL = 'http://hr.hustunique.com/static/img/logo.png';
    wx.onMenuShareTimeline({
        title: document.title, // 分享标题
        link: window.location.href, // 分享链接
        imgUrl: imgURL, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
    wx.onMenuShareAppMessage({
        title: document.title, // 分享标题
        desc: desc, // 分享描述
        link: window.location.href, // 分享链接
        imgUrl: imgURL, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
    wx.onMenuShareQQ({
        title: document.title, // 分享标题
        desc: desc, // 分享描述
        link: window.location.href, // 分享链接
        imgUrl: imgURL, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
    wx.onMenuShareWeibo({
        title: document.title, // 分享标题
        desc: desc, // 分享描述
        link: window.location.href, // 分享链接
        imgUrl: imgURL, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
    wx.onMenuShareQZone({
        title: document.title, // 分享标题
        desc: desc, // 分享描述
        link: window.location.href, // 分享链接
        imgUrl: imgURL, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
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
}
function rotatePre(){

    var animals = document.querySelector("div.planet-animals");
    animals.style.transform = "rotateZ("+(++rotateNow)*40+"deg)";
}
function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {

    } else {
       window.location.href = "https://mp.weixin.qq.com/s?__biz=MjM5OTAzNjU4MA==&mid=2649605020&idx=1&sn=6635620d01a1f229158b9563fdc8d6f4&chksm=bed8f05789af79411dee8dbcf69111e09d57ab300c96746a4289505d2ee26a77dcefe2c95fbf&pass_ticket=OWIy0Y9it66XLqZbvSHxM45hRtr3Ij2MPEzjd3OkyYg%3D#rd";
    }
}

