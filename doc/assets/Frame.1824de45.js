import{S as a,s}from"./StorageConfig.32373933.js";import{_ as u}from"./index.f55e6c2d.js";import{d,i as p,m,n as t,t as i,f,r as c,o as g}from"./vendor.b0611375.js";const _=d({name:"Frame",beforeRouteUpdate(){a.get(s.login)||this.$router.replace({name:"Login"})},setup(){const e=p().proxy;function o(){a.remove(s.login),e.$router.replace({name:"Login"})}function r(){e.$router.push({name:"Main"})}return{logout:o,handleMain:r}}}),v={class:"header"};function $(e,o,r,k,C,y){const l=c("router-view");return g(),m("div",null,[t("div",v,[t("div",{class:"main",onClick:o[0]||(o[0]=(...n)=>e.handleMain&&e.handleMain(...n))},i(e.$t("menu.main")),1),t("div",{class:"logout",onClick:o[1]||(o[1]=(...n)=>e.logout&&e.logout(...n))},"["+i(e.$t("work.quit"))+"]",1)]),f(l)])}var j=u(_,[["render",$],["__scopeId","data-v-537f1e00"]]);export{j as default};