(this.webpackJsonpapp_portfolio=this.webpackJsonpapp_portfolio||[]).push([[0],{16:function(e,t,a){e.exports=a(26)},21:function(e,t,a){},22:function(e,t,a){},26:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(11),c=a.n(r),u=(a(21),a(8)),s=(a(22),a(12)),i=a(2),o=a(3),h=a(5),m=a(4),E=a(13),d=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){var e;return Object(i.a)(this,a),(e=t.call(this)).state={data:[]},e}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch("http://127.0.0.1:5000/chart/").then((function(e){return e.json()})).then((function(t){console.log(t),e.setState({data:t})})).catch((function(e){return console.log(e)}))}},{key:"render",value:function(){var e,t=[["Date","Invested","Portfolio"]],a=Object(s.a)(this.state.data);try{for(a.s();!(e=a.n()).done;){var n=e.value;t.push([n.date,n.invested,n.portfolioCost])}}catch(r){a.e(r)}finally{a.f()}return l.a.createElement("div",null,l.a.createElement(E.a,{height:"500px",chartType:"Line",loader:l.a.createElement("div",null,"Loading Chart"),data:t,options:{chart:{title:"Box Office Earnings in First Two Weeks of Opening",subtitle:"in millions of dollars (USD)"}},rootProps:{"data-testid":"3"}}))}}]),a}(n.Component),f=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={exchangeRate:[]},n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this,t="https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=".concat(this.props.currency,"&to_currency=ILS&apikey=PA9D235Y6KPZ46HS");fetch(t).then((function(e){return e.json()})).then((function(t){e.setState({exchangeRate:t["Realtime Currency Exchange Rate"]})})).catch((function(e){return console.log(e)}))}},{key:"render",value:function(){return l.a.createElement("div",{className:"ExchangeRate"},l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("table",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Update time"),l.a.createElement("td",null,this.state.exchangeRate["6. Last Refreshed"])),l.a.createElement("tr",null,l.a.createElement("th",null,"1 ",this.state.exchangeRate["1. From_Currency Code"]),l.a.createElement("td",null,this.state.exchangeRate["5. Exchange Rate"]," ILS"))),l.a.createElement("br",null))}}]),a}(n.Component),v=a(15),p=a(6),b=a(9),S=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={myShares:[],mySharesValues:[],listSharesMOEX:[],newShares:[],newSharesValues:[],addList:[],showTableHeader:!1},n.handleSubmit=n.handleSubmit.bind(Object(b.a)(n)),n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch("http://127.0.0.1:5000/portfolio_details").then((function(e){return e.json()})).then((function(t){e.setState({myShares:t})})).catch((function(e){return console.log(e)}));fetch("http://127.0.0.1:5000/shareslist").then((function(e){return e.json()})).then((function(t){t.unshift({name:"",price:"",ticker:"Choose from the list"}),e.setState({listSharesMOEX:t})})).catch((function(e){return console.log(e)}))}},{key:"handleChange",value:function(e,t){var a="mySharesValues"===t.target.name?Object(p.a)(this.state.mySharesValues):Object(p.a)(this.state.newSharesValues);a[e]=t.target.value;var n=t.target.name;this.setState(Object(v.a)({},n,a)),console.log(this.state.mySharesValues),console.log(this.state.newSharesValues)}},{key:"handleSubmit",value:function(e){alert("A name was submitted: "+this.state.mySharesValues.join(", ")),e.preventDefault()}},{key:"createUI",value:function(){var e=this,t=this;return this.state.myShares.map((function(a,n){return l.a.createElement("tr",{key:n},l.a.createElement("td",null,a.ticker),l.a.createElement("td",null,a.cost),l.a.createElement("td",null,a.cnt),l.a.createElement("td",null,a.price),l.a.createElement("td",null,a.curcost),l.a.createElement("td",null,l.a.createElement("input",{name:"mySharesValues",type:"number",value:t.state.mySharesValues[n]||"",onChange:t.handleChange.bind(e,n)})))}))}},{key:"selectOptions",value:function(){var e=this.state.listSharesMOEX.map((function(e){return l.a.createElement("option",{key:e.ticker},e.ticker," - ",e.price)}));return console.log(e),e}},{key:"createUIForNew",value:function(){var e=this,t=this;return t.state.newSharesValues.map((function(a,n){return l.a.createElement("tr",{key:n},l.a.createElement("td",null," ",l.a.createElement("select",{onChange:t.handleNew.bind(e,n)},t.selectOptions())),l.a.createElement("td",null,l.a.createElement("input",{type:"number",name:"newSharesValues",min:"0",value:t.state.newSharesValues[n]||"",onChange:t.handleChange.bind(e,n)})),l.a.createElement("td",null,l.a.createElement("input",{type:"button",value:"remove",onClick:t.removeClick.bind(e,n)})))}))}},{key:"handleNew",value:function(e,t){var a=Object(p.a)(this.state.newShares),n=t.target.value;a[e]={ticker:n.substring(0,5),price:n.substring(7)},this.setState({newShares:a})}},{key:"addClick",value:function(){this.setState((function(e){return{showTableHeader:!0,newSharesValues:[].concat(Object(p.a)(e.newSharesValues),[""])}}))}},{key:"removeClick",value:function(e){var t=Object(p.a)(this.state.newSharesValues);t.splice(e,1),this.setState({newSharesValues:t})}},{key:"calculateInvested",value:function(){for(var e=0,t=0;t<this.state.mySharesValues.length;t++)Number.isNaN(parseFloat(this.state.mySharesValues[t]))||(e+=parseFloat(this.state.myShares[t].price)*parseFloat(this.state.mySharesValues[t]));for(var a=0;a<this.state.newSharesValues.length;a++)Number.isNaN(parseFloat(this.state.newSharesValues[a]))||(e+=parseFloat(this.state.newShares[a].price)*parseFloat(this.state.newSharesValues[a]));return e=e.toFixed(2)}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("br",null),l.a.createElement("div",null),l.a.createElement("table",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Ticker"),l.a.createElement("th",null,"Previous Cost"),l.a.createElement("th",null,"Count"),l.a.createElement("th",null,"Current Price (per 1)"),l.a.createElement("th",null,"Current Cost"),l.a.createElement("th",null,"Buy/Sell Amount")),this.createUI()),l.a.createElement("br",null),l.a.createElement("table",{id:"newShares",style:{display:this.state.showTableHeader?"block":"none"}},l.a.createElement("tr",null,l.a.createElement("th",null,"Ticker with price"),l.a.createElement("th",null,"Buy Amount"),l.a.createElement("th",null)),this.createUIForNew()),l.a.createElement("input",{type:"button",value:"add new shares",onClick:this.addClick.bind(this)}),l.a.createElement("br",null),l.a.createElement("hr",null),l.a.createElement("p",null,"Total amount to invest:"),l.a.createElement("div",null,this.calculateInvested()))}}]),a}(n.Component);var y=function(){var e=Object(n.useState)(l.a.createElement("div",null)),t=Object(u.a)(e,2),a=t[0],r=t[1],c=Object(n.useState)(l.a.createElement("div",null)),s=Object(u.a)(c,2),i=s[0],o=s[1],h=Object(n.useState)(l.a.createElement("div",null)),m=Object(u.a)(h,2),E=m[0],v=m[1],p=Object(n.useState)(""),b=Object(u.a)(p,2),y=b[0],g=b[1];return Object(n.useEffect)((function(){fetch("http://127.0.0.1:5000/username/").then((function(e){return e.text()})).then((function(e){g(e)})).catch((function(e){return console.log(e)}))})),l.a.createElement("div",null,l.a.createElement("header",{id:"grid"},l.a.createElement("div",{id:"user"},"You are loged as ",y,l.a.createElement("a",{id:"logout",href:"http://127.0.0.1:5000/",onClick:function(){fetch("http://127.0.0.1:5000/logout/").then((function(e){return e.json()})).then((function(e){return e})).catch((function(e){return console.log(e)}))}}," LogOut")),l.a.createElement("nav",null,l.a.createElement("a",{href:"",id:"menu-icon"}),l.a.createElement("ul",null,l.a.createElement("li",null),l.a.createElement("li",null,l.a.createElement("a",{href:"#Home",onClick:function(){r(l.a.createElement("div",null,l.a.createElement(f,{currency:"EUR"}),l.a.createElement(f,{currency:"USD"}))),o(l.a.createElement("div",null)),v(l.a.createElement("div",null))}},"Home")),l.a.createElement("li",null),l.a.createElement("li",null,l.a.createElement("a",{href:"#Chart",onClick:function(){o(l.a.createElement(d,null)),r(l.a.createElement("div",null)),v(l.a.createElement("div",null))}},"Chart")),l.a.createElement("li",null),l.a.createElement("li",null,l.a.createElement("a",{href:"#Details",onClick:function(){o(l.a.createElement("div",null)),r(l.a.createElement("div",null)),v(l.a.createElement(S,null))}},"Details")),l.a.createElement("li",null),l.a.createElement("li",null,l.a.createElement("a",{href:"#"},"Contact"))))),l.a.createElement("br",null),a,i,E)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[16,1,2]]]);
//# sourceMappingURL=main.f3732682.chunk.js.map