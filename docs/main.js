!function(t){var e={};function i(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(n,s,function(e){return t[e]}.bind(null,s));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=28)}([function(t,e){t.exports={Always:1,Never:2,IfAtMostOneObstacle:3,OnlyWhenNoObstacles:4}},function(t,e){function i(t){for(var e=[[t.x,t.y]];t.parent;)t=t.parent,e.push([t.x,t.y]);return e.reverse()}function n(t,e,i,n){var s,r,o,a,h,l,u=Math.abs,c=[];for(o=u(i-t),a=u(n-e),s=t<i?1:-1,r=e<n?1:-1,h=o-a;c.push([t,e]),t!==i||e!==n;)(l=2*h)>-a&&(h-=a,t+=s),l<o&&(h+=o,e+=r);return c}e.backtrace=i,e.biBacktrace=function(t,e){var n=i(t),s=i(e);return n.concat(s.reverse())},e.pathLength=function(t){var e,i,n,s,r,o=0;for(e=1;e<t.length;++e)i=t[e-1],n=t[e],s=i[0]-n[0],r=i[1]-n[1],o+=Math.sqrt(s*s+r*r);return o},e.interpolate=n,e.expandPath=function(t){var e,i,s,r,o,a,h=[],l=t.length;if(l<2)return h;for(o=0;o<l-1;++o)for(e=t[o],i=t[o+1],r=(s=n(e[0],e[1],i[0],i[1])).length,a=0;a<r-1;++a)h.push(s[a]);return h.push(t[l-1]),h},e.smoothenPath=function(t,e){var i,s,r,o,a,h,l,u,c,d=e.length,p=e[0][0],f=e[0][1],g=e[d-1][0],y=e[d-1][1];for(r=[[i=p,s=f]],o=2;o<d;++o){for(l=n(i,s,(h=e[o])[0],h[1]),c=!1,a=1;a<l.length;++a)if(u=l[a],!t.isWalkableAt(u[0],u[1])){c=!0;break}c&&(lastValidCoord=e[o-1],r.push(lastValidCoord),i=lastValidCoord[0],s=lastValidCoord[1])}return r.push([g,y]),r},e.compressPath=function(t){if(t.length<3)return t;var e,i,n,s,r,o,a=[],h=t[0][0],l=t[0][1],u=t[1][0],c=t[1][1],d=u-h,p=c-l;for(d/=r=Math.sqrt(d*d+p*p),p/=r,a.push([h,l]),o=2;o<t.length;o++)e=u,i=c,n=d,s=p,d=(u=t[o][0])-e,p=(c=t[o][1])-i,p/=r=Math.sqrt(d*d+p*p),(d/=r)===n&&p===s||a.push([e,i]);return a.push([u,c]),a}},function(t,e){t.exports={manhattan:function(t,e){return t+e},euclidean:function(t,e){return Math.sqrt(t*t+e*e)},octile:function(t,e){var i=Math.SQRT2-1;return t<e?i*t+e:i*e+t},chebyshev:function(t,e){return Math.max(t,e)}}},function(t,e,i){t.exports=i(13)},function(t,e,i){var n=i(3),s=i(1),r=i(2);function o(t){t=t||{},this.heuristic=t.heuristic||r.manhattan,this.trackJumpRecursion=t.trackJumpRecursion||!1}i(0),o.prototype.findPath=function(t,e,i,r,o){var a,h=this.openList=new n(function(t,e){return t.f-e.f}),l=this.startNode=o.getNodeAt(t,e),u=this.endNode=o.getNodeAt(i,r);for(this.grid=o,l.g=0,l.f=0,h.push(l),l.opened=!0;!h.empty();){if((a=h.pop()).closed=!0,a===u)return s.expandPath(s.backtrace(u));this._identifySuccessors(a)}return[]},o.prototype._identifySuccessors=function(t){var e,i,n,s,o,a,h,l,u,c,d=this.grid,p=this.heuristic,f=this.openList,g=this.endNode.x,y=this.endNode.y,m=t.x,b=t.y,v=Math.abs;for(Math.max,s=0,o=(e=this._findNeighbors(t)).length;s<o;++s)if(i=e[s],n=this._jump(i[0],i[1],m,b)){if(a=n[0],h=n[1],(c=d.getNodeAt(a,h)).closed)continue;l=r.octile(v(a-m),v(h-b)),u=t.g+l,(!c.opened||u<c.g)&&(c.g=u,c.h=c.h||p(v(a-g),v(h-y)),c.f=c.g+c.h,c.parent=t,c.opened?f.updateItem(c):(f.push(c),c.opened=!0))}},t.exports=o},function(t,e){t.exports=function(t,e,i){this.x=t,this.y=e,this.walkable=void 0===i||i}},function(t,e,i){var n=i(3),s=i(1),r=i(2),o=i(0);function a(t){t=t||{},this.allowDiagonal=t.allowDiagonal,this.dontCrossCorners=t.dontCrossCorners,this.heuristic=t.heuristic||r.manhattan,this.weight=t.weight||1,this.diagonalMovement=t.diagonalMovement,this.diagonalMovement||(this.allowDiagonal?this.dontCrossCorners?this.diagonalMovement=o.OnlyWhenNoObstacles:this.diagonalMovement=o.IfAtMostOneObstacle:this.diagonalMovement=o.Never),this.diagonalMovement===o.Never?this.heuristic=t.heuristic||r.manhattan:this.heuristic=t.heuristic||r.octile}a.prototype.findPath=function(t,e,i,r,o){var a,h,l,u,c,d,p,f,g=new n(function(t,e){return t.f-e.f}),y=o.getNodeAt(t,e),m=o.getNodeAt(i,r),b=this.heuristic,v=this.diagonalMovement,x=this.weight,k=Math.abs,w=Math.SQRT2;for(y.g=0,y.f=0,g.push(y),y.opened=!0;!g.empty();){if((a=g.pop()).closed=!0,a===m)return s.backtrace(m);for(u=0,c=(h=o.getNeighbors(a,v)).length;u<c;++u)(l=h[u]).closed||(d=l.x,p=l.y,f=a.g+(d-a.x==0||p-a.y==0?1:w),(!l.opened||f<l.g)&&(l.g=f,l.h=l.h||x*b(k(d-i),k(p-r)),l.f=l.g+l.h,l.parent=a,l.opened?g.updateItem(l):(g.push(l),l.opened=!0)))}return[]},t.exports=a},function(t,e,i){var n=i(3),s=i(1),r=i(2),o=i(0);function a(t){t=t||{},this.allowDiagonal=t.allowDiagonal,this.dontCrossCorners=t.dontCrossCorners,this.diagonalMovement=t.diagonalMovement,this.heuristic=t.heuristic||r.manhattan,this.weight=t.weight||1,this.diagonalMovement||(this.allowDiagonal?this.dontCrossCorners?this.diagonalMovement=o.OnlyWhenNoObstacles:this.diagonalMovement=o.IfAtMostOneObstacle:this.diagonalMovement=o.Never),this.diagonalMovement===o.Never?this.heuristic=t.heuristic||r.manhattan:this.heuristic=t.heuristic||r.octile}a.prototype.findPath=function(t,e,i,r,o){var a,h,l,u,c,d,p,f,g=function(t,e){return t.f-e.f},y=new n(g),m=new n(g),b=o.getNodeAt(t,e),v=o.getNodeAt(i,r),x=this.heuristic,k=this.diagonalMovement,w=this.weight,A=Math.abs,M=Math.SQRT2;for(b.g=0,b.f=0,y.push(b),b.opened=1,v.g=0,v.f=0,m.push(v),v.opened=2;!y.empty()&&!m.empty();){for((a=y.pop()).closed=!0,u=0,c=(h=o.getNeighbors(a,k)).length;u<c;++u)if(!(l=h[u]).closed){if(2===l.opened)return s.biBacktrace(a,l);d=l.x,p=l.y,f=a.g+(d-a.x==0||p-a.y==0?1:M),(!l.opened||f<l.g)&&(l.g=f,l.h=l.h||w*x(A(d-i),A(p-r)),l.f=l.g+l.h,l.parent=a,l.opened?y.updateItem(l):(y.push(l),l.opened=1))}for((a=m.pop()).closed=!0,u=0,c=(h=o.getNeighbors(a,k)).length;u<c;++u)if(!(l=h[u]).closed){if(1===l.opened)return s.biBacktrace(l,a);d=l.x,p=l.y,f=a.g+(d-a.x==0||p-a.y==0?1:M),(!l.opened||f<l.g)&&(l.g=f,l.h=l.h||w*x(A(d-t),A(p-e)),l.f=l.g+l.h,l.parent=a,l.opened?m.updateItem(l):(m.push(l),l.opened=2))}}return[]},t.exports=a},function(t,e,i){t.exports=i(12)},function(t,e,i){t.exports=i.p+"5e72d7aad631017b98b8311710091617.json"},function(t,e,i){t.exports=i.p+"f07cd998ce0920b31c5b2b0fa4078127.png"},function(t,e){kontra={init(t){var e=this.canvas=document.getElementById(t)||t||document.querySelector("canvas");if(!e)throw Error("You must provide a canvas element for the game");this.context=e.getContext("2d")},_noop:new Function,_tick:new Function},function(){let t,e=/(jpeg|jpg|gif|png)$/,i=/(wav|mp3|ogg|aac)$/,n=/^no$/,s=/^\//,r=/\/$/,o=new Audio,a={wav:"",mp3:o.canPlayType("audio/mpeg;").replace(n,""),ogg:o.canPlayType('audio/ogg; codecs="vorbis"').replace(n,""),aac:o.canPlayType("audio/aac;").replace(n,"")};function h(t,e){return[t.replace(r,""),t?e.replace(s,""):e].filter(t=>t).join("/")}function l(t){return t.split(".").pop()}function u(t){let e=t.replace("."+l(t),"");return 2==e.split("/").length?e.replace(s,""):e}function c(e,i){return new Promise(function(n,s){let r=new Image;i=h(t.imagePath,e),r.onload=function(){t.images[u(e)]=t.images[i]=this,n(this)},r.onerror=function(){s("Unable to load image "+i)},r.src=i})}function d(e,i,n){return new Promise(function(s,r){if(e=[].concat(e).reduce(function(t,e){return a[l(e)]?e:t},n)){let n=new Audio;i=h(t.audioPath,e),n.addEventListener("canplay",function(){t.audio[u(e)]=t.audio[i]=this,s(this)}),n.onerror=function(){r("Unable to load audio "+i)},n.src=i,n.load()}else r("cannot play any of the audio formats provided"+e)})}function p(e,i){return i=h(t.dataPath,e),fetch(i).then(function(t){if(!t.ok)throw t;return t.clone().json().catch(function(){return t.text()})}).then(function(n){return t.data[u(e)]=t.data[i]=n,n})}t=kontra.assets={images:{},audio:{},data:{},imagePath:"",audioPath:"",dataPath:"",load(){let t,n,s,r,o,a=[];for(r=0;s=arguments[r];r++)o=(n=l(t=[].concat(s)[0])).match(e)?c(s):n.match(i)?d(s):p(s),a.push(o);return Promise.all(a)},_canUse:a}}(),kontra.gameLoop=function(t){if(!(t=t||{}).update||!t.render)throw Error("You must provide update() and render() functions");let e,i,n,s,r=t.fps||60,o=0,a=1e3/r,h=1/r,l=!1===t.clearCanvas?kontra._noop:function(){kontra.context.clearRect(0,0,kontra.canvas.width,kontra.canvas.height)};function u(){if(i=requestAnimationFrame(u),n=performance.now(),s=n-e,e=n,!(s>1e3)){for(kontra._tick(),o+=s;o>=a;)c.update(h),o-=a;l(),c.render()}}let c={update:t.update,render:t.render,isStopped:!0,start(){e=performance.now(),this.isStopped=!1,requestAnimationFrame(u)},stop(){this.isStopped=!0,cancelAnimationFrame(i)},_frame:u,set _last(t){e=t}};return c},function(){let t={},e={},n={13:"enter",27:"esc",32:"space",37:"left",38:"up",39:"right",40:"down"};for(let t=0;t<26;t++)n[65+t]=(10+t).toString(36);for(i=0;i<10;i++)n[48+i]=""+i;addEventListener("keydown",function(i){let s=n[i.which];e[s]=!0,t[s]&&t[s](i)}),addEventListener("keyup",function(t){e[n[t.which]]=!1}),addEventListener("blur",function(t){e={}}),kontra.keys={bind(e,i){[].concat(e).map(function(e){t[e]=i})},unbind(e,i){[].concat(e).map(function(e){t[e]=i})},pressed:t=>!!e[t]}}(),function(){let t,e=[],i=[],n={},s=[],r={},o={0:"left",1:"middle",2:"right"};function a(e){let i=t.x-Math.max(e.x,Math.min(t.x,e.x+e.width)),n=t.y-Math.max(e.y,Math.min(t.y,e.y+e.height));return i*i+n*n<t.radius*t.radius}function h(){let n,s,r=i.length?i:e;for(let e=r.length-1;e>=0;e--)if(s=(n=r[e]).collidesWithPointer?n.collidesWithPointer(t):a(n))return n}function l(t){r[o[t.button]]=!0,c(t,"onDown")}function u(t){r[o[t.button]]=!1,c(t,"onUp")}function c(e,i){if(!kontra.canvas)return;let s,r,o;-1!==e.type.indexOf("mouse")?(s=e.clientX,r=e.clientY):(s=(e.touches[0]||e.changedTouches[0]).clientX,r=(e.touches[0]||e.changedTouches[0]).clientY),t.x=s-kontra.canvas.offsetLeft,t.y=r-kontra.canvas.offsetTop,e.target===kontra.canvas&&(o=h())&&o[i]&&o[i](),n[i]&&n[i](e,o)}addEventListener("mousedown",l),addEventListener("touchstart",l),addEventListener("mouseup",u),addEventListener("touchend",u),addEventListener("blur",function(t){r={}}),addEventListener("mousemove",function(t){c(t,"onOver")}),t=kontra.pointer={x:0,y:0,radius:5,track(t){[].concat(t).map(function(t){t._r||(t._r=t.render,t.render=function(){e.push(this),this._r()},s.push(t))})},untrack(t,e){[].concat(t).map(function(t){t.render=t._r,t._r=e;let i=s.indexOf(t);-1!==i&&s.splice(i,1)})},over:t=>-1!==s.indexOf(t)&&h()===t,onDown(t){n.onDown=t},onUp(t){n.onUp=t},pressed:t=>!!r[t]},kontra._tick=function(){i.length=0,e.map(function(t){i.push(t)}),e.length=0}}(),kontra.pool=function(t){let e,i=0;if(!(t=t||{}).create||!(e=t.create())||!(e.update&&e.init&&e.isAlive))throw Error("Must provide create() function which returns an object with init(), update(), and isAlive() functions");return{_c:t.create,objects:[t.create()],size:1,maxSize:t.maxSize||1/0,get(t){if(t=t||{},this.objects[0].isAlive()){if(this.size===this.maxSize)return;for(let t=0;t<this.size&&this.objects.length<this.maxSize;t++)this.objects.unshift(this._c());this.size=this.objects.length}let e=this.objects.shift();e.init(t),this.objects.push(e),i++},getAliveObjects(){return this.objects.slice(this.objects.length-i)},clear(){i=this.objects.length=0,this.size=1,this.objects.push(this._c())},update(t){let e,n=this.size-1,s=Math.max(this.objects.length-i,0);for(;n>=s;)(e=this.objects[n]).update(t),e.isAlive()?n--:(this.objects=this.objects.splice(n,1).concat(this.objects),i--,s++)},render(){let t=Math.max(this.objects.length-i,0);for(let e=this.size-1;e>=t;e--)this.objects[e].render()}}},kontra.quadtree=function(t){return{maxDepth:(t=t||{}).maxDepth||3,maxObjects:t.maxObjects||25,_b:!1,_d:t.depth||0,_p:t.parent,bounds:t.bounds||{x:0,y:0,width:kontra.canvas.width,height:kontra.canvas.height},objects:[],subnodes:[],clear(){this.subnodes.map(function(t){t.clear()}),this._b=!1,this.objects.length=0},get(t){let e,i,n=[];for(;this.subnodes.length&&this._b;){for(e=this._g(t),i=0;i<e.length;i++)n.push.apply(n,this.subnodes[e[i]].get(t));return n}return this.objects},add(){let t,e,i,n;for(e=0;e<arguments.length;e++)if(i=arguments[e],Array.isArray(i))this.add.apply(this,i);else if(this._b)this._a(i);else if(this.objects.push(i),this.objects.length>this.maxObjects&&this._d<this.maxDepth){for(this._s(),t=0;n=this.objects[t];t++)this._a(n);this.objects.length=0}},_a(t,e,i){for(e=this._g(t),i=0;i<e.length;i++)this.subnodes[e[i]].add(t)},_g(t){let e=[],i=this.bounds.x+this.bounds.width/2,n=this.bounds.y+this.bounds.height/2,s=t.y<n&&t.y+t.height>=this.bounds.y,r=t.y+t.height>=n&&t.y<this.bounds.y+this.bounds.height;return t.x<i&&t.x+t.width>=this.bounds.x&&(s&&e.push(0),r&&e.push(2)),t.x+t.width>=i&&t.x<this.bounds.x+this.bounds.width&&(s&&e.push(1),r&&e.push(3)),e},_s(t,e,i){if(this._b=!0,!this.subnodes.length)for(t=this.bounds.width/2|0,e=this.bounds.height/2|0,i=0;i<4;i++)this.subnodes[i]=kontra.quadtree({bounds:{x:this.bounds.x+(i%2==1?t:0),y:this.bounds.y+(i>=2?e:0),width:t,height:e},depth:this._d+1,maxDepth:this.maxDepth,maxObjects:this.maxObjects,parent:this})}}},function(){class t{constructor(t,e){this._x=t||0,this._y=e||0}add(t,e){this.x+=(t.x||0)*(e||1),this.y+=(t.y||0)*(e||1)}clamp(t,e,i,n){this._c=!0,this._a=t,this._b=e,this._d=i,this._e=n}get x(){return this._x}get y(){return this._y}set x(t){this._x=this._c?Math.min(Math.max(this._a,t),this._d):t}set y(t){this._y=this._c?Math.min(Math.max(this._b,t),this._e):t}}kontra.vector=((e,i)=>new t(e,i)),kontra.vector.prototype=t.prototype;class e{init(t,e,i,n){for(e in t=t||{},this.position=kontra.vector(t.x,t.y),this.velocity=kontra.vector(t.dx,t.dy),this.acceleration=kontra.vector(t.ddx,t.ddy),this.width=this.height=0,this.context=kontra.context,t)this[e]=t[e];if(i=t.image)this.image=i,this.width=i.width,this.height=i.height;else if(i=t.animations){for(e in i)this.animations[e]=i[e].clone(),n=n||i[e];this._ca=n,this.width=n.width,this.height=n.height}return this}get x(){return this.position.x}get y(){return this.position.y}get dx(){return this.velocity.x}get dy(){return this.velocity.y}get ddx(){return this.acceleration.x}get ddy(){return this.acceleration.y}set x(t){this.position.x=t}set y(t){this.position.y=t}set dx(t){this.velocity.x=t}set dy(t){this.velocity.y=t}set ddx(t){this.acceleration.x=t}set ddy(t){this.acceleration.y=t}isAlive(){return this.ttl>0}collidesWith(t){return this.x<t.x+t.width&&this.x+this.width>t.x&&this.y<t.y+t.height&&this.y+this.height>t.y}update(t){this.advance(t)}render(){this.draw()}playAnimation(t){this._ca=this.animations[t],this._ca.loop||this._ca.reset()}advance(t){this.velocity.add(this.acceleration,t),this.position.add(this.velocity,t),this.ttl--,this._ca&&this._ca.update(t)}draw(){this.image?this.context.drawImage(this.image,this.x,this.y):this._ca?this._ca.render(this):(this.context.fillStyle=this.color,this.context.fillRect(this.x,this.y,this.width,this.height))}}kontra.sprite=(t=>(new e).init(t)),kontra.sprite.prototype=e.prototype}(),function(){class t{constructor(t,e){t=t||{},this.spriteSheet=t.spriteSheet,this.frames=t.frames,this.frameRate=t.frameRate,this.loop=void 0===t.loop||t.loop,e=t.spriteSheet.frame,this.width=e.width,this.height=e.height,this.margin=e.margin||0,this._f=0,this._a=0}clone(){return kontra.animation(this)}reset(){this._f=0,this._a=0}update(t){if(this.loop||this._f!=this.frames.length-1)for(t=t||1/60,this._a+=t;this._a*this.frameRate>=1;)this._f=++this._f%this.frames.length,this._a-=1/this.frameRate}render(t){t=t||{};let e=this.frames[this._f]/this.spriteSheet._f|0,i=this.frames[this._f]%this.spriteSheet._f|0;(t.context||kontra.context).drawImage(this.spriteSheet.image,i*this.width+(2*i+1)*this.margin,e*this.height+(2*e+1)*this.margin,this.width,this.height,t.x,t.y,this.width,this.height)}}kontra.animation=function(e){return new t(e)},kontra.animation.prototype=t.prototype;class e{constructor(t){if(!(t=t||{}).image)throw Error("You must provide an Image for the SpriteSheet");this.animations={},this.image=t.image,this.frame={width:t.frameWidth,height:t.frameHeight,margin:t.frameMargin},this._f=t.image.width/t.frameWidth|0,this.createAnimations(t.animations)}createAnimations(t){let e,i,n,s;for(s in t){if(i=(e=t[s]).frames,n=[],void 0===i)throw Error("Animation "+s+" must provide a frames property");[].concat(i).map(function(t){n=n.concat(this._p(t))},this),this.animations[s]=kontra.animation({spriteSheet:this,frames:n,frameRate:e.frameRate,loop:e.loop})}}_p(t,e){if(+t===t)return t;let i=[],n=t.split(".."),s=e=+n[0],r=+n[1];if(s<r)for(;e<=r;e++)i.push(e);else for(;e>=r;e--)i.push(e);return i}}kontra.spriteSheet=function(t){return new e(t)},kontra.spriteSheet.prototype=e.prototype}(),kontra.store={set(t,e){void 0===e?localStorage.removeItem(t):localStorage.setItem(t,JSON.stringify(e))},get(t){let e=localStorage.getItem(t);try{e=JSON.parse(e)}catch(t){}return e}},kontra.tileEngine=function(t){if(!(t=t||{}).width||!t.height)throw Error("You must provide width and height properties");function e(t){let e,i;return void 0!==t.x&&void 0!==t.y?(e=v.getRow(t.y),i=v.getCol(t.x)):(e=t.row,i=t.col),e<0||i<0||e>=o||i>=r?-1:i+e*r}function i(t){let e,i,n=0,s=v.tilesets.length-1;for(;n<=s;){if(e=(n+s)/2|0,t>=(i=v.tilesets[e]).firstGrid&&t<=i.lastGrid)return i;i.lastGrid<t?n=e+1:s=e-1}}let n,s,r=t.width,o=t.height,a=t.tileWidth||t.tilewidth||32,h=t.tileHeight||t.tileheight||32,l=r*a,u=o*h,c=t.context||kontra.context,d=c.canvas.width,p=c.canvas.height,f=document.createElement("canvas"),g=f.getContext("2d"),y=Math.max(0,l-d),m=Math.max(0,u-p),b=[],v={width:r,height:o,tileWidth:a,tileHeight:h,mapWidth:l,mapHeight:u,context:c,x:t.x||0,y:t.y||0,tilesets:[],layers:{},addTilesets:function(t){[].concat(t).map(function(t){let e,i,n,s,r,o=t.image;if(""+o===o){let t=1/0;for(;t>=0;){let i=(t=o.lastIndexOf("/",t))<0?o:o.substr(t);if(kontra.assets.images[i]){e=kontra.assets.images[i];break}t--}}else e=o;i=t.firstGrid,n=(e.width/a|0||1)*(e.height/h|0||1),i||(v.tilesets.length>0?(r=((s=v.tilesets[v.tilesets.length-1]).image.width/a|0)*(s.image.height/h|0),i=s.firstGrid+r):i=1),v.tilesets.push({firstGrid:i,lastGrid:i+n-1,image:e}),v.tilesets.sort(function(t,e){return t.firstGrid-e.firstGrid})})},addLayers:function(t){[].concat(t).map(function(t){let e,i,n,s,o,a;if(t.render=void 0===t.render||t.render,Array.isArray(t.data[0]))for(e=[],i=0;n=t.data[i];i++)for(s=0;s<r;s++)e.push(n[s]||0);else e=t.data;for(o in v.layers[t.name]={data:e,zIndex:t.zIndex||0,render:t.render},t.properties){a=t.properties[o];try{a=JSON.parse(a)}catch(t){}v.layers[t.name][o]=a}v.layers[t.name].render&&(b.push(t.name),b.sort(function(t,e){return v.layers[t].zIndex-v.layers[e].zIndex}))}),function(){let t,e,n,s,o,l,u,c,d;for(let p,f=0;p=v.layers[b[f]];f++)for(let f=0,y=p.data.length;f<y;f++)(t=p.data[f])&&(n=(e=i(t)).image,s=f%r*a,o=(f/r|0)*h,l=(c=t-e.firstGrid)%(d=n.width/a)*a,u=(c/d|0)*h,g.drawImage(n,l,u,a,h,s,o,a,h))}()},layerCollidesWith:function(t,i){let n,s=v.getRow(i.y),r=v.getCol(i.x),o=v.getRow(i.y+i.height),a=v.getCol(i.x+i.width);for(let i=s;i<=o;i++)for(let s=r;s<=a;s++)if(n=e({row:i,col:s}),v.layers[t].data[n])return!0;return!1},tileAtLayer:function(t,i){let n=e(i);if(n>=0)return v.layers[t].data[n]},render:function(){v.context.drawImage(f,v.sx,v.sy,d,p,v.x,v.y,d,p)},renderLayer:function(t){let n,s,l,u,c,f,g,y,m,b=v.layers[t],x=v.getRow(),k=v.getCol(),w=e({row:x,col:k}),A=k*a-v.sx,M=x*h-v.sy,W=Math.min(Math.ceil(d/a)+1,r),_=W*Math.min(Math.ceil(p/h)+1,o),N=0;for(;N<_;)(l=b.data[w])&&(c=(u=i(l)).image,n=A+N%W*a,s=M+(N/W|0)*h,y=(f=l-u.firstGrid)%(g=c.width/a)*a,m=(f/g|0)*h,v.context.drawImage(c,y,m,a,h,n,s,a,h)),++N%W==0?w=k+ ++x*r:w++},getRow:function(t){return t=t||0,(v.sy+t)/h|0},getCol:function(t){return t=t||0,(v.sx+t)/a|0},get sx(){return n},get sy(){return s},set sx(t){n=Math.min(Math.max(0,t),y)},set sy(t){s=Math.min(Math.max(0,t),m)},_layerOrder:b};v.sx=t.sx||0,v.sy=t.sy||0,f.width=l,f.height=u;for(let e in t.properties){let i=t.properties[e];try{i=JSON.parse(i)}catch(t){}v[e]=v[e]||i}return t.tilesets&&v.addTilesets(t.tilesets),t.layers&&v.addLayers(t.layers),v}},function(t,e,i){t.exports={Heap:i(3),Node:i(5),Grid:i(15),Util:i(1),DiagonalMovement:i(0),Heuristic:i(2),AStarFinder:i(6),BestFirstFinder:i(16),BreadthFirstFinder:i(17),DijkstraFinder:i(18),BiAStarFinder:i(7),BiBestFirstFinder:i(19),BiBreadthFirstFinder:i(20),BiDijkstraFinder:i(21),IDAStarFinder:i(22),JumpPointFinder:i(23)}},function(t,e,i){(function(t){(function(){var e,i,n,s,r,o,a,h,l,u,c,d,p,f,g;n=Math.floor,u=Math.min,i=function(t,e){return t<e?-1:t>e?1:0},l=function(t,e,s,r,o){var a;if(null==s&&(s=0),null==o&&(o=i),s<0)throw new Error("lo must be non-negative");for(null==r&&(r=t.length);s<r;)o(e,t[a=n((s+r)/2)])<0?r=a:s=a+1;return[].splice.apply(t,[s,s-s].concat(e)),e},o=function(t,e,n){return null==n&&(n=i),t.push(e),f(t,0,t.length-1,n)},r=function(t,e){var n,s;return null==e&&(e=i),n=t.pop(),t.length?(s=t[0],t[0]=n,g(t,0,e)):s=n,s},h=function(t,e,n){var s;return null==n&&(n=i),s=t[0],t[0]=e,g(t,0,n),s},a=function(t,e,n){var s;return null==n&&(n=i),t.length&&n(t[0],e)<0&&(e=(s=[t[0],e])[0],t[0]=s[1],g(t,0,n)),e},s=function(t,e){var s,r,o,a,h,l;for(null==e&&(e=i),h=[],r=0,o=(a=function(){l=[];for(var e=0,i=n(t.length/2);0<=i?e<i:e>i;0<=i?e++:e--)l.push(e);return l}.apply(this).reverse()).length;r<o;r++)s=a[r],h.push(g(t,s,e));return h},p=function(t,e,n){var s;if(null==n&&(n=i),-1!==(s=t.indexOf(e)))return f(t,0,s,n),g(t,s,n)},c=function(t,e,n){var r,o,h,l,u;if(null==n&&(n=i),!(o=t.slice(0,e)).length)return o;for(s(o,n),h=0,l=(u=t.slice(e)).length;h<l;h++)r=u[h],a(o,r,n);return o.sort(n).reverse()},d=function(t,e,n){var o,a,h,c,d,p,f,g,y;if(null==n&&(n=i),10*e<=t.length){if(!(h=t.slice(0,e).sort(n)).length)return h;for(a=h[h.length-1],c=0,p=(f=t.slice(e)).length;c<p;c++)n(o=f[c],a)<0&&(l(h,o,0,null,n),h.pop(),a=h[h.length-1]);return h}for(s(t,n),y=[],d=0,g=u(e,t.length);0<=g?d<g:d>g;0<=g?++d:--d)y.push(r(t,n));return y},f=function(t,e,n,s){var r,o,a;for(null==s&&(s=i),r=t[n];n>e&&s(r,o=t[a=n-1>>1])<0;)t[n]=o,n=a;return t[n]=r},g=function(t,e,n){var s,r,o,a,h;for(null==n&&(n=i),r=t.length,h=e,o=t[e],s=2*e+1;s<r;)(a=s+1)<r&&!(n(t[s],t[a])<0)&&(s=a),t[e]=t[s],s=2*(e=s)+1;return t[e]=o,f(t,h,e,n)},e=function(){function t(t){this.cmp=null!=t?t:i,this.nodes=[]}return t.push=o,t.pop=r,t.replace=h,t.pushpop=a,t.heapify=s,t.updateItem=p,t.nlargest=c,t.nsmallest=d,t.prototype.push=function(t){return o(this.nodes,t,this.cmp)},t.prototype.pop=function(){return r(this.nodes,this.cmp)},t.prototype.peek=function(){return this.nodes[0]},t.prototype.contains=function(t){return-1!==this.nodes.indexOf(t)},t.prototype.replace=function(t){return h(this.nodes,t,this.cmp)},t.prototype.pushpop=function(t){return a(this.nodes,t,this.cmp)},t.prototype.heapify=function(){return s(this.nodes,this.cmp)},t.prototype.updateItem=function(t){return p(this.nodes,t,this.cmp)},t.prototype.clear=function(){return this.nodes=[]},t.prototype.empty=function(){return 0===this.nodes.length},t.prototype.size=function(){return this.nodes.length},t.prototype.clone=function(){var e;return(e=new t).nodes=this.nodes.slice(0),e},t.prototype.toArray=function(){return this.nodes.slice(0)},t.prototype.insert=t.prototype.push,t.prototype.top=t.prototype.peek,t.prototype.front=t.prototype.peek,t.prototype.has=t.prototype.contains,t.prototype.copy=t.prototype.clone,t}(),(void 0!==t&&null!==t?t.exports:void 0)?t.exports=e:window.Heap=e}).call(this)}).call(this,i(14)(t))},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},function(t,e,i){var n=i(5),s=i(0);function r(t,e,i){var n;"object"!=typeof t?n=t:(e=t.length,n=t[0].length,i=t),this.width=n,this.height=e,this.nodes=this._buildNodes(n,e,i)}r.prototype._buildNodes=function(t,e,i){var s,r,o=new Array(e);for(s=0;s<e;++s)for(o[s]=new Array(t),r=0;r<t;++r)o[s][r]=new n(r,s);if(void 0===i)return o;if(i.length!==e||i[0].length!==t)throw new Error("Matrix size does not fit");for(s=0;s<e;++s)for(r=0;r<t;++r)i[s][r]&&(o[s][r].walkable=!1);return o},r.prototype.getNodeAt=function(t,e){return this.nodes[e][t]},r.prototype.isWalkableAt=function(t,e){return this.isInside(t,e)&&this.nodes[e][t].walkable},r.prototype.isInside=function(t,e){return t>=0&&t<this.width&&e>=0&&e<this.height},r.prototype.setWalkableAt=function(t,e,i){this.nodes[e][t].walkable=i},r.prototype.getNeighbors=function(t,e){var i=t.x,n=t.y,r=[],o=!1,a=!1,h=!1,l=!1,u=!1,c=!1,d=!1,p=!1,f=this.nodes;if(this.isWalkableAt(i,n-1)&&(r.push(f[n-1][i]),o=!0),this.isWalkableAt(i+1,n)&&(r.push(f[n][i+1]),h=!0),this.isWalkableAt(i,n+1)&&(r.push(f[n+1][i]),u=!0),this.isWalkableAt(i-1,n)&&(r.push(f[n][i-1]),d=!0),e===s.Never)return r;if(e===s.OnlyWhenNoObstacles)a=d&&o,l=o&&h,c=h&&u,p=u&&d;else if(e===s.IfAtMostOneObstacle)a=d||o,l=o||h,c=h||u,p=u||d;else{if(e!==s.Always)throw new Error("Incorrect value of diagonalMovement");a=!0,l=!0,c=!0,p=!0}return a&&this.isWalkableAt(i-1,n-1)&&r.push(f[n-1][i-1]),l&&this.isWalkableAt(i+1,n-1)&&r.push(f[n-1][i+1]),c&&this.isWalkableAt(i+1,n+1)&&r.push(f[n+1][i+1]),p&&this.isWalkableAt(i-1,n+1)&&r.push(f[n+1][i-1]),r},r.prototype.clone=function(){var t,e,i=this.width,s=this.height,o=this.nodes,a=new r(i,s),h=new Array(s);for(t=0;t<s;++t)for(h[t]=new Array(i),e=0;e<i;++e)h[t][e]=new n(e,t,o[t][e].walkable);return a.nodes=h,a},t.exports=r},function(t,e,i){var n=i(6);function s(t){n.call(this,t);var e=this.heuristic;this.heuristic=function(t,i){return 1e6*e(t,i)}}s.prototype=new n,s.prototype.constructor=s,t.exports=s},function(t,e,i){var n=i(1),s=i(0);function r(t){t=t||{},this.allowDiagonal=t.allowDiagonal,this.dontCrossCorners=t.dontCrossCorners,this.diagonalMovement=t.diagonalMovement,this.diagonalMovement||(this.allowDiagonal?this.dontCrossCorners?this.diagonalMovement=s.OnlyWhenNoObstacles:this.diagonalMovement=s.IfAtMostOneObstacle:this.diagonalMovement=s.Never)}r.prototype.findPath=function(t,e,i,s,r){var o,a,h,l,u,c=[],d=this.diagonalMovement,p=r.getNodeAt(t,e),f=r.getNodeAt(i,s);for(c.push(p),p.opened=!0;c.length;){if((h=c.shift()).closed=!0,h===f)return n.backtrace(f);for(l=0,u=(o=r.getNeighbors(h,d)).length;l<u;++l)(a=o[l]).closed||a.opened||(c.push(a),a.opened=!0,a.parent=h)}return[]},t.exports=r},function(t,e,i){var n=i(6);function s(t){n.call(this,t),this.heuristic=function(t,e){return 0}}s.prototype=new n,s.prototype.constructor=s,t.exports=s},function(t,e,i){var n=i(7);function s(t){n.call(this,t);var e=this.heuristic;this.heuristic=function(t,i){return 1e6*e(t,i)}}s.prototype=new n,s.prototype.constructor=s,t.exports=s},function(t,e,i){var n=i(1),s=i(0);function r(t){t=t||{},this.allowDiagonal=t.allowDiagonal,this.dontCrossCorners=t.dontCrossCorners,this.diagonalMovement=t.diagonalMovement,this.diagonalMovement||(this.allowDiagonal?this.dontCrossCorners?this.diagonalMovement=s.OnlyWhenNoObstacles:this.diagonalMovement=s.IfAtMostOneObstacle:this.diagonalMovement=s.Never)}r.prototype.findPath=function(t,e,i,s,r){var o,a,h,l,u,c=r.getNodeAt(t,e),d=r.getNodeAt(i,s),p=[],f=[],g=this.diagonalMovement;for(p.push(c),c.opened=!0,c.by=0,f.push(d),d.opened=!0,d.by=1;p.length&&f.length;){for((h=p.shift()).closed=!0,l=0,u=(o=r.getNeighbors(h,g)).length;l<u;++l)if(!(a=o[l]).closed)if(a.opened){if(1===a.by)return n.biBacktrace(h,a)}else p.push(a),a.parent=h,a.opened=!0,a.by=0;for((h=f.shift()).closed=!0,l=0,u=(o=r.getNeighbors(h,g)).length;l<u;++l)if(!(a=o[l]).closed)if(a.opened){if(0===a.by)return n.biBacktrace(a,h)}else f.push(a),a.parent=h,a.opened=!0,a.by=1}return[]},t.exports=r},function(t,e,i){var n=i(7);function s(t){n.call(this,t),this.heuristic=function(t,e){return 0}}s.prototype=new n,s.prototype.constructor=s,t.exports=s},function(t,e,i){i(1);var n=i(2),s=i(5),r=i(0);function o(t){t=t||{},this.allowDiagonal=t.allowDiagonal,this.dontCrossCorners=t.dontCrossCorners,this.diagonalMovement=t.diagonalMovement,this.heuristic=t.heuristic||n.manhattan,this.weight=t.weight||1,this.trackRecursion=t.trackRecursion||!1,this.timeLimit=t.timeLimit||1/0,this.diagonalMovement||(this.allowDiagonal?this.dontCrossCorners?this.diagonalMovement=r.OnlyWhenNoObstacles:this.diagonalMovement=r.IfAtMostOneObstacle:this.diagonalMovement=r.Never),this.diagonalMovement===r.Never?this.heuristic=t.heuristic||n.manhattan:this.heuristic=t.heuristic||n.octile}o.prototype.findPath=function(t,e,i,n,r){var o,a,h,l=(new Date).getTime(),u=function(t,e){return this.heuristic(Math.abs(e.x-t.x),Math.abs(e.y-t.y))}.bind(this),c=function(t,e){return t.x===e.x||t.y===e.y?1:Math.SQRT2},d=function(t,e,i,n,o){if(this.timeLimit>0&&(new Date).getTime()-l>1e3*this.timeLimit)return 1/0;var a,h,p,g,y=e+u(t,f)*this.weight;if(y>i)return y;if(t==f)return n[o]=[t.x,t.y],t;var m=r.getNeighbors(t,this.diagonalMovement);for(p=0,a=1/0;g=m[p];++p){if(this.trackRecursion&&(g.retainCount=g.retainCount+1||1,!0!==g.tested&&(g.tested=!0)),(h=d(g,e+c(t,g),i,n,o+1))instanceof s)return n[o]=[t.x,t.y],h;this.trackRecursion&&0==--g.retainCount&&(g.tested=!1),h<a&&(a=h)}return a}.bind(this),p=r.getNodeAt(t,e),f=r.getNodeAt(i,n),g=u(p,f);for(o=0;;++o){if((h=d(p,0,g,a=[],0))===1/0)return[];if(h instanceof s)return a;g=h}return[]},t.exports=o},function(t,e,i){var n=i(0),s=i(24),r=i(25),o=i(26),a=i(27);t.exports=function(t){return(t=t||{}).diagonalMovement===n.Never?new s(t):t.diagonalMovement===n.Always?new r(t):t.diagonalMovement===n.OnlyWhenNoObstacles?new o(t):new a(t)}},function(t,e,i){var n=i(4),s=i(0);function r(t){n.call(this,t)}r.prototype=new n,r.prototype.constructor=r,r.prototype._jump=function(t,e,i,n){var s=this.grid,r=t-i,o=e-n;if(!s.isWalkableAt(t,e))return null;if(!0===this.trackJumpRecursion&&(s.getNodeAt(t,e).tested=!0),s.getNodeAt(t,e)===this.endNode)return[t,e];if(0!==r){if(s.isWalkableAt(t,e-1)&&!s.isWalkableAt(t-r,e-1)||s.isWalkableAt(t,e+1)&&!s.isWalkableAt(t-r,e+1))return[t,e]}else{if(0===o)throw new Error("Only horizontal and vertical movements are allowed");if(s.isWalkableAt(t-1,e)&&!s.isWalkableAt(t-1,e-o)||s.isWalkableAt(t+1,e)&&!s.isWalkableAt(t+1,e-o))return[t,e];if(this._jump(t+1,e,t,e)||this._jump(t-1,e,t,e))return[t,e]}return this._jump(t+r,e+o,t,e)},r.prototype._findNeighbors=function(t){var e,i,n,r,o,a,h,l,u=t.parent,c=t.x,d=t.y,p=this.grid,f=[];if(u)e=u.x,i=u.y,n=(c-e)/Math.max(Math.abs(c-e),1),r=(d-i)/Math.max(Math.abs(d-i),1),0!==n?(p.isWalkableAt(c,d-1)&&f.push([c,d-1]),p.isWalkableAt(c,d+1)&&f.push([c,d+1]),p.isWalkableAt(c+n,d)&&f.push([c+n,d])):0!==r&&(p.isWalkableAt(c-1,d)&&f.push([c-1,d]),p.isWalkableAt(c+1,d)&&f.push([c+1,d]),p.isWalkableAt(c,d+r)&&f.push([c,d+r]));else for(h=0,l=(o=p.getNeighbors(t,s.Never)).length;h<l;++h)a=o[h],f.push([a.x,a.y]);return f},t.exports=r},function(t,e,i){var n=i(4),s=i(0);function r(t){n.call(this,t)}r.prototype=new n,r.prototype.constructor=r,r.prototype._jump=function(t,e,i,n){var s=this.grid,r=t-i,o=e-n;if(!s.isWalkableAt(t,e))return null;if(!0===this.trackJumpRecursion&&(s.getNodeAt(t,e).tested=!0),s.getNodeAt(t,e)===this.endNode)return[t,e];if(0!==r&&0!==o){if(s.isWalkableAt(t-r,e+o)&&!s.isWalkableAt(t-r,e)||s.isWalkableAt(t+r,e-o)&&!s.isWalkableAt(t,e-o))return[t,e];if(this._jump(t+r,e,t,e)||this._jump(t,e+o,t,e))return[t,e]}else if(0!==r){if(s.isWalkableAt(t+r,e+1)&&!s.isWalkableAt(t,e+1)||s.isWalkableAt(t+r,e-1)&&!s.isWalkableAt(t,e-1))return[t,e]}else if(s.isWalkableAt(t+1,e+o)&&!s.isWalkableAt(t+1,e)||s.isWalkableAt(t-1,e+o)&&!s.isWalkableAt(t-1,e))return[t,e];return this._jump(t+r,e+o,t,e)},r.prototype._findNeighbors=function(t){var e,i,n,r,o,a,h,l,u=t.parent,c=t.x,d=t.y,p=this.grid,f=[];if(u)e=u.x,i=u.y,n=(c-e)/Math.max(Math.abs(c-e),1),r=(d-i)/Math.max(Math.abs(d-i),1),0!==n&&0!==r?(p.isWalkableAt(c,d+r)&&f.push([c,d+r]),p.isWalkableAt(c+n,d)&&f.push([c+n,d]),p.isWalkableAt(c+n,d+r)&&f.push([c+n,d+r]),p.isWalkableAt(c-n,d)||f.push([c-n,d+r]),p.isWalkableAt(c,d-r)||f.push([c+n,d-r])):0===n?(p.isWalkableAt(c,d+r)&&f.push([c,d+r]),p.isWalkableAt(c+1,d)||f.push([c+1,d+r]),p.isWalkableAt(c-1,d)||f.push([c-1,d+r])):(p.isWalkableAt(c+n,d)&&f.push([c+n,d]),p.isWalkableAt(c,d+1)||f.push([c+n,d+1]),p.isWalkableAt(c,d-1)||f.push([c+n,d-1]));else for(h=0,l=(o=p.getNeighbors(t,s.Always)).length;h<l;++h)a=o[h],f.push([a.x,a.y]);return f},t.exports=r},function(t,e,i){var n=i(4),s=i(0);function r(t){n.call(this,t)}r.prototype=new n,r.prototype.constructor=r,r.prototype._jump=function(t,e,i,n){var s=this.grid,r=t-i,o=e-n;if(!s.isWalkableAt(t,e))return null;if(!0===this.trackJumpRecursion&&(s.getNodeAt(t,e).tested=!0),s.getNodeAt(t,e)===this.endNode)return[t,e];if(0!==r&&0!==o){if(this._jump(t+r,e,t,e)||this._jump(t,e+o,t,e))return[t,e]}else if(0!==r){if(s.isWalkableAt(t,e-1)&&!s.isWalkableAt(t-r,e-1)||s.isWalkableAt(t,e+1)&&!s.isWalkableAt(t-r,e+1))return[t,e]}else if(0!==o&&(s.isWalkableAt(t-1,e)&&!s.isWalkableAt(t-1,e-o)||s.isWalkableAt(t+1,e)&&!s.isWalkableAt(t+1,e-o)))return[t,e];return s.isWalkableAt(t+r,e)&&s.isWalkableAt(t,e+o)?this._jump(t+r,e+o,t,e):null},r.prototype._findNeighbors=function(t){var e,i,n,r,o,a,h,l,u,c=t.parent,d=t.x,p=t.y,f=this.grid,g=[];if(c){if(e=c.x,i=c.y,n=(d-e)/Math.max(Math.abs(d-e),1),r=(p-i)/Math.max(Math.abs(p-i),1),0!==n&&0!==r)f.isWalkableAt(d,p+r)&&g.push([d,p+r]),f.isWalkableAt(d+n,p)&&g.push([d+n,p]),f.isWalkableAt(d,p+r)&&f.isWalkableAt(d+n,p)&&g.push([d+n,p+r]);else if(0!==n){u=f.isWalkableAt(d+n,p);var y=f.isWalkableAt(d,p+1),m=f.isWalkableAt(d,p-1);u&&(g.push([d+n,p]),y&&g.push([d+n,p+1]),m&&g.push([d+n,p-1])),y&&g.push([d,p+1]),m&&g.push([d,p-1])}else if(0!==r){u=f.isWalkableAt(d,p+r);var b=f.isWalkableAt(d+1,p),v=f.isWalkableAt(d-1,p);u&&(g.push([d,p+r]),b&&g.push([d+1,p+r]),v&&g.push([d-1,p+r])),b&&g.push([d+1,p]),v&&g.push([d-1,p])}}else for(h=0,l=(o=f.getNeighbors(t,s.OnlyWhenNoObstacles)).length;h<l;++h)a=o[h],g.push([a.x,a.y]);return g},t.exports=r},function(t,e,i){var n=i(4),s=i(0);function r(t){n.call(this,t)}r.prototype=new n,r.prototype.constructor=r,r.prototype._jump=function(t,e,i,n){var s=this.grid,r=t-i,o=e-n;if(!s.isWalkableAt(t,e))return null;if(!0===this.trackJumpRecursion&&(s.getNodeAt(t,e).tested=!0),s.getNodeAt(t,e)===this.endNode)return[t,e];if(0!==r&&0!==o){if(s.isWalkableAt(t-r,e+o)&&!s.isWalkableAt(t-r,e)||s.isWalkableAt(t+r,e-o)&&!s.isWalkableAt(t,e-o))return[t,e];if(this._jump(t+r,e,t,e)||this._jump(t,e+o,t,e))return[t,e]}else if(0!==r){if(s.isWalkableAt(t+r,e+1)&&!s.isWalkableAt(t,e+1)||s.isWalkableAt(t+r,e-1)&&!s.isWalkableAt(t,e-1))return[t,e]}else if(s.isWalkableAt(t+1,e+o)&&!s.isWalkableAt(t+1,e)||s.isWalkableAt(t-1,e+o)&&!s.isWalkableAt(t-1,e))return[t,e];return s.isWalkableAt(t+r,e)||s.isWalkableAt(t,e+o)?this._jump(t+r,e+o,t,e):null},r.prototype._findNeighbors=function(t){var e,i,n,r,o,a,h,l,u=t.parent,c=t.x,d=t.y,p=this.grid,f=[];if(u)e=u.x,i=u.y,n=(c-e)/Math.max(Math.abs(c-e),1),r=(d-i)/Math.max(Math.abs(d-i),1),0!==n&&0!==r?(p.isWalkableAt(c,d+r)&&f.push([c,d+r]),p.isWalkableAt(c+n,d)&&f.push([c+n,d]),(p.isWalkableAt(c,d+r)||p.isWalkableAt(c+n,d))&&f.push([c+n,d+r]),!p.isWalkableAt(c-n,d)&&p.isWalkableAt(c,d+r)&&f.push([c-n,d+r]),!p.isWalkableAt(c,d-r)&&p.isWalkableAt(c+n,d)&&f.push([c+n,d-r])):0===n?p.isWalkableAt(c,d+r)&&(f.push([c,d+r]),p.isWalkableAt(c+1,d)||f.push([c+1,d+r]),p.isWalkableAt(c-1,d)||f.push([c-1,d+r])):p.isWalkableAt(c+n,d)&&(f.push([c+n,d]),p.isWalkableAt(c,d+1)||f.push([c+n,d+1]),p.isWalkableAt(c,d-1)||f.push([c+n,d-1]));else for(h=0,l=(o=p.getNeighbors(t,s.IfAtMostOneObstacle)).length;h<l;++h)a=o[h],f.push([a.x,a.y]);return f},t.exports=r},function(t,e,i){"use strict";i.r(e),i(11);const n={Moving:1,Leaving:2};function s(t,e,i=8){const{x:s,y:o}=function(t,e){let i,n;do{i=Math.floor(320*Math.random()),n=Math.floor(320*Math.random())}while(e.layerCollidesWith("wall",{x:i,y:n,width:8,height:8}));return{x:i,y:n}}(0,e);return{width:i,height:i,speed:1,x:s,y:o,color:"black",meta:{type:"visitor",id:Math.floor(1e3*Math.random())+"",lastDirectionChange:Date.now()-1e5},previously:{x:0,y:0},ttl:1/0,state:n.Moving,dx:1,dy:1,update:function(){const t=Date.now();if(this.state===n.Moving){if(t-this.meta.lastDirectionChange>5e3){const[e,i]={0:[1,0],1:[0,1],2:[-1,0],3:[0,-1]}[Math.floor(4*Math.random())];this.dy=i*(0===this.dy?this.speed:this.dy),this.dx=e*(0===this.dx?this.speed:this.dx),this.meta.lastDirectionChange=t}this.previously.x=this.x,this.previously.y=this.y,this.x+=this.dx,this.y+=this.dy,r(e,this)}}}}function r(t,e){!function(t,e){t.layerCollidesWith("wall",e)&&(e.x=e.previously.x,e.y=e.previously.y)}(t,e),function(t,e){t.layerCollidesWith("doors",e)&&("player"===e.meta.type?console.log("TODO load room"):(e.state!==n.Leaving&&(e.ttl=0,e.dx=0,e.dy=0),e.state=n.Leaving))}(t,e)}new(i(8).AStarFinder);var o=i(9),a=i.n(o),h=i(10),l=i.n(h);kontra.init(),function(t,e=a.a,i=l.a){return function(t){return new Promise(e=>{const i=new Image;i.src=t,i.onload=e})}(i).then(()=>t.assets.load(e,i).then(([e])=>{let n=t.tileEngine({tileWidth:10,tileHeight:10,width:32,height:32});return n.addTilesets({image:i}),n.addLayers(e.layers),n}))}(kontra).then(t=>{let e=kontra.pool({create:kontra.sprite}),i=function(t,e=8){return kontra.sprite({width:e,height:e,speed:2,x:e+10,y:e+10,color:"red",meta:{type:"player"},previously:{x:e,y:e,speed:3}})}();for(let i=0;i<12;i++)e.get(s(kontra,t));const n=[i];kontra.gameLoop({fps:60,update:function(){e.update(),n.forEach(t=>{t.update()})},render:function(){t.render(),e.render(),function(t,e,i){i.previously.x=i.x,i.previously.y=i.y;const n=t.keys.pressed("left"),s=t.keys.pressed("right"),o=t.keys.pressed("up"),a=t.keys.pressed("down"),h=n?-1:s?1:0,l=o?-1:a?1:0,u=i.y+l*i.speed,c=i.x+h*i.speed;i.x=c,i.y=u,r(e,i)}(kontra,t,i),n.forEach(t=>t.render())}}).start()})}]);