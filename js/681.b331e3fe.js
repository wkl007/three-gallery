(self.webpackChunkthree_gallery=self.webpackChunkthree_gallery||[]).push([[681],{4817:function(e,t,i){"use strict";i.d(t,{K:function(){return l}});var r=i(2212),s=i(105),n=i(3466),o=i.n(n),a=i(3555);function l(e,t,i,n,l,h,c,u,d){var p=window.innerWidth,f=window.innerHeight,m=window.devicePixelRatio,v=200;return{initScene:function(){return e=new r.Scene},initCamera:function(){var i=p/f;return(t=new r.OrthographicCamera(-v*i,v*i,v,-v,1,1e3)).position.set(200,200,200),t.lookAt(e.position),t},initRenderer:function(e){return(i=new r.WebGLRenderer).setPixelRatio(m),i.setSize(p,f),i.setClearColor(12178431),e.appendChild(i.domElement),i},initLight:function(){(n=new r.DirectionalLight(16777215)).position.set(400,200,300),e.add(n),l=new r.AmbientLight(4473924),e.add(l)},initControls:function(){return(u=new s.Z(t,i.domElement)).draggingDampingFactor=1,u},initClock:function(){return new r.Clock},initHelpers:function(){h=new r.AxesHelper(250),e.add(h)},initStats:function(e){return(c=new(o())).showPanel(0),c.dom.style.position="absolute",c.dom.style.left="0px",c.dom.style.top="0px",e&&e.appendChild(c.dom),c},windowResize:(0,a.vA)((function(){var e=window.innerWidth,r=window.innerHeight,s=e/r;t.left=-v*s,t.right=v*s,t.top=v,t.bottom=-v,t.updateProjectionMatrix(),i.setSize(e,r)}),100)}}s.Z.install({THREE:r})},8840:function(e,t,i){"use strict";i.d(t,{L:function(){return s}});var r=i(2212),s=function(){var e=/^[og]\s*(.+)?/,t=/^mtllib /,i=/^usemtl /,s=/^usemap /,n=new r.Vector3,o=new r.Vector3,a=new r.Vector3,l=new r.Vector3,h=new r.Vector3;function c(){var e={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(e,t){if(this.object&&!1===this.object.fromDeclaration)return this.object.name=e,void(this.object.fromDeclaration=!1!==t);var i=this.object&&"function"==typeof this.object.currentMaterial?this.object.currentMaterial():void 0;if(this.object&&"function"==typeof this.object._finalize&&this.object._finalize(!0),this.object={name:e||"",fromDeclaration:!1!==t,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(e,t){var i=this._finalize(!1);i&&(i.inherited||i.groupCount<=0)&&this.materials.splice(i.index,1);var r={index:this.materials.length,name:e||"",mtllib:Array.isArray(t)&&t.length>0?t[t.length-1]:"",smooth:void 0!==i?i.smooth:this.smooth,groupStart:void 0!==i?i.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(e){var t={index:"number"==typeof e?e:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return t.clone=this.clone.bind(t),t}};return this.materials.push(r),r},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(e){var t=this.currentMaterial();if(t&&-1===t.groupEnd&&(t.groupEnd=this.geometry.vertices.length/3,t.groupCount=t.groupEnd-t.groupStart,t.inherited=!1),e&&this.materials.length>1)for(var i=this.materials.length-1;i>=0;i--)this.materials[i].groupCount<=0&&this.materials.splice(i,1);return e&&0===this.materials.length&&this.materials.push({name:"",smooth:this.smooth}),t}},i&&i.name&&"function"==typeof i.clone){var r=i.clone(0);r.inherited=!0,this.object.materials.push(r)}this.objects.push(this.object)},finalize:function(){this.object&&"function"==typeof this.object._finalize&&this.object._finalize(!0)},parseVertexIndex:function(e,t){var i=parseInt(e,10);return 3*(i>=0?i-1:i+t/3)},parseNormalIndex:function(e,t){var i=parseInt(e,10);return 3*(i>=0?i-1:i+t/3)},parseUVIndex:function(e,t){var i=parseInt(e,10);return 2*(i>=0?i-1:i+t/2)},addVertex:function(e,t,i){var r=this.vertices,s=this.object.geometry.vertices;s.push(r[e+0],r[e+1],r[e+2]),s.push(r[t+0],r[t+1],r[t+2]),s.push(r[i+0],r[i+1],r[i+2])},addVertexPoint:function(e){var t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addVertexLine:function(e){var t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addNormal:function(e,t,i){var r=this.normals,s=this.object.geometry.normals;s.push(r[e+0],r[e+1],r[e+2]),s.push(r[t+0],r[t+1],r[t+2]),s.push(r[i+0],r[i+1],r[i+2])},addFaceNormal:function(e,t,i){var r=this.vertices,s=this.object.geometry.normals;n.fromArray(r,e),o.fromArray(r,t),a.fromArray(r,i),h.subVectors(a,o),l.subVectors(n,o),h.cross(l),h.normalize(),s.push(h.x,h.y,h.z),s.push(h.x,h.y,h.z),s.push(h.x,h.y,h.z)},addColor:function(e,t,i){var r=this.colors,s=this.object.geometry.colors;void 0!==r[e]&&s.push(r[e+0],r[e+1],r[e+2]),void 0!==r[t]&&s.push(r[t+0],r[t+1],r[t+2]),void 0!==r[i]&&s.push(r[i+0],r[i+1],r[i+2])},addUV:function(e,t,i){var r=this.uvs,s=this.object.geometry.uvs;s.push(r[e+0],r[e+1]),s.push(r[t+0],r[t+1]),s.push(r[i+0],r[i+1])},addDefaultUV:function(){var e=this.object.geometry.uvs;e.push(0,0),e.push(0,0),e.push(0,0)},addUVLine:function(e){var t=this.uvs;this.object.geometry.uvs.push(t[e+0],t[e+1])},addFace:function(e,t,i,r,s,n,o,a,l){var h=this.vertices.length,c=this.parseVertexIndex(e,h),u=this.parseVertexIndex(t,h),d=this.parseVertexIndex(i,h);if(this.addVertex(c,u,d),this.addColor(c,u,d),void 0!==o&&""!==o){var p=this.normals.length;c=this.parseNormalIndex(o,p),u=this.parseNormalIndex(a,p),d=this.parseNormalIndex(l,p),this.addNormal(c,u,d)}else this.addFaceNormal(c,u,d);if(void 0!==r&&""!==r){var f=this.uvs.length;c=this.parseUVIndex(r,f),u=this.parseUVIndex(s,f),d=this.parseUVIndex(n,f),this.addUV(c,u,d),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(e){this.object.geometry.type="Points";for(var t=this.vertices.length,i=0,r=e.length;i<r;i++){var s=this.parseVertexIndex(e[i],t);this.addVertexPoint(s),this.addColor(s)}},addLineGeometry:function(e,t){this.object.geometry.type="Line";for(var i=this.vertices.length,r=this.uvs.length,s=0,n=e.length;s<n;s++)this.addVertexLine(this.parseVertexIndex(e[s],i));var o=0;for(n=t.length;o<n;o++)this.addUVLine(this.parseUVIndex(t[o],r))}};return e.startObject("",!1),e}function u(e){r.Loader.call(this,e),this.materials=null}return u.prototype=Object.assign(Object.create(r.Loader.prototype),{constructor:u,load:function(e,t,i,s){var n=this,o=new r.FileLoader(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,(function(i){try{t(n.parse(i))}catch(t){s&&s(t),n.manager.itemError(e)}}),i,s)},setMaterials:function(e){return this.materials=e,this},parse:function(n){var o=new c;-1!==n.indexOf("\r\n")&&(n=n.replace(/\r\n/g,"\n")),-1!==n.indexOf("\\\n")&&(n=n.replace(/\\\n/g,""));for(var a=n.split("\n"),l="",h="",u=[],d="function"==typeof"".trimLeft,p=0,f=a.length;p<f;p++)if(l=a[p],0!==(l=d?l.trimLeft():l.trim()).length&&"#"!==(h=l.charAt(0)))if("v"===h){var m=l.split(/\s+/);switch(m[0]){case"v":o.vertices.push(parseFloat(m[1]),parseFloat(m[2]),parseFloat(m[3])),m.length>=7?o.colors.push(parseFloat(m[4]),parseFloat(m[5]),parseFloat(m[6])):o.colors.push(void 0,void 0,void 0);break;case"vn":o.normals.push(parseFloat(m[1]),parseFloat(m[2]),parseFloat(m[3]));break;case"vt":o.uvs.push(parseFloat(m[1]),parseFloat(m[2]))}}else if("f"===h){for(var v=l.substr(1).trim().split(/\s+/),g=[],b=0,w=v.length;b<w;b++){var y=v[b];if(y.length>0){var j=y.split("/");g.push(j)}}var x=g[0];for(b=1,w=g.length-1;b<w;b++){var V=g[b],L=g[b+1];o.addFace(x[0],V[0],L[0],x[1],V[1],L[1],x[2],V[2],L[2])}}else if("l"===h){var A=l.substring(1).trim().split(" "),C=[],F=[];if(-1===l.indexOf("/"))C=A;else for(var M=0,z=A.length;M<z;M++){var I=A[M].split("/");""!==I[0]&&C.push(I[0]),""!==I[1]&&F.push(I[1])}o.addLineGeometry(C,F)}else if("p"===h){var P=l.substr(1).trim().split(" ");o.addPointGeometry(P)}else if(null!==(u=e.exec(l))){var U=(" "+u[0].substr(1).trim()).substr(1);o.startObject(U)}else if(i.test(l))o.object.startMaterial(l.substring(7).trim(),o.materialLibraries);else if(t.test(l))o.materialLibraries.push(l.substring(7).trim());else if(s.test(l));else if("s"===h){if((u=l.split(" ")).length>1){var S=u[1].trim().toLowerCase();o.object.smooth="0"!==S&&"off"!==S}else o.object.smooth=!0;(Z=o.object.currentMaterial())&&(Z.smooth=o.object.smooth)}else if("\0"===l)continue;o.finalize();var B=new r.Group;if(B.materialLibraries=[].concat(o.materialLibraries),!0===!(1===o.objects.length&&0===o.objects[0].geometry.vertices.length))for(p=0,f=o.objects.length;p<f;p++){var E=o.objects[p],_=E.geometry,k=E.materials,G="Line"===_.type,O="Points"===_.type,N=!1;if(0!==_.vertices.length){(Q=new r.BufferGeometry).setAttribute("position",new r.Float32BufferAttribute(_.vertices,3)),_.normals.length>0&&Q.setAttribute("normal",new r.Float32BufferAttribute(_.normals,3)),_.colors.length>0&&(N=!0,Q.setAttribute("color",new r.Float32BufferAttribute(_.colors,3))),!0===_.hasUVIndices&&Q.setAttribute("uv",new r.Float32BufferAttribute(_.uvs,2));for(var D,H=[],R=0,W=k.length;R<W;R++){var q=(J=k[R]).name+"_"+J.smooth+"_"+N,Z=o.materials[q];if(null!==this.materials)if(Z=this.materials.create(J.name),!G||!Z||Z instanceof r.LineBasicMaterial){if(O&&Z&&!(Z instanceof r.PointsMaterial)){var K=new r.PointsMaterial({size:10,sizeAttenuation:!1});r.Material.prototype.copy.call(K,Z),K.color.copy(Z.color),K.map=Z.map,Z=K}}else{var T=new r.LineBasicMaterial;r.Material.prototype.copy.call(T,Z),T.color.copy(Z.color),Z=T}void 0===Z&&((Z=G?new r.LineBasicMaterial:O?new r.PointsMaterial({size:1,sizeAttenuation:!1}):new r.MeshPhongMaterial).name=J.name,Z.flatShading=!J.smooth,Z.vertexColors=N,o.materials[q]=Z),H.push(Z)}if(H.length>1){for(R=0,W=k.length;R<W;R++){var J=k[R];Q.addGroup(J.groupStart,J.groupCount,R)}D=G?new r.LineSegments(Q,H):O?new r.Points(Q,H):new r.Mesh(Q,H)}else D=G?new r.LineSegments(Q,H[0]):O?new r.Points(Q,H[0]):new r.Mesh(Q,H[0]);D.name=E.name,B.add(D)}}else if(o.vertices.length>0){var Q;Z=new r.PointsMaterial({size:1,sizeAttenuation:!1});(Q=new r.BufferGeometry).setAttribute("position",new r.Float32BufferAttribute(o.vertices,3)),o.colors.length>0&&void 0!==o.colors[0]&&(Q.setAttribute("color",new r.Float32BufferAttribute(o.colors,3)),Z.vertexColors=!0);var X=new r.Points(Q,Z);B.add(X)}return B}}),u}()}}]);