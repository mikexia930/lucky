var q=Object.defineProperty;var j=Object.getOwnPropertySymbols;var A=Object.prototype.hasOwnProperty,R=Object.prototype.propertyIsEnumerable;var C=(e,s,t)=>s in e?q(e,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[s]=t,x=(e,s)=>{for(var t in s||(s={}))A.call(s,t)&&C(e,t,s[t]);if(j)for(var t of j(s))R.call(s,t)&&C(e,t,s[t]);return e};/* empty css              */import{S as k,s as h}from"./StorageConfig.32373933.js";import{d as E,i as D,u as N,j as L,k as b,l as F,o as g,m as f,n as r,f as v,t as c,w as M,p as P,q as O,s as U,B as T,F as G,v as J,r as K,M as Q}from"./vendor.b0611375.js";import{l as w}from"./lodash.0b804683.js";/* empty css              */import{_ as V}from"./index.f55e6c2d.js";function W(e){return Math.floor(Math.random()*e)}const X=E({name:"Lucky",props:{prizeData:Object,itemIndex:Number},setup(e,s){const t=D().proxy,{t:y}=N(),a=L(x({},e.prizeData));let u=b([]),d=b([]),i=b([]);const n=L({showBingo:!1,bingoMan:"",loading:!1,percent:0,seconds:5});F(()=>{n.showBingo=!1,n.bingoMan="";const _=k.get(h.bingo);_&&(i.value=_),u.value=k.get(h.employee);const $=k.get(h.prize);w.exports.forEach($,m=>{m.name&&m.employees&&d.value.push(m)})});function o(){a.number<=0?t.$message.error(y("notice.numberEmpty").toString()):(n.loading=!0,n.showBingo=!1,n.bingoMan="",l(),S())}function l(){const _=a.employees||[];let $=!0;if(!w.exports.isEmpty(_)&&_.length>0){const m=[];w.exports.forEach(_,B=>{i.value.includes(B)||m.push(B)});let z="";const I=m.length;I>0&&($=!1,a.number-=1,I===1?z=m[0]:z=m[W(I)],n.bingoMan=z,i.value.push(z),k.set(h.bingo,i.value),H("update"))}$&&(n.bingoMan=y("lucky.noBingo").toString())}let p=null;function S(){p=setInterval(()=>{n.seconds<=0?(clearTimeout(p),p=null,n.showBingo=!0,n.loading=!1,n.percent=0,n.seconds=5):(n.seconds-=1,n.percent=(5-n.seconds)/5*100)},1e3)}function H(_){s.emit("handleLucky",{type:_,index:e.itemIndex,data:a})}return{employees:u,prizes:d,handleLucky:o,luckyStatus:n}}}),Y={class:"lucky"},Z={class:"img"},ee={class:"split"},ne={key:0,class:"bingo"},se={key:1,class:"progress"},te={style:{color:"red"}},oe={key:2,class:"wait"},ae={class:"btn"};function ie(e,s,t,y,a,u){const d=O,i=U,n=T;return g(),f("div",Y,[r("div",Z,[v(d,{width:200,src:e.prizeData&&e.prizeData.img},null,8,["src"])]),r("div",ee,[e.luckyStatus.showBingo?(g(),f("div",ne,c(e.luckyStatus.bingoMan),1)):e.luckyStatus.loading?(g(),f("div",se,[v(i,{type:"circle",percent:e.luckyStatus.percent},{format:M(o=>[r("span",te,c(e.luckyStatus.seconds),1)]),_:1},8,["percent"])])):(g(),f("div",oe,c(e.$t("lucky.waitOpen")),1))]),r("div",ae,[v(n,{danger:"",type:"primary",disabled:e.luckyStatus.loading,onClick:e.handleLucky},{default:M(()=>[P(c(e.$t("lucky.lucky")),1)]),_:1},8,["disabled","onClick"])])])}var le=V(X,[["render",ie],["__scopeId","data-v-0a59d2dc"]]);const re=E({name:"Index",components:{Lucky:le},setup(){const e="\u62BD\u5956",s=D().proxy,{t}=N();let y=b([]),a=b([]);const u=L({visible:!1,data:{img:"",name:"",number:0,employees:[]}});F(()=>{y.value=k.get(h.employee);const n=k.get(h.prize);w.exports.forEach(n,o=>{o.name&&o.employees&&a.value.push(o)})});function d(n){const o=a.value[n];o.number<=0?s.$message.warn(t("notice.numberEmpty").toString()):(u.visible=!0,u.data=o)}function i(n){const{type:o,data:l,index:p}=n;switch(o){case"update":a.value.splice(p,1,l);break}}return{subject:e,employees:y,prizes:a,goLucky:d,prizeModal:u,handleLucky:i}}}),ce={class:"index"},ue={class:"title"},de={class:"prize"},pe={class:"name"},_e={class:"number"};function me(e,s,t,y,a,u){const d=O,i=T,n=K("lucky"),o=Q;return g(),f("div",ce,[r("div",ue,c(e.subject),1),r("div",de,[(g(!0),f(G,null,J(e.prizes,(l,p)=>(g(),f("div",{class:"item",key:p},[v(d,{width:300,src:l.img},null,8,["src"]),r("span",pe,c(l.name),1),r("span",_e,c(e.$t("lucky.number"))+"\uFF1A"+c(l.number),1),r("span",null,[v(i,{type:"primary",danger:"",onClick:S=>e.goLucky(p)},{default:M(()=>[P(c(e.$t("lucky.lucky")),1)]),_:2},1032,["onClick"])])]))),128))]),v(o,{width:"800px",visible:e.prizeModal.visible,"onUpdate:visible":s[0]||(s[0]=l=>e.prizeModal.visible=l),title:e.$t("lucky.lucky"),footer:null},{default:M(()=>[v(n,{"prize-data":e.prizeModal.data,onHandleLucky:e.handleLucky},null,8,["prize-data","onHandleLucky"])]),_:1},8,["visible","title"])])}var $e=V(re,[["render",me],["__scopeId","data-v-1edde49a"]]);export{$e as default};
