(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
        || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }());

function loadInstagram(){
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: "https://api.instagram.com/v1/tags/blenderbottle/media/recent?access_token=881423.1fb234f.c8c8b01ae8f4461a932cf0e118fd235b&count=48",
        success: function(json){
            $('.instagram-gallery').html('')
            $.each(json.data,function(){
                var thisdata = this;
                $('.instagram-gallery').append("<div class='instagram-img col-sm-4'><div class='imagebox'><img class='img-responsive' src='" + this.images.low_resolution.url + "'/></div><div class='instagram-description'><span class='caption'>" + this.caption.text + "</span><span class='author'>" + this.user.full_name + "</span></div></div>");
            });
            var container = $('.instagram-gallery');
        }
    })
}
window.onload = function(){
    loadInstagram();
    setInterval(loadInstagram,1000*60)
}

function animLoop (render, element){
    var running, lastFrame = +new Date;
    function loop(now){
        if (running !== false){
            requestAnimationFrame(loop, element);
            running = render(now - lastFrame);
            lastFrame = now;
        }
    }
    loop(lastFrame);
}

var scrollSpeed = 0.075, currentScroll = -500;
animLoop(function(deltaT){
    currentScroll += (deltaT * scrollSpeed);
    if (currentScroll >= document.body.clientHeight-5)
        currentScroll = -100;
    if (currentScroll < -100)
        currentScroll = -100;
    window.scrollTo(0,currentScroll);
}, window);
