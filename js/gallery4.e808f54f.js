(self.webpackChunkthree_gallery=self.webpackChunkthree_gallery||[]).push([[774],{4817:function(e,n,t){"use strict";t.d(n,{K:function(){return c}});var i=t(2212),r=t(105),o=t(3466),a=t.n(o),d=t(3555);function c(e,n,t,o,c,u,s,l,p){var h=window.innerWidth,m=window.innerHeight,w=window.devicePixelRatio,f=200;return{initScene:function(){return e=new i.Scene},initCamera:function(){var t=h/m;return(n=new i.OrthographicCamera(-f*t,f*t,f,-f,1,1e3)).position.set(200,200,200),n.lookAt(e.position),n},initRenderer:function(e){return(t=new i.WebGLRenderer).setPixelRatio(w),t.setSize(h,m),t.setClearColor(12178431),e.appendChild(t.domElement),t},initLight:function(){(o=new i.DirectionalLight(16777215)).position.set(400,200,300),e.add(o),c=new i.AmbientLight(4473924),e.add(c)},initControls:function(){return(l=new r.Z(n,t.domElement)).draggingDampingFactor=1,l},initClock:function(){return new i.Clock},initHelpers:function(){u=new i.AxesHelper(250),e.add(u)},initStats:function(e){return(s=new(a())).showPanel(0),s.dom.style.position="absolute",s.dom.style.left="0px",s.dom.style.top="0px",e&&e.appendChild(s.dom),s},windowResize:(0,d.vA)((function(){var e=window.innerWidth,i=window.innerHeight,r=e/i;n.left=-f*r,n.right=f*r,n.top=f,n.bottom=-f,n.updateProjectionMatrix(),t.setSize(e,i)}),100)}}r.Z.install({THREE:i})},5261:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return f}});var i=t(5393),r={id:"three",ref:"three"};var o,a,d,c,u,s,l,p,h=t(2212),m=t(4817),w=(0,i.aZ)({name:"gallery4",setup:function(){var e=(0,i.iH)(document.createElement("div")),n=(0,m.K)(o,a,d,undefined,undefined,undefined,u,s,l),t=n.initScene,r=n.initCamera,w=n.initRenderer,f=n.initLight,g=n.initHelpers,v=n.initStats,C=n.windowResize,y=n.initControls,E=n.initClock;function S(){o&&d.render(o,a),u&&u.update(),s&&s.update(l.getDelta()),p=requestAnimationFrame(S),c.rotateY(.005)}function k(e){o=t(),a=r(),d=w(e),u=v(e),s=y(),l=E(),f(),g(),function(){var e=new h.SphereGeometry(100,100,100),n=new h.TextureLoader,t=n.load("https://cache-1256738511.cos.ap-chengdu.myqcloud.com/images/Earth.png"),i=n.load("https://cache-1256738511.cos.ap-chengdu.myqcloud.com/images/EarthNormal.png"),r=n.load("https://cache-1256738511.cos.ap-chengdu.myqcloud.com/images/earth_specular.png"),a=new h.MeshPhongMaterial({map:t,normalMap:i,normalScale:new h.Vector2(1.5,1.5),shininess:40,specularMap:r});c=new h.Mesh(e,a),o.add(c)}(),S()}return(0,i.bv)((function(){k(e.value),window.addEventListener("resize",C)})),(0,i.Jd)((function(){cancelAnimationFrame(p),s&&s.dispose(),window.removeEventListener("resize",C)})),{three:e}}});w.render=function(e,n,t,o,a,d){return(0,i.wg)(),(0,i.j4)("div",r,null,512)};var f=w}}]);