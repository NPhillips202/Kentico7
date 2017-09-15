/* Revolver.js - http://revolverjs.com */
;(function(c,f){var a=function(b,a){this.options=c.extend(!0,{},this.defaults,a);this.container=b;this.dimensions={height:this.container.height(),width:this.container.width()};var self=this;this.slides=this.container.find("."+this.options.slideClass).each(c.proxy(function(){this.addSlide(this)},self));this.numSlides=this.slides.length;this.currentSlide=0;this.nextSlide=1<this.numSlides?1:0;this.previousSlide=this.lastSlide=0===this.numSlides?null:this.numSlides-1;this.status={paused:!1,playing:!1,stopped:!0};this.isAnimating=
!1;if(1>=this.numSlides)this.disabled=!0;else return c.proxy(this.options.onReady,this)(),this.options.autoPlay&&this.play({},!0),this};a.prototype.defaults={autoPlay:!0,onReady:function(){},onPlay:function(){},onStop:function(){},onPause:function(){},onRestart:function(){},rotationSpeed:4E3,slideClass:"slide",transition:{direction:"left",easing:"swing",onStart:function(){},onFinish:function(){},speed:500,type:"fade"}};a.prototype.previousSlide=null;a.prototype.currentSlide=null;a.prototype.nextSlide=
null;a.prototype.numSlides=0;a.prototype.lastSlide=null;a.prototype.container=null;a.prototype.slides=[];a.prototype.iteration=0;a.prototype.intervalId=null;a.prototype.status=null;a.prototype.options=null;a.prototype.dimensions=null;a.prototype.isAnimating=null;a.prototype.disabled=!1;a.prototype.VERSION="1.0.4";a.prototype.addSlide=function(b){this.slides.push(b)};a.prototype.changeStatus=function(b){var a=this;c.each(this.status,function(c){a.status[c]=c===b});return this};a.prototype.transition=
function(b){if(!1===this.disabled&&!1===this.isAnimating){var b=c.extend(!0,{},this.options.transition,b),a=c.proxy(this.transitions[b.type],this);this.isAnimating=!0;a(b);this.currentSlide=this.nextSlide;this.previousSlide=0===this.currentSlide?this.lastSlide:this.currentSlide-1;this.nextSlide=this.currentSlide===this.lastSlide?0:this.currentSlide+1;this.iteration++;c.proxy(b.onStart,this)()}return this};a.prototype.transitions={none:function(b){this.slides.eq(this.currentSlide).hide();this.slides.eq(this.nextSlide).show();
c.proxy(b.onFinish,this);this.isAnimating=!1},fade:function(b){var a=this;this.slides.eq(this.currentSlide).fadeOut(b.speed,b.easing);this.slides.eq(this.nextSlide).fadeIn(b.speed,b.easing,function(){c.proxy(b.onFinish,a)();a.isAnimating=!1})},slide:function(b){var a=this,f=this.slides.eq(this.currentSlide),g=this.slides.eq(this.nextSlide),d={},e={};this.slides.eq(this.nextSlide).css("z-index",this.iteration+1);"up"===b.direction?(d={top:this.dimensions.height,left:0},e={top:0-this.dimensions.height,
left:0}):"right"===b.direction?(d={top:0,left:this.dimensions.width},e={top:0,left:0-this.dimensions.width}):"down"===b.direction?(d={top:0-this.dimensions.height,left:0},e={top:this.dimensions.height,left:0}):"left"===b.direction&&(d={left:0-this.dimensions.width,top:0},e={left:this.dimensions.width,top:0});f.stop(!0).animate(d,b.speed,b.easing,function(){c(this).hide()});g.show().css(e).stop(!0).animate({top:0,left:0},b.speed,b.easing,function(){c.proxy(b.onFinish,a)();a.isAnimating=false})},reveal:function(b){var a=
this;this.slides.eq(this.nextSlide).css({width:0,height:this.dimensions.height,"z-index":this.iteration+1}).show().animate({width:this.dimensions.width},b.speed,b.easing,function(){c.proxy(b.onFinish,a)();a.isAnimating=!1});return this}};a.prototype.play=function(b,a){!1===this.disabled&&!this.status.playing&&(this.changeStatus("playing"),c.proxy(this.options.onPlay,this)(),a||this.transition(b),this.intervalId=setInterval(c.proxy(this.transition,this),parseFloat(this.options.rotationSpeed)));return this};
a.prototype.pause=function(){!1===this.disabled&&!this.status.paused&&(this.changeStatus("paused"),c.proxy(this.options.onPause,this)(),null!==this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null));return this};a.prototype.stop=function(){!1===this.disabled&&!this.status.stopped&&(this.changeStatus("stopped"),c.proxy(this.options.onStop,this)(),null!==this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null));return this.reset()};a.prototype.reset=function(){0!==this.currentSlide&&
(this.nextSlide=0);return this};a.prototype.restart=function(b){if(!0===this.disabled)return this;c.proxy(this.options.onRestart,this)();return this.stop().play(b)};a.prototype.first=function(b){return this.goTo(0,b)};a.prototype.previous=function(b){return this.goTo(this.previousSlide,b)};a.prototype.goTo=function(b,a){b=parseInt(b);if(!0===this.disabled||b===this.currentSlide)return this;this.nextSlide=b;return!this.status.playing?this.transition(a):this.pause().play(a)};a.prototype.next=function(a){return this.goTo(this.nextSlide,
a)};a.prototype.last=function(a){return this.goTo(this.lastSlide,a)};f.Revolver=a;c.fn.revolver=function(b){return this.each(function(){c.data(this,"revolver")||c.data(this,"revolver",new a(c(this),b))})}})(jQuery,this);