(window.webpackJsonp=window.webpackJsonp||[]).push([["index"],{"1e4b":function(e,t,a){"use strict";a.r(t),a("b0c0");var n=a("7a23"),c=Object(n.withScopeId)("data-v-7ba30d98");Object(n.pushScopeId)("data-v-7ba30d98");var r={class:"container"},o=Object(n.createVNode)("h1",{class:"title"},"Three.js学习案例演示",-1);Object(n.popScopeId)();var l=c((function(e,t,a,l,i,p){var g=Object(n.resolveComponent)("a-card-meta"),m=Object(n.resolveComponent)("a-card"),u=Object(n.resolveComponent)("a-list-item"),d=Object(n.resolveComponent)("a-list");return Object(n.openBlock)(),Object(n.createBlock)("div",r,[o,Object(n.createVNode)(d,{grid:{gutter:16,xs:1,sm:2,md:2,lg:3,xl:4,xxl:4},"data-source":e.list},{renderItem:c((function(t){var a=t.item,r=t.index;return[Object(n.createVNode)(u,null,{default:c((function(){return[Object(n.createVNode)(m,{hoverable:"",onClick:function(t){return e.handleCardClick(a,r)}},{cover:c((function(){return[Object(n.createVNode)("img",{class:"img",alt:"example",src:a.imageUrl},null,8,["src"])]})),default:c((function(){return[Object(n.createVNode)(g,{title:a.name},null,8,["title"])]})),_:2},1032,["onClick"])]})),_:2},1024)]})),_:1},8,["data-source"])])})),i=a("6c02"),p="https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/",g=Object(n.defineComponent)({name:"Index",setup:function(){var e=Object(i.c)();return{list:Object(n.reactive)([{name:"Vue Options API演示",path:"/gallery1",imageUrl:"".concat(p,"20201009140839.png")},{name:"Vue Composition API演示",path:"/gallery2",imageUrl:"".concat(p,"20201009140839.png")},{name:"纹理动画",path:"/gallery3",imageUrl:"".concat(p,"20201009142604.png")},{name:"地球模型",path:"/gallery4",imageUrl:"".concat(p,"20201009171330.png")},{name:"枪模型",path:"/gallery5",imageUrl:"".concat(p,"20201009172608.png")},{name:"加载FBX并解析骨骼动画",path:"/gallery6",imageUrl:"".concat(p,"20201009181212.png")},{name:"加载obj手镯",path:"/gallery7",imageUrl:"".concat(p,"20201009190049.png")},{name:"心脏模型",path:"/gallery8",imageUrl:"".concat(p,"20201010165347.png")},{name:"地球大气模型",path:"/gallery9",imageUrl:"".concat(p,"20201010183425.png")},{name:"太阳模型",path:"/gallery10",imageUrl:"".concat(p,"20201011123325.png")},{name:"虫洞粒子特效",path:"/gallery11",imageUrl:"".concat(p,"20201011134428.png")},{name:"蜜蜂模型",path:"/gallery12",imageUrl:"".concat(p,"20201116175303.png")}]),handleCardClick:function(t,a){e.push({path:t.path})}}}});a("d9c6"),g.render=l,g.__scopeId="data-v-7ba30d98",t.default=g},6052:function(e,t,a){},b0c0:function(e,t,a){var n=a("83ab"),c=a("9bf2").f,r=Function.prototype,o=r.toString,l=/^\s*function ([^ (]*)/,i="name";n&&!(i in r)&&c(r,i,{configurable:!0,get:function(){try{return o.call(this).match(l)[1]}catch(e){return""}}})},d9c6:function(e,t,a){"use strict";a("6052")}}]);