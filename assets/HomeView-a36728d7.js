import{_ as B,g as C,f as V,a as x,b as o,c as u,d as s,e as D,h as g}from"./_plugin-vue_export-helper-287c8d43.js";import{r as _,o as H,a as n,b as d,c,d as l,e as y,f as N,F as P,w as i,u as t}from"./index-1d672858.js";const F={class:"home"},L={class:"page-content"},M={key:0,class:"loading-wrapper"},$={__name:"HomeView",setup(E){const r=_(!0),f=_(""),e=_(null);async function b(){try{r.value=!0,f.value="",e.value=await C()}catch(m){f.value="数据加载失败，请稍后重试",console.error("获取最新数据失败:",m)}finally{r.value=!1}}return H(()=>{b()}),(m,p)=>{const h=n("van-nav-bar"),w=n("van-loading"),k=n("van-empty"),a=n("van-cell"),v=n("van-cell-group");return d(),c("div",F,[l(h,{title:"最新数据"}),y("div",L,[r.value?(d(),c("div",M,[l(w,{type:"spinner",color:"#1989fa"}),p[0]||(p[0]=y("p",null,"加载中...",-1))])):f.value?(d(),N(k,{key:1,image:"error",description:f.value},null,8,["description"])):(d(),c(P,{key:2},[l(v,{inset:"",title:"基本信息"},{default:i(()=>[l(a,{title:"开播日期",value:t(V)(e.value.fields.开播日期)},null,8,["value"]),l(a,{title:"是否为大促",value:t(x)(e.value.fields.是否为大促)},null,8,["value"]),l(a,{title:"是否为节假日",value:t(x)(e.value.fields.是否为节假日)},null,8,["value"]),l(a,{title:"自觉流量如何",value:e.value.fields.自觉流量如何||"-"},null,8,["value"])]),_:1}),l(v,{inset:"",title:"流量数据"},{default:i(()=>[l(a,{title:"千次",value:t(o)(e.value.fields.千次)},null,8,["value"]),l(a,{title:"直播推荐千次",value:t(o)(e.value.fields.直播推荐千次)},null,8,["value"]),l(a,{title:"千川PC千次",value:t(o)(e.value.fields.千川PC千次)},null,8,["value"]),l(a,{title:"随心推千次",value:t(o)(e.value.fields.随心推千次)},null,8,["value"])]),_:1}),l(v,{inset:"",title:"直播间数据"},{default:i(()=>[l(a,{title:"直播间曝光次数",value:t(u)(e.value.fields["直播间曝光次数（万）"]),suffix:"万"},null,8,["value"]),l(a,{title:"在线峰值人数",value:t(u)(e.value.fields.在线峰值人数),suffix:"人"},null,8,["value"]),l(a,{title:"进入率",value:t(s)(e.value.fields.进入率)},null,8,["value"]),l(a,{title:"互动率",value:t(s)(e.value.fields.互动率)},null,8,["value"]),l(a,{title:"加粉率",value:t(s)(e.value.fields.加粉率)},null,8,["value"])]),_:1}),l(v,{inset:"",title:"时间数据"},{default:i(()=>[l(a,{title:"开播时间",value:t(D)(e.value.fields.开播时间)},null,8,["value"]),l(a,{title:"开播时长",value:`${e.value.fields.开播时长}小时`},null,8,["value"]),l(a,{title:"周几",value:e.value.fields.周几},null,8,["value"])]),_:1}),l(v,{inset:"",title:"观众数据"},{default:i(()=>[l(a,{title:"直播间观看人数",value:t(u)(e.value.fields.直播间观看人数),suffix:"人"},null,8,["value"]),l(a,{title:"直播间观看人次",value:t(u)(e.value.fields.直播间观看人次),suffix:"次"},null,8,["value"]),l(a,{title:"最高在线人数",value:t(u)(e.value.fields.最高在线人数),suffix:"人"},null,8,["value"]),l(a,{title:"平均在线人数",value:t(u)(e.value.fields.平均在线人数),suffix:"人"},null,8,["value"]),l(a,{title:"人均观看时长",value:`${e.value.fields.人均观看时长}分钟`},null,8,["value"])]),_:1}),l(v,{inset:"",title:"互动数据"},{default:i(()=>[l(a,{title:"评论次数",value:t(u)(e.value.fields.评论次数),suffix:"次"},null,8,["value"]),l(a,{title:"新增粉丝数",value:t(u)(e.value.fields.新增粉丝数),suffix:"人"},null,8,["value"]),l(a,{title:"上一场新增粉丝数",value:t(u)(e.value.fields.上一场新增粉丝数),suffix:"人"},null,8,["value"]),l(a,{title:"看播粉丝占比",value:t(s)(e.value.fields.看播粉丝占比)},null,8,["value"]),l(a,{title:"成交粉丝占比",value:t(s)(e.value.fields.成交粉丝占比)},null,8,["value"])]),_:1}),l(v,{inset:"",title:"成交数据"},{default:i(()=>[l(a,{title:"直播间成交金额",value:t(g)(e.value.fields.直播间成交金额)},null,8,["value"]),l(a,{title:"直播间成交件数",value:t(u)(e.value.fields.直播间成交件数),suffix:"件"},null,8,["value"]),l(a,{title:"直播间成交人数",value:t(u)(e.value.fields.直播间成交人数),suffix:"人"},null,8,["value"]),l(a,{title:"商品点击率",value:t(s)(e.value.fields["商品点击率(次数)"])},null,8,["value"]),l(a,{title:"点击成交转化率",value:t(s)(e.value.fields["点击成交转化率(次数)"])},null,8,["value"]),l(a,{title:"成交件单价",value:t(g)(e.value.fields.成交件单价)},null,8,["value"])]),_:1}),l(v,{inset:"",title:"备注"},{default:i(()=>[l(a,{title:"日志",label:e.value.fields.日志||"-"},null,8,["label"])]),_:1})],64))])])}}},T=B($,[["__scopeId","data-v-09123200"]]);export{T as default};
