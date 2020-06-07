(this.webpackJsonpapp_portfolio=this.webpackJsonpapp_portfolio||[]).push([[0],{16:function(e,t,a){e.exports=a(26)},21:function(e,t,a){},22:function(e,t,a){},26:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(11),s=a.n(r),c=(a(21),a(8)),o=(a(22),a(12)),i=a(2),u=a(3),h=a(5),m=a(4),p=a(13),d=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){var e;return Object(i.a)(this,a),(e=t.call(this)).state={data:[]},e}return Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch("http://127.0.0.1:5000/chart/").then((function(e){return e.json()})).then((function(t){e.setState({data:t})})).catch((function(e){return console.log(e)}))}},{key:"render",value:function(){var e,t=[["Date","Invested","Portfolio"]],a=Object(o.a)(this.state.data);try{for(a.s();!(e=a.n()).done;){var n=e.value;t.push([n.date,n.invested,n.portfolioCost])}}catch(r){a.e(r)}finally{a.f()}return l.a.createElement("div",null,l.a.createElement("p",{style:{display:this.state.data.length?"none":"block"}},"No data to show"),l.a.createElement("div",{style:{display:this.state.data.length?"block":"none"}},l.a.createElement(p.a,{height:"500px",chartType:"LineChart",loader:l.a.createElement("div",null,"Loading Chart"),data:t,options:{title:"Cost of Portfolio vs Invested money",colors:["#D700CD","#1D19DB"],backgroundColor:"#ddd3e2",hAxis:{title:"Date"},vAxis:{title:"Cost"}},rootProps:{"data-testid":"2"}})))}}]),a}(n.Component),E=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={exchangeRate:[]},n}return Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=this,t="https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=".concat(this.props.currency,"&to_currency=ILS&apikey=PA9D235Y6KPZ46HS");fetch(t).then((function(e){return e.json()})).then((function(t){e.setState({exchangeRate:t["Realtime Currency Exchange Rate"]})})).catch((function(e){return console.log(e)}))}},{key:"render",value:function(){return l.a.createElement("div",{className:"ExchangeRate"},l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("table",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Update time"),l.a.createElement("td",null,this.state.exchangeRate["6. Last Refreshed"])),l.a.createElement("tr",null,l.a.createElement("th",null,"1 ",this.state.exchangeRate["1. From_Currency Code"]),l.a.createElement("td",null,this.state.exchangeRate["5. Exchange Rate"]," ILS"))),l.a.createElement("br",null))}}]),a}(n.Component),f=a(15),v=a(6),b=a(9),y=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={myShares:[],mySharesValues:[],listSharesMOEX:[],newShares:[],newSharesValues:[],showTableHeader:!1,investedMoney:0},n.handleSubmit=n.handleSubmit.bind(Object(b.a)(n)),n}return Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch("http://127.0.0.1:5000/portfolio_details").then((function(e){return e.json()})).then((function(t){e.setState({myShares:t})})).catch((function(e){return console.log(e)}));fetch("http://127.0.0.1:5000/shareslist").then((function(e){return e.json()})).then((function(t){t.unshift({name:"",price:"",ticker:"Choose from the list"}),e.setState({listSharesMOEX:t})})).catch((function(e){return console.log(e)}))}},{key:"handleChange",value:function(e,t){var a="mySharesValues"===t.target.name?Object(v.a)(this.state.mySharesValues):Object(v.a)(this.state.newSharesValues);a[e]=t.target.value;var n=t.target.name;this.setState(Object(f.a)({},n,a)),console.log(this.state.mySharesValues),console.log(this.state.newSharesValues)}},{key:"handleSubmit",value:function(e){var t=this,a=[],n=0;console.log(this.state.myShares),console.log(this.state.mySharesValues);for(var l=0;l<this.state.myShares.length;l++)Number.isNaN(parseFloat(this.state.mySharesValues[l]))||(n=parseInt(this.state.mySharesValues[l]),a.push({ticker:this.state.myShares[l].ticker,price:this.state.myShares[l].price,cnt:n})),console.log(a);for(var r=0;r<this.state.newShares.length;r++)Number.isNaN(parseFloat(this.state.newSharesValues[r]))||a.push({ticker:this.state.newShares[r].ticker,price:this.state.newShares[r].price,cnt:parseInt(this.state.newSharesValues[r])});var s=this.calculateInvested();a.push({invested:s}),fetch("http://127.0.0.1:5000/dataupdate/",{method:"POST",body:JSON.stringify(a),headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(e){console.log(e),console.log(e.status),200===e.status?(alert("Message Sent."),t.resetForm()):400===e.status&&alert("Message failed to send.")})),console.log(a)}},{key:"createUI",value:function(){var e=this,t=this;return this.state.myShares.map((function(a,n){return l.a.createElement("tr",{key:n},l.a.createElement("td",null,a.ticker),l.a.createElement("td",null,a.cnt),l.a.createElement("td",null,a.price),l.a.createElement("td",null,a.curcost.toFixed(2)),l.a.createElement("td",null,l.a.createElement("input",{name:"mySharesValues",type:"number",value:t.state.mySharesValues[n]||"",onChange:t.handleChange.bind(e,n)})))}))}},{key:"selectOptions",value:function(){var e=this.state.listSharesMOEX.map((function(e){return l.a.createElement("option",{key:e.ticker},e.ticker," - ",e.price)}));return console.log(e),e}},{key:"createUIForNew",value:function(){var e=this,t=this;return t.state.newSharesValues.map((function(a,n){return l.a.createElement("tr",{key:n},l.a.createElement("td",null," ",l.a.createElement("select",{onChange:t.handleNew.bind(e,n)},t.selectOptions())),l.a.createElement("td",null,l.a.createElement("input",{type:"number",name:"newSharesValues",min:"0",value:t.state.newSharesValues[n]||"",onChange:t.handleChange.bind(e,n)})),l.a.createElement("td",null,l.a.createElement("input",{type:"button",value:"remove",onClick:t.removeClick.bind(e,n)})))}))}},{key:"handleNew",value:function(e,t){var a=Object(v.a)(this.state.newShares),n=t.target.value;a[e]={ticker:n.substring(0,5),price:n.substring(7)},this.setState({newShares:a})}},{key:"addClick",value:function(){this.setState((function(e){return{showTableHeader:!0,newSharesValues:[].concat(Object(v.a)(e.newSharesValues),[""])}}))}},{key:"removeClick",value:function(e){var t=Object(v.a)(this.state.newSharesValues);t.splice(e,1),this.setState({newSharesValues:t})}},{key:"calculateInvested",value:function(){for(var e=0,t=0;t<this.state.mySharesValues.length;t++)Number.isNaN(parseFloat(this.state.mySharesValues[t]))||(e+=parseFloat(this.state.myShares[t].price)*parseFloat(this.state.mySharesValues[t]));for(var a=0;a<this.state.newSharesValues.length;a++)Number.isNaN(parseFloat(this.state.newSharesValues[a]))||(e+=parseFloat(this.state.newShares[a].price)*parseFloat(this.state.newSharesValues[a]));return e=e.toFixed(2)}},{key:"render",value:function(){return l.a.createElement("div",{id:"Details"},l.a.createElement("br",null),l.a.createElement("div",null),l.a.createElement("form",{onSubmit:this.handleSubmit},l.a.createElement("table",{style:{display:this.state.myShares.length?"block":"none"}},l.a.createElement("tr",null,l.a.createElement("th",{className:"tooltip"},"Ticker",l.a.createElement("span",{className:"tooltiptext"},"Symbol of FTE used in Moscow Exchange")),l.a.createElement("th",{className:"tooltip"},"Count",l.a.createElement("span",{className:"tooltiptext"},"Number of shares in portfolio")),l.a.createElement("th",{className:"tooltip"},"Current Price (per 1)",l.a.createElement("span",{className:"tooltiptext"},"Current price of 1 share")),l.a.createElement("th",{className:"tooltip"},"Current Cost",l.a.createElement("span",{className:"tooltiptext"},"Current cost in Portfolio according to MOEX price")),l.a.createElement("th",{className:"tooltip"},"Buy/Sell Amount",l.a.createElement("span",{className:"tooltiptext"},"Incert positive number to buy or negative number to sell"))),this.createUI()),l.a.createElement("br",null),l.a.createElement("table",{id:"newShares",style:{display:this.state.showTableHeader?"block":"none"}},l.a.createElement("tr",null,l.a.createElement("th",{className:"tooltip"},"Ticker with price",l.a.createElement("span",{className:"tooltiptext"},"Choose FTE from the list. Format: Ticket - Price")),l.a.createElement("th",{className:"tooltip"},"Buy Amount",l.a.createElement("span",{className:"tooltiptext"},"Incert number of shares (only positive!) to buy")),l.a.createElement("th",null)),this.createUIForNew()),l.a.createElement("input",{type:"button",value:"add new shares",onClick:this.addClick.bind(this)}),l.a.createElement("br",null),l.a.createElement("hr",null),l.a.createElement("br",null),l.a.createElement("p",{className:"tooltip"}," Total amount to invest:",l.a.createElement("span",{className:"tooltiptext"},"Total sum to invest")),l.a.createElement("div",null,this.calculateInvested()),l.a.createElement("br",null),l.a.createElement("hr",null),l.a.createElement("input",{id:"Buy",type:"submit",value:"Buy Shares"})))}}]),a}(n.Component);var S=function(){var e=Object(n.useState)(l.a.createElement("div",null)),t=Object(c.a)(e,2),a=t[0],r=t[1],s=Object(n.useState)(l.a.createElement("div",null)),o=Object(c.a)(s,2),i=o[0],u=o[1],h=Object(n.useState)(l.a.createElement("div",null)),m=Object(c.a)(h,2),p=m[0],f=m[1],v=Object(n.useState)(""),b=Object(c.a)(v,2),S=b[0],g=b[1];return Object(n.useEffect)((function(){fetch("http://127.0.0.1:5000/username/").then((function(e){return e.text()})).then((function(e){g(e)})).catch((function(e){return console.log(e)}))})),l.a.createElement("div",null,l.a.createElement("header",{id:"grid"},l.a.createElement("div",{id:"user"},S,l.a.createElement("a",{id:"logout",href:"http://127.0.0.1:5000/",onClick:function(){fetch("http://127.0.0.1:5000/logout/").then((function(e){return e.json()})).then((function(e){return e})).catch((function(e){return console.log(e)}))}}," LogOut")),l.a.createElement("nav",null,l.a.createElement("a",{href:"",id:"menu-icon"}),l.a.createElement("ul",null,l.a.createElement("li",null),l.a.createElement("li",null,l.a.createElement("a",{href:"#Home",onClick:function(){r(l.a.createElement("div",null,l.a.createElement(E,{currency:"EUR"}),l.a.createElement(E,{currency:"USD"}))),u(l.a.createElement("div",null)),f(l.a.createElement("div",null))}},"Home")),l.a.createElement("li",null),l.a.createElement("li",null,l.a.createElement("a",{href:"#Chart",onClick:function(){u(l.a.createElement(d,null)),r(l.a.createElement("div",null)),f(l.a.createElement("div",null))}},"Chart")),l.a.createElement("li",null),l.a.createElement("li",null,l.a.createElement("a",{href:"#Details",onClick:function(){u(l.a.createElement("div",null)),r(l.a.createElement("div",null)),f(l.a.createElement(y,null))}},"Details")),l.a.createElement("li",null),l.a.createElement("li",null,l.a.createElement("a",{href:"#"},"Contact"))))),l.a.createElement("br",null),a,i,p)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(S,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[16,1,2]]]);
//# sourceMappingURL=main.90d2157a.chunk.js.map