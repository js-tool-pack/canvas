"use strict";(self.webpackChunk_tool_pack_canvas_monorepo=self.webpackChunk_tool_pack_canvas_monorepo||[]).push([[429],{93280:function(m,t,e){e.r(t);var u=e(18595),l=e(50959),r=e(11527),s=function(){var o=(0,l.useRef)(null);return(0,l.useEffect)(function(){var i=o.current;if(i){var a=new u.Renderer(i),c=new u.Pencil;return a.add(c),a.render(),function(){return a.destroy()}}},[]),(0,r.jsx)("canvas",{style:{border:"1px solid pink"},draggable:"false",height:200,width:200,ref:o})};t.default=s},25317:function(m,t,e){e.r(t);var u=e(48305),l=e.n(u),r=e(50959),s=e(18595),_=e(11527),o=function(){var a=(0,r.useRef)(null),c=(0,r.useRef)(null),f=(0,r.useRef)(new s.Pencil({color:"#00e09e",width:5})),p=(0,r.useState)(!1),v=l()(p,2),E=v[0],R=v[1];return(0,r.useEffect)(function(){var d=a.current;if(d){var n=c.current=new s.Renderer(d);return function(){return n.destroy()}}},[]),(0,_.jsxs)(_.Fragment,{children:[(0,_.jsxs)("div",{children:[(0,_.jsx)("button",{onClick:function(){R(function(h){return!h});var n=c.current;n&&(E?n.remove(f.current):n.add(f.current),n.render())},children:E?"\u79FB\u9664":"\u52A0\u8F7D"}),(0,_.jsx)("button",{onClick:function(){var n;return(n=f.current)===null||n===void 0?void 0:n.clear()},children:"\u6E05\u9664\u7B14\u8FF9"})]}),(0,_.jsx)("canvas",{style:{border:"1px solid pink"},draggable:"false",ref:a,height:200,width:200})]})};t.default=o}}]);
