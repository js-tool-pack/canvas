(self.webpackChunk_tool_pack_canvas_monorepo=self.webpackChunk_tool_pack_canvas_monorepo||[]).push([[595],{17977:function(){},18595:function(Le,_,d){"use strict";d.d(_,{Image:function(){return fe},Magnifier:function(){return me},Pencil:function(){return ce},Rectangle:function(){return D},Renderer:function(){return ae},Text:function(){return ge}});var q=d(25298),$=d.n(q),ee=d(17069),w=d.n(ee),te=d(82092),u=d.n(te),H=function(){function h(){var a=this,e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};$()(this,h),u()(this,"listener",{}),u()(this,"renderer",null),u()(this,"parent",null),u()(this,"children",[]),u()(this,"computedStyle",void 0),this.style=e,this.style=new Proxy(e,{set:function(t,n,i){var s;return t[n]=i,a.handleStyle(),(s=a.renderer)===null||s===void 0||s.render(),!0},get:function(t,n){return t[n]}})}return w()(h,[{key:"addEventListener",value:function(e,r){var t,n=this.listener[e]||[];n.push(r),this.listener[e]=n,(t=this.renderer)===null||t===void 0||t.on(e,this)}},{key:"appendChild",value:function(e){this.children.includes(e)||(this.children.push(e),e.renderer=this.renderer,e.parent=this,this.renderer&&e.onAppended(),this.children.sort(function(r,t){return r.computedStyle.zIndex-t.computedStyle.zIndex}))}},{key:"handleStyle",value:function(){this.computedStyle=Object.assign({position:"static",borderRadius:0,zIndex:0,height:0,width:0},this.style),this.children.forEach(function(e){return e.handleStyle()})}},{key:"removeChild",value:function(e){var r=this.children,t=r.findIndex(function(n){return n===e});t!==-1&&(this.children.splice(t,1),e.onRemoved(),e.renderer=null,e.parent=null)}},{key:"removeEventListener",value:function(e,r){var t,n=this.listener[e]||[],i=n.indexOf(r);n.splice(i,1),(t=this.renderer)===null||t===void 0||t.off(e,this)}},{key:"isHit",value:function(e,r){var t=r.offsetX||0,n=r.offsetY||0;return this.drawPath(e,this.computedStyle),e.isPointInPath(t,n)}},{key:"renderAll",value:function(e){e.save(),this.render(e),e.restore(),this.children.forEach(function(r){e.save(),r.render(e),e.restore()})}},{key:"onAppended",value:function(){this.handleStyle(),this.children.forEach(function(e){return e.onAppended()})}},{key:"onRemoved",value:function(){this.children.forEach(function(e){return e.onRemoved()})}},{key:"append",value:function(e){e.appendChild(this)}},{key:"remove",value:function(){var e;(e=this.parent)===null||e===void 0||e.removeChild(this)}},{key:"update",value:function(){var e;(e=this.renderer)===null||e===void 0||e.render()}}]),h}(),ne=d(48305),X=d.n(ne),re=function(){function h(a,e){$()(this,h),u()(this,"eventGraphicsMap",{}),u()(this,"eventMap",{}),this.canvas=a,this.ctx=e}return w()(h,[{key:"callListenerCallback",value:function(e,r,t){var n;(n=r.listener[e])===null||n===void 0||n.forEach(function(i){i.call(r,t)})}},{key:"simulateMouseEvents",value:function(){var e=this,r=new Set,t=this.ctx,n=this.eventGraphicsMap,i=function(o){(n.mouseleave||[]).forEach(function(l){r.has(l)&&!l.isHit(t,o)&&(e.callListenerCallback("mouseleave",l,o),r.delete(l))})};this.eventMap.mousemove=function(s){(n.mouseenter||[]).forEach(function(o){!r.has(o)&&o.isHit(t,s)&&(e.callListenerCallback("mouseenter",o,s),r.add(o))}),(n.mousemove||[]).forEach(function(o){r.has(o)&&o.isHit(t,s)&&e.callListenerCallback("mousemove",o,s)}),i(s)},this.canvas.addEventListener("mousemove",this.eventMap.mousemove),this.eventMap.mouseleave=i,this.canvas.addEventListener("mouseleave",this.eventMap.mouseleave)}},{key:"addEventListener",value:function(e,r){var t=this,n=this.ctx,i=this.eventGraphicsMap,s=this.eventMap,o=i[e]||[];if(!o.includes(r)&&(o.push(r),i[e]=o,!(s[e]||["mouseenter","mousemove","mouseleave"].includes(e)))){var l=function(c){o.forEach(function(f){f.isHit(n,c)&&t.callListenerCallback(e,f,c)})};s[e]=l,this.canvas.addEventListener(e,l)}}},{key:"removeEventListener",value:function(e,r){var t=this.eventGraphicsMap,n=this.eventMap,i=n[e];if(i){var s=t[e]||[],o=s.indexOf(r);o!==-1&&(s.splice(o,1),s.length===0&&(this.canvas.removeEventListener(e,n[e]),delete n[e]))}}},{key:"clearListenerOfGraphics",value:function(e){var r=this;for(var t in e.listener)this.removeEventListener(t,e);e.children.forEach(function(n){r.clearListenerOfGraphics(n)})}},{key:"clearAll",value:function(){var e=this.eventMap;for(var r in e)this.canvas.removeEventListener(r,e[r])}}]),h}(),ie=function(){function h(a){$()(this,h),u()(this,"graphicsList",[]),this.listenerManager=a}return w()(h,[{key:"add",value:function(e,r){var t=this;e.renderer=r,this.graphicsList.push(e),this.graphicsList.sort(function(i,s){var o,l;return(((o=i.style)===null||o===void 0?void 0:o.zIndex)||0)-(((l=s.style)===null||l===void 0?void 0:l.zIndex)||0)}),e.onAppended();var n=function i(s){for(var o in s.listener)t.listenerManager.addEventListener(o,s);s.children.forEach(i)};n(e)}},{key:"remove",value:function(e){var r=this.graphicsList,t=r.findIndex(function(n){return n===e});t!==-1&&(this.graphicsList.splice(t,1),e.renderer=null,this.listenerManager.clearListenerOfGraphics(e))}},{key:"render",value:function(e){this.graphicsList.forEach(function(r){return r.renderAll(e)})}},{key:"clear",value:function(){this.graphicsList.length=0}}]),h}(),ae=function(){function h(a){$()(this,h),u()(this,"listenerManager",void 0),u()(this,"graphicsManager",void 0),u()(this,"ctx",void 0),u()(this,"canvas",void 0),u()(this,"offScreenCTX",void 0),u()(this,"offScreenCanvas",void 0),u()(this,"height",void 0),u()(this,"width",void 0);var e=typeof a=="string"?document.querySelector(a):a;if(!e)throw new Error("canvas can not be empty!");this.width=e.width,this.height=e.height,this.canvas=e,this.ctx=e.getContext("2d");var r=this.cloneCanvas(),t=X()(r,2);this.offScreenCanvas=t[0],this.offScreenCTX=t[1],this.listenerManager=new re(this.canvas,this.offScreenCTX),this.listenerManager.simulateMouseEvents(),this.graphicsManager=new ie(this.listenerManager)}return w()(h,[{key:"render",value:function(){var e=this.offScreenCTX,r=this.ctx;r.clearRect(0,0,this.width,this.height),e.clearRect(0,0,this.width,this.height),this.graphicsManager.render(e),r.drawImage(this.offScreenCanvas,0,0)}},{key:"cloneCanvas",value:function(){var e=document.createElement("canvas");e.width=this.canvas.width,e.height=this.canvas.height;var r=e.getContext("2d");return[e,r]}},{key:"canvasOn",value:function(e,r){this.canvas.addEventListener(e,r)}},{key:"off",value:function(e,r){this.listenerManager.removeEventListener(e,r)}},{key:"canvasOff",value:function(e,r){this.canvas.removeEventListener(e,r)}},{key:"on",value:function(e,r){this.listenerManager.addEventListener(e,r)}},{key:"destroy",value:function(){this.listenerManager.clearAll(),this.graphicsManager.clear()}},{key:"add",value:function(e){this.graphicsManager.add(e,this)}},{key:"remove",value:function(e){this.graphicsManager.remove(e)}}]),h}(),Pe=d(17977),se=d(26068),N=d.n(se),oe=d(21742),A=d.n(oe),le=d(83136),T=d.n(le),D=function(h){A()(e,h);var a=T()(e);function e(){return $()(this,e),a.apply(this,arguments)}return w()(e,[{key:"drawPath",value:function(t,n){var i=n.borderRadius,s=i===void 0?0:i,o=n.left,l=o===void 0?0:o,m=n.top,c=m===void 0?0:m,f=n.height,v=n.width;t.beginPath(),v<2*s&&(s=v/2),f<2*s&&(s=f/2),t.beginPath(),t.roundRect(l,c,v,f,s),t.closePath()}},{key:"drawPathWithoutBorder",value:function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:this.computedStyle,i=n.borderWidth||0;this.drawPath(t,N()(N()({},n),{},{left:(n.left||0)+i/2,top:(n.top||0)+i/2,height:n.height-i,width:n.width-i}))}},{key:"renderBorder",value:function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:this.computedStyle;n.borderWidth&&(this.drawPathWithoutBorder(t,n),t.lineWidth=n.borderWidth||0,t.strokeStyle=n.borderColor||"black",t.stroke())}},{key:"renderBackground",value:function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:this.computedStyle;n.backgroundColor&&(t.fillStyle=n.backgroundColor,this.drawPathWithoutBorder(t,n),t.fill())}},{key:"render",value:function(t){this.renderBackground(t),this.renderBorder(t)}}]),e}(H),he=d(62657),E=d.n(he),de=d(9504),J=d.n(de),ue=d(38836),K=d.n(ue),ve=function(h){A()(e,h);var a=T()(e);function e(){var r;$()(this,e);for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return r=a.call.apply(a,[this].concat(n)),u()(E()(r),"points",[]),r}return w()(e,[{key:"drawPath",value:function(t,n){var i=this.points;if(i.length){t.beginPath();var s=i[0];t.moveTo(s[0],s[1]),i.forEach(function(o){t.lineTo(o[0],o[1])})}}},{key:"render",value:function(t){var n=this.computedStyle;this.drawPath(t,n),t.strokeStyle=n.color||"black",t.lineWidth=n.width,t.stroke()}},{key:"write",value:function(t){this.points.push(t)}}]),e}(H),ce=function(h){A()(e,h);var a=T()(e);function e(){var r;$()(this,e);for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return r=a.call.apply(a,[this].concat(n)),u()(E()(r),"addCanvasListener",function(s){var o=E()(r),l=o.renderer;if(l){var m=r.computedStyle,c=new ve({height:m.height,color:m.color,width:m.width});r.appendChild(c);var f=function(g){c.write([g.offsetX,g.offsetY]),l.render()},v=function p(){l.canvasOff("mousemove",f),l.canvasOff("mouseup",p),l.canvasOff("mouseout",p)};l.canvasOn("mousemove",f),l.canvasOn("mouseup",v),l.canvasOn("mouseout",v)}}),r}return w()(e,[{key:"clear",value:function(){var t;this.children.forEach(function(n){return n.onRemoved()}),this.children.length=0,(t=this.renderer)===null||t===void 0||t.render()}},{key:"onAppended",value:function(){var t;(t=this.renderer)===null||t===void 0||t.canvasOn("mousedown",this.addCanvasListener),J()(K()(e.prototype),"onAppended",this).call(this)}},{key:"onRemoved",value:function(){var t;(t=this.renderer)===null||t===void 0||t.canvasOff("mousedown",this.addCanvasListener),J()(K()(e.prototype),"onRemoved",this).call(this)}},{key:"drawPath",value:function(t,n){}},{key:"render",value:function(t){}}]),e}(H),fe=function(h){A()(e,h);var a=T()(e);function e(r,t){var n;return $()(this,e),n=a.call(this,t),u()(E()(n),"img",void 0),u()(E()(n),"_src",void 0),u()(E()(n),"crossOrigin",null),r&&(n._src=r),n.createImgElement(),n}return w()(e,[{key:"drawImg",value:function(t){var n=t.createPattern(this.img,"no-repeat"),i=this.computedStyle,s=i.left,o=s===void 0?0:s,l=i.top,m=l===void 0?0:l,c=i.height,f=i.width,v=this.img,p=v.naturalHeight,g=v.naturalWidth;if(this.drawPathWithoutBorder(t),n){var C=new DOMMatrix().translate(o,m).scale(f/g,c/p);n.setTransform(C),t.fillStyle=n,t.fill()}}},{key:"createImgElement",value:function(){var t=this,n=this.img=document.createElement("img");n.crossOrigin=this.crossOrigin,n.onload=function(){var i,s;(i=t.computedStyle).width||(i.width=n.width),(s=t.computedStyle).height||(s.height=n.height),t.update()},n.onerror=n.oncancel=function(){console.error("'".concat(t._src,"' load fail"))},n.src=this._src}},{key:"render",value:function(t){this.renderBackground(t),this.drawImg(t),this.renderBorder(t)}},{key:"src",get:function(){return this._src},set:function(t){this._src=t,this.img.src=t}}]),e}(D),me=function(h){A()(e,h);var a=T()(e);function e(){var r,t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:2,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return $()(this,e),n.zIndex||(n.zIndex=100),n.width||(n.width=100),r=a.call(this,n),r.scale=t,r}return w()(e,[{key:"drawMagnifier",value:function(t){var n,i=(n=this.renderer)===null||n===void 0?void 0:n.offScreenCanvas;if(i){var s=this.computedStyle,o=s.borderColor,l=o===void 0?"white":o,m=s.borderWidth,c=m===void 0?5:m,f=s.left,v=f===void 0?0:f,p=s.top,g=p===void 0?0:p,C=s.width,b=this.scale,x=(C-c)/2;t.beginPath(),t.arc(v,g,x,0,2*Math.PI),t.lineWidth=c,t.strokeStyle=l,t.stroke(),t.clip();var k=2*x,R=k*b,j=v-x,Y=g-x,B=(R-k-c/2)/2;t.drawImage(i,j,Y,k,k,j-B,Y-B,R,R)}}},{key:"render",value:function(t){this.drawMagnifier(t)}},{key:"drawPath",value:function(t,n){}}]),e}(H),pe=d(70445),ge=function(h){A()(e,h);var a=T()(e);function e(){var r;$()(this,e);for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return r=a.call.apply(a,[this].concat(n)),u()(E()(r),"splitContent",[]),u()(E()(r),"content",""),r}return w()(e,[{key:"measureText",value:function(){var t,n,i,s=this.renderer;if(!s)return;var o=s.offScreenCTX,l=this.computedStyle,m=l.borderWidth,c=m===void 0?0:m,f=l.fontSize,v=f===void 0?12:f,p=l.lineHeight,g=p===void 0?v:p,C=l.top,b=C===void 0?0:C,x=c*2;this.setCtxAttrs(o);var k=(g-v)/2,R=o.measureText(this.content).width,j=(0,pe.zFY)(this.content),Y=~~(R/j),B=(((t=this.parent)===null||t===void 0?void 0:t.computedStyle.width)||((n=this.renderer)===null||n===void 0?void 0:n.width)||0)-x,ye=~~(B/Y),Se=we(this.content),Q=X()(Se,2),U=Q[0],$e=Q[1];this.splitContent=U,this.computedStyle.width=$e+c,this.computedStyle.height=(((i=U.at(-1))===null||i===void 0?void 0:i.y)||0)+v+k+c-b;function we(W){var M=null,y=0;return[W.split(`
`).map(function(S){var L,O=I(ke(S),M&&M.length?(((L=M.at(-1))===null||L===void 0?void 0:L.y)||0)+v+k:b+k+c),P=X()(O,2),z=P[0],F=P[1];return y=Math.max(F,y),M=z}).flat(),y];function I(S,L){for(var O=[],P=L,z=0,F=S.length,G=0;G<F;){var Me=Ce(S,G,Math.min(G+ye,F)),V=X()(Me,2),Z=V[0],Ee=V[1];O.push({content:S.slice(G,Z).join(""),y:P}),P+=v+k,z=Math.max(z,Ee),G=Z}return[O,z]}}function Ce(W,M,y){for(var I=!1,S=0;M<y&&y<=W.length;){var L=W.slice(M,y).join(""),O=S,P=o.measureText(L);if(S=P.width,S<=B){if(I)break;y++,I=!0}else{if(y--,I){S=O;break}I=!1}}return[y,S]}function ke(W){var M=new Intl.Segmenter("fr",{granularity:"grapheme"});return Array.from(M.segment(W)).map(function(y){return y.segment})}}},{key:"setCtxAttrs",value:function(t){var n=this.computedStyle,i=n.letterSpacing,s=i===void 0?t.letterSpacing:i,o=n.textAlign,l=o===void 0?t.textAlign:o,m=n.fontFamily,c=m===void 0?"system-ui":m,f=n.fontWeight,v=f===void 0?"normal":f,p=n.textBaseline,g=p===void 0?"top":p,C=n.fontSize,b=C===void 0?12:C;t.font="".concat(v," ").concat(b,"px ").concat(c),t.letterSpacing=s,t.textAlign=l,t.textBaseline=g}},{key:"renderText",value:function(t){var n=this.computedStyle,i=n.color,s=i===void 0?"black":i,o=n.borderWidth,l=o===void 0?0:o,m=n.left,c=m===void 0?0:m;this.setCtxAttrs(t),t.fillStyle=s;var f=c+l;this.splitContent.forEach(function(v){var p=v.content,g=v.y;return t.fillText(p,f,g)})}},{key:"render",value:function(t){var n=Object.assign({},this.computedStyle),i=n.left,s=i===void 0?0:i,o=n.width;n.textAlign==="center"?n.left=s-o/2:n.textAlign==="right"&&(n.left=s-o),this.renderBackground(t,n),this.renderText(t),this.renderBorder(t,n)}},{key:"handleStyle",value:function(){J()(K()(e.prototype),"handleStyle",this).call(this),this.measureText()}}]),e}(D)}}]);
