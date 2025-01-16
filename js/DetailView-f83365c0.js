import{ref as c,onMounted as V,resolveComponent as s,openBlock as o,createElementBlock as _,createVNode as l,createElementVNode as x,createBlock as N,Fragment as P,withCtx as v,unref as t}from"vue";import{a as R,u as E}from"./index-cbb8e2e1.js";import{_ as M,f as $,a as g,b as d,c as u,d as n,e as j,g as y,j as F}from"./_plugin-vue_export-helper-24d3f7a4.js";const I={class:"detail"},L={class:"page-content"},T={key:0,class:"loading-wrapper"},q={__name:"DetailView",setup(z){const b=R(),k=E(),r=c(!0),f=c(""),e=c(null);async function D(){try{r.value=!0,f.value="",e.value=await F(b.params.id)}catch(p){f.value="数据加载失败，请稍后重试",console.error("获取详情数据失败:",p)}finally{r.value=!1}}function w(){k.back()}return V(()=>{D()}),(p,m)=>{const C=s("van-nav-bar"),h=s("van-loading"),B=s("van-empty"),a=s("van-cell"),i=s("van-cell-group");return o(),_("div",I,[l(C,{title:"数据详情","left-text":"返回","left-arrow":"",onClickLeft:w}),x("div",L,[r.value?(o(),_("div",T,[l(h,{type:"spinner",color:"#1989fa"}),m[0]||(m[0]=x("p",null,"加载中...",-1))])):f.value?(o(),N(B,{key:1,image:"error",description:f.value},null,8,["description"])):(o(),_(P,{key:2},[l(i,{inset:"",title:"基本信息"},{default:v(()=>[l(a,{title:"开播日期",value:t($)(e.value.fields.开播日期)},null,8,["value"]),l(a,{title:"是否为大促",value:t(g)(e.value.fields.是否为大促)},null,8,["value"]),l(a,{title:"是否为节假日",value:t(g)(e.value.fields.是否为节假日)},null,8,["value"]),l(a,{title:"自觉流量如何",value:e.value.fields.自觉流量如何||"-"},null,8,["value"])]),_:1}),l(i,{inset:"",title:"流量数据"},{default:v(()=>[l(a,{title:"千次",value:t(d)(e.value.fields.千次)},null,8,["value"]),l(a,{title:"直播推荐千次",value:t(d)(e.value.fields.直播推荐千次)},null,8,["value"]),l(a,{title:"千川PC千次",value:t(d)(e.value.fields.千川PC千次)},null,8,["value"]),l(a,{title:"随心推千次",value:t(d)(e.value.fields.随心推千次)},null,8,["value"])]),_:1}),l(i,{inset:"",title:"直播间数据"},{default:v(()=>[l(a,{title:"直播间曝光次数",value:t(u)(e.value.fields["直播间曝光次数（万）"]),suffix:"万"},null,8,["value"]),l(a,{title:"在线峰值人数",value:t(u)(e.value.fields.在线峰值人数),suffix:"人"},null,8,["value"]),l(a,{title:"进入率",value:t(n)(e.value.fields.进入率)},null,8,["value"]),l(a,{title:"互动率",value:t(n)(e.value.fields.互动率)},null,8,["value"]),l(a,{title:"加粉率",value:t(n)(e.value.fields.加粉率)},null,8,["value"])]),_:1}),l(i,{inset:"",title:"时间数据"},{default:v(()=>[l(a,{title:"开播时间",value:t(j)(e.value.fields.开播时间)},null,8,["value"]),l(a,{title:"开播时长",value:`${e.value.fields.开播时长}小时`},null,8,["value"]),l(a,{title:"周几",value:e.value.fields.周几},null,8,["value"])]),_:1}),l(i,{inset:"",title:"观众数据"},{default:v(()=>[l(a,{title:"直播间观看人数",value:t(u)(e.value.fields.直播间观看人数),suffix:"人"},null,8,["value"]),l(a,{title:"直播间观看人次",value:t(u)(e.value.fields.直播间观看人次),suffix:"次"},null,8,["value"]),l(a,{title:"最高在线人数",value:t(u)(e.value.fields.最高在线人数),suffix:"人"},null,8,["value"]),l(a,{title:"平均在线人数",value:t(u)(e.value.fields.平均在线人数),suffix:"人"},null,8,["value"]),l(a,{title:"人均观看时长",value:`${e.value.fields.人均观看时长}分钟`},null,8,["value"])]),_:1}),l(i,{inset:"",title:"互动数据"},{default:v(()=>[l(a,{title:"评论次数",value:t(u)(e.value.fields.评论次数),suffix:"次"},null,8,["value"]),l(a,{title:"新增粉丝数",value:t(u)(e.value.fields.新增粉丝数),suffix:"人"},null,8,["value"]),l(a,{title:"上一场新增粉丝数",value:t(u)(e.value.fields.上一场新增粉丝数),suffix:"人"},null,8,["value"]),l(a,{title:"看播粉丝占比",value:t(n)(e.value.fields.看播粉丝占比)},null,8,["value"]),l(a,{title:"成交粉丝占比",value:t(n)(e.value.fields.成交粉丝占比)},null,8,["value"])]),_:1}),l(i,{inset:"",title:"成交数据"},{default:v(()=>[l(a,{title:"直播间成交金额",value:t(y)(e.value.fields.直播间成交金额)},null,8,["value"]),l(a,{title:"直播间成交件数",value:t(u)(e.value.fields.直播间成交件数),suffix:"件"},null,8,["value"]),l(a,{title:"直播间成交人数",value:t(u)(e.value.fields.直播间成交人数),suffix:"人"},null,8,["value"]),l(a,{title:"商品点击率",value:t(n)(e.value.fields["商品点击率(次数)"])},null,8,["value"]),l(a,{title:"点击成交转化率",value:t(n)(e.value.fields["点击成交转化率(次数)"])},null,8,["value"]),l(a,{title:"成交件单价",value:t(y)(e.value.fields.成交件单价)},null,8,["value"])]),_:1}),l(i,{inset:"",title:"备注"},{default:v(()=>[l(a,{title:"日志",label:e.value.fields.日志||"-"},null,8,["label"])]),_:1})],64))])])}}},J=M(q,[["__scopeId","data-v-0d44fbda"]]);export{J as default};