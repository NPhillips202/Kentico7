var initPhotoSwipeFromDOM=function(n){for(var h=function(n){for(var o=n.childNodes,s=o.length,e=[],t,r,f,i,u=0;u<s;u++)(t=o[u],t.nodeType===1)&&(r=t.children[0],f=r.getAttribute("data-size").split("x"),i={src:r.getAttribute("href"),w:parseInt(f[0],10),h:parseInt(f[1],10)},t.children.length>1&&(i.title=t.children[1].innerHTML),r.children.length>0&&(i.msrc=r.children[0].getAttribute("src")),i.el=t,e.push(i));return e},e=function e(n,t){return n&&(t(n)?n:e(n.parentNode,t))},s=function(n){var s,i,t;if(n=n||window.event,n.preventDefault?n.preventDefault():n.returnValue=!1,s=n.target||n.srcElement,i=e(s,function(n){return n.tagName&&n.tagName.toUpperCase()==="FIGURE"}),i){var h=i.parentNode,u=i.parentNode.childNodes,c=u.length,o=0,r;for(t=0;t<c;t++)if(u[t].nodeType===1){if(u[t]===i){r=o;break}o++}return r>=0&&f(r,h),!1}},o=function(){var u=window.location.hash.substring(1),n={},r,t,i;if(u.length<5)return n;for(r=u.split("&"),t=0;t<r.length;t++)r[t]&&((i=r[t].split("="),i.length<2)||(n[i[0]]=i[1]));return(n.gid&&(n.gid=parseInt(n.gid,10)),!n.hasOwnProperty("pid"))?n:(n.pid=parseInt(n.pid,10),n)},f=function(n,t,i){var e=document.querySelectorAll(".pswp")[0],f,r,u;u=h(t),r={index:n,index:n,history:!1,mouseUsed:!0,closeOnScroll:!1,galleryUID:t.getAttribute("data-pswp-uid"),getThumbBoundsFn:function(n){var i=u[n].el.getElementsByTagName("img")[0],r=window.pageYOffset||document.documentElement.scrollTop,t=i.getBoundingClientRect();return{x:t.left,y:t.top+r,w:t.width}}},i&&(r.showAnimationDuration=0),f=new PhotoSwipe(e,PhotoSwipeUI_Default,u,r),f.init()},r=document.querySelectorAll(n),i,t=0,u=r.length;t<u;t++)r[t].setAttribute("data-pswp-uid",t+1),r[t].onclick=s;i=o(),i.pid>0&&i.gid>0&&f(i.pid-1,r[i.gid-1],!0)}; initPhotoSwipeFromDOM(".simple-gallery")