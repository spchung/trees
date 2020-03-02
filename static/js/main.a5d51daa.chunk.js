(this.webpackJsonptrees=this.webpackJsonptrees||[]).push([[0],{20:function(e,t,a){e.exports=a(32)},25:function(e,t,a){},26:function(e,t,a){},31:function(e,t){e.exports=function(){var e,t=this,a=[],n=50,i=100,l=0,r=0,s=0;function c(e,t,a,n){this.data=e,this.left=t,this.right=a,this.father=n,this.space=0,this.height=0,this.theta=0,this.index=-99,this.circle=new o}function h(){var e=this;this.index=0,this.assign=function(t){t.index=e.index,t.circle.id=e.index,e.index++}}function o(){this.id=0,this.x=0,this.y=0}function g(e){var t=[];return function e(t,a){if(null!==t){var n=t;null!==n.left&&e(n.left,a),null!==n.right&&e(n.right,a),null===n.left&&null===n.right&&a.push(t.data)}}(e,t),t}this.tallestTreeScale=!1,this.useCladogram=!1,this.maxNameLength=0,this.circles=[],this.getMaxHeight=function(e,a){r=0;for(var n=0;n<e;n++){var i=t.getTreeHeight(a[n]);i>r&&(r=i)}},this.getTreeHeight=function(e){for(var t=e.replace(/(#\d.\d+)([eE](\+|-)?[0-9]+)?/g,""),a=0;"("===t[a];)a++;var n=(t=t.replace(/\(+/,"")).match(/((\+|-)?([0-9]+\.[0-9]*|\.[0-9]+)([eE](\+|-)?[0-9]+)?)|(\w+)|(\()|(\))|(,)/g),i=0;i+=Number(n[1]);for(var l=0,r=2;r<n.length;r++)"("===n[r]?l++:")"===n[r]&&0===l&&a>1?(i+=Number(n[r+1]),a--):")"===n[r]&&l>0&&l--;return i},this.makeEdge=function(e,t,a,n){n.lineWidth=3,n.lineJoin="round",n.beginPath(),n.moveTo(e,t),n.lineTo(e,a),n.stroke()},this.printNames=function(e,a){for(var i=40+n,l=15+t.maxNameLength-12,r=0;r<e.length;r++)a.textAlign="start",a.textBaseline="middle",a.save(),a.translate(i,l),a.rotate(1.5*Math.PI),a.fillText(e[r],0,0),a.restore(),i+=n},this.postOrder=function(e,a,r){if(r){if(r){if(null===e)return;null!=e.left&&t.postOrder(e.left,a,!0),null!=e.right&&t.postOrder(e.right,a,!0),null===e.left&&null===e.right?(l+=n,e.space=l,t.printTheta(e.space+40,15+t.maxNameLength,e,a,!0),t.makeEdge(e.space+40,15+t.maxNameLength,e.height*i+15+t.maxNameLength,a)):(e.space=(e.left.space+e.right.space)/2,a.lineWidth=2,a.lineJoin="round",a.beginPath(),a.moveTo(e.left.space+40,e.right.height*i+15+t.maxNameLength),a.lineTo(e.right.space+40,e.right.height*i+15+t.maxNameLength),a.stroke(),null!=e.father?(t.printTheta(e.space+40,e.right.height*i+15+t.maxNameLength,e,a),t.makeEdge(e.space+40,e.right.height*i+15+t.maxNameLength,e.height*i+15+t.maxNameLength,a)):t.drawRootTheta(e,a,e.theta,!1))}}else{if(null===e)return;null!==e.left&&t.postOrder(e.left,a,!1),null!==e.right&&t.postOrder(e.right,a,!1),null==e.left&&null==e.right?(l+=n,e.space=l,t.printTheta(e.space+40,e.height*i+15+t.maxNameLength,e,a),t.makeEdge(e.space+40,e.height*i+15+t.maxNameLength,e.father.height*i+15+t.maxNameLength,a)):(e.space=(e.left.space+e.right.space)/2,a.lineWidth=2,a.lineJoin="round",a.beginPath(),a.moveTo(e.left.space+40,e.height*i+15+t.maxNameLength),a.lineTo(e.right.space+40,e.height*i+15+t.maxNameLength),a.stroke(),null!=e.father?(t.printTheta(e.space+40,e.height*i+15+t.maxNameLength,e,a),t.makeEdge(e.space+40,e.height*i+15+t.maxNameLength,e.father.height*i+15+t.maxNameLength,a)):t.drawRootTheta(e,a,e.theta,!0))}},this.drawOneTree=function(c,h,o,g,u,d,f){c<h.length&&(o?t.treeFromNewick(h[c],!1,u):t.treeFromNewick(h[c],!0,u),n=.9*(g.width-40)/a.length,l=0,i=o?f/e.height:d?f/r:f/e.left.height,o||(s=30/i,t.makeEdge(0,15+t.maxNameLength,15+t.maxNameLength+s*i,u),u.fillText(s.toPrecision(1),5,15+t.maxNameLength+s*i)),u.font="italic bold 16px serif",t.printNames(a,u),o?t.postOrder(e,u,!1):t.postOrder(e,u,!0))},this.treeFromNewick=function(n,i,l){var r=0;if(i){if(i){a=n.replace(/(#\d+\.\d+)|(\d+\.\d+)/g,"").replace(/e-\d+/g,"").replace(/:/g,"").match(/(?=\D)(\w+)/g),t.getMaxLenSN(a,l);for(var s=(n=n.replace(/e-\d+/g,"").replace(/:/g,"")).match(/((\+|-)?([0-9]+\.[0-9]*|\.[0-9]+)([eE](\+|-)?[0-9]+)?)|(\w+)|(\()|(\))|(,)|([#]\d+\.\d+)/g),h=new c("root",null,null,null,null,null,null),o=e=h,g=0,u=0;u<s.length;u++)switch("("!==s[u]&&","!==s[u]||(h=new c("empty",null,null,null,null,null,null)),s[u]){case"(":o.left=h,h.father=o,o=h;break;case",":(o=o.father).right=h,h.father=o,o=h;break;case")":g=o.height,o=o.father;break;case";":break;default:o.order=r,null!=s[u].match(/(\+|-)?([0-9]+\.[0-9]*|\.[0-9]+)([eE](\+|-)?[0-9]+)?/)&&null==s[u].match(/([#]\d+\.\d+)/)?o.height=parseFloat(s[u])+g:s[u].match(/([#]\d+\.\d+)/)?o.theta=s[u]:(o.data=s[u],g=0)}}}else{var d=n.match(/(,)/g).length;n=n.replace(/e-\d+/g,"").replace(/:/g,""),a=n.match(/(?=\D)(\w+)/g),t.getMaxLenSN(a,l);var f=n.match(/([A-Za-z]+)|(\()|(\))|(,)|([#]\d+\.\d+)/g),m=new c("root",null,null,null);m.height=d;var p=e=m;p.height=0;for(var x=0;x<f.length;x++){switch("("!==f[x]&&","!==f[x]||(m=new c("empty",null,null,null)),f[x]){case"(":p.left=m,m.father=p,p=m;break;case",":(p=p.father).right=m,m.father=p,p=m;break;case")":(p=p.father).height=Math.max(p.right.height,p.left.height)+1;break;default:f[x].match(/([#]\d+\.\d+)/g)?(p.theta=f[x],p.order=r):(p.data=f[x],p.height=0)}r+=1}e.height=Math.max(p.right.height,p.left.height)+1}},this.getMaxLenSN=function(e,a){for(var n=0,i=0,l=0;l<e.length;l++)e[l].length>n&&(n=e[l].length,i=l),a.font="italic bold 16px serif",t.maxNameLength=a.measureText(e[i]).width},this.printTheta=function(e,t,a,n,i){if(a&&a.theta){n.textAlign="start",n.textBaseline="middle",n.save();var l=e-70,r=t+15;n.translate(l,r);var s=a.theta.replace(/[#]/,"");n.fillText(s,0,0),n.restore()}},this.drawRootTheta=function(e,a,n,l){if(n)if(l){var r=(e.left.space+e.right.space)/2+40,s=e.height*i+15+t.maxNameLength;a.save(),a.translate(r,s+10),n=n.replace(/[#]/,""),a.fillText(n,0,0),a.restore()}else{var c=(e.left.space+e.right.space)/2+40,h=e.right.height*i+15+t.maxNameLength;a.save(),a.translate(c,h+10),n=n.replace(/[#]/,""),a.fillText(n,0,0),a.restore()}else console.log("bad")},this.displayIndex=function(a,n){if(0===t.circles.length){if(e){var i=new h;!function e(t,a){if(null===t)return;null!==t.left&&null!==t.right&&a.assign(t);null!==t.left&&e(t.left,a);null!==t.right&&e(t.right,a)}(e,i),t.DrawIndex(e,a,n,t.maxNameLength)}}else e&&(t.circles=[],t.DrawIndex(e,a,n,t.maxNameLength))},this.DrawIndex=function(e,a,n,l){null!==e&&(null!==e.left&&null!==e.right&&(a?t.drawIndexToCanvas(e.space+40,e.right.height*i+15,l,e,n,a):t.drawIndexToCanvas(e.space+40,e.height*i+15,l,e,n,a)),null!==e.left&&t.DrawIndex(e.left,a,n,l),null!==e.right&&t.DrawIndex(e.right,a,n,l))},this.createCircle=function(e,a,n,i){t.circles.push({x:e,y:a,radius:n,id:i})},this.drawIndexToCanvas=function(e,a,n,l,r,s){if(null===l.father)if(s){var c=(l.left.space+l.right.space)/2+40,h=l.right.height*i+15+n;r.save(),r.beginPath(),t.createCircle(c,h,15,l.index),r.arc(c,h,15,0,2*Math.PI,!1),r.fillStyle="#4a4a4a",r.fill(),r.lineWidth=3,r.strokeStyle="#000000",r.stroke(),r.translate(c-4,h),r.fillStyle="#ffffff",r.fillText(l.index,0,0),r.restore()}else r.save(),r.beginPath(),t.createCircle(e,a+30,15,l.index),r.arc(e,a+30,15,0,2*Math.PI,!1),r.fillStyle="#4a4a4a",r.fill(),r.lineWidth=3,r.strokeStyle="#000000",r.stroke(),r.translate(e-4,a+30),r.fillStyle="#ffffff",r.fillText(l.index,0,0),r.restore();else if(r.textAlign="start",r.textBaseline="middle",r.save(),r.beginPath(),t.useCladogram)t.createCircle(e,a+30,15,l.index),r.arc(e,a+30,15,0,2*Math.PI,!1),r.fillStyle="#4a4a4a",r.fill(),r.lineWidth=3,r.strokeStyle="#000000",r.stroke(),r.translate(e-4,a+30),r.fillStyle="#ffffff",r.fillText(l.index,0,0),r.restore();else{var o=(l.left.space+l.right.space)/2+40,g=l.right.height*i+15+n;t.createCircle(o,g,15,l.index),r.arc(o,g,15,0,2*Math.PI,!1),r.fillStyle="#4a4a4a",r.fill(),r.lineWidth=3,r.strokeStyle="#000000",r.stroke(),r.translate(o-4,g),r.fillStyle="#ffffff",r.fillText(l.index,0,0),r.restore()}},this.swapNodes=function(c,h,o,u,d,f){e&&(!function e(t,a){if(null===t)return;if(t.index===a&&t.left&&t.right){var n=t.left;t.left=t.right,t.right=n}null!==t.left&&e(t.left,a);null!==t.right&&e(t.right,a)}(e,c),n=.9*(o.width-40)/a.length,l=0,i=h?f/e.height:d?f/r:f/e.left.height,h||(s=30/i,t.makeEdge(0,15+t.maxNameLength,15+t.maxNameLength+s*i,u),u.fillText(s.toPrecision(1),5,15+t.maxNameLength+s*i)),u.font="italic bold 16px serif",t.printNames(g(e),u),h?t.postOrder(e,u,!1):t.postOrder(e,u,!0))},this.redrawCurrentTree=function(c,h,o,u,d){e&&(n=.9*(h.width-40)/a.length,l=0,i=c?d/e.height:u?d/r:d/e.left.height,c||(s=30/i,t.makeEdge(0,15+t.maxNameLength,15+t.maxNameLength+s*i,o),o.font="italic bold 16px serif",o.fillText(s.toPrecision(1),5,15+t.maxNameLength+s*i)),o.font="italic bold 16px serif",t.printNames(g(e),o),c?t.postOrder(e,o,!1):t.postOrder(e,o,!0))}}},32:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),l=a(13),r=a.n(l),s=(a(25),a(26),a(10)),c=a.n(s),h=a(14),o=a(2),g=a(3),u=a(5),d=a(4),f=a(1),m=a(6),p=a(7),x=a(8);function v(){var e=Object(p.a)(["\n  width: 20px;\n  height: 20px;\n  border-radius: 3px;\n  position: relative;\n  top: -3px;\n  opacity: 0.5;\n  background: #33ff99;\n  cursor: pointer;\n"]);return v=function(){return e},e}function w(){var e=Object(p.a)(["\n  position: relative;\n  border-radius: 3px;\n  background: #dddddd;\n  height: 15px;\n"]);return w=function(){return e},e}function b(){var e=Object(p.a)(["\n  display: flex;\n  justify-content: flex-end;\n"]);return b=function(){return e},e}var C=x.a.div(b()),L=x.a.div(w()),y=x.a.div(v()),N=function(e,t){return 100*e/t},S=function(e){return"calc(".concat(e,"% - 5px)")},k=function(e){var t=e.initial,a=e.max,n=e.onChange,l=N(t,a),r=i.a.useRef(),s=i.a.useRef(),c=i.a.useRef(),h=i.a.useRef(null),o=function(e){var t=e.clientX-h.current-r.current.getBoundingClientRect().left,i=r.current.offsetWidth-s.current.offsetWidth;t<0&&(t=0),t>i&&(t=i);var l=N(t,i),o=function(e,t){return t/100*e}(l,a);s.current.style.left=S(Math.round(l)),c.current.textContent=Math.round(o),n(o)},g=function e(){document.removeEventListener("mouseup",e),document.removeEventListener("mousemove",o)};return i.a.createElement(i.a.Fragment,null,i.a.createElement(C,null,i.a.createElement("strong",{ref:c},t),"\xa0/\xa0",a),i.a.createElement(L,{ref:r},i.a.createElement(y,{style:{left:S(l)},ref:s,onMouseDown:function(e){h.current=e.clientX-s.current.getBoundingClientRect().left,document.addEventListener("mousemove",o),document.addEventListener("mouseup",g)}})))},T=a(18),E=a.n(T),I=a(31),R=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).IntersectWithCircle=function(e,t){return Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2)<Math.pow(t.radius,2)},a.init=function(){null===a.state.treeVec[a.state.treeVec.length-2].match(";")&&a.treeVec.pop();var e=a.state.treeVec.length-2;a.utils.getMaxHeight(e,a.state.treeVec),a.utils.drawOneTree(a.currentTree,a.state.treeVec,a.state.Cladogram,a.canvas,a.ctx,a.state.RelScaling,.9*a.ctx.canvas.height-a.utils.maxNameLength)},a.onWindowResize=function(){a.ctx.canvas.width=window.innerWidth,a.ctx.canvas.height=.8*window.innerHeight,a.ctx.clearRect(0,0,a.ctx.canvas.width,a.ctx.canvas.height),a.utils.redrawCurrentTree(a.state.Cladogram,a.canvas,a.ctx,a.state.RelScaling,.9*a.ctx.canvas.height-a.utils.maxNameLength),a.DisplayIndex&&a.runDisplayIndex(a.state.Cladogram,a.state.RelScaling,a.ctx)},a.slideToNextTree=function(e){a.DisplayIndex=!1;var t=Math.round(e);a.currentTree=t,a.ctx.clearRect(0,0,a.ctx.canvas.width,a.ctx.canvas.height),a.utils.drawOneTree(t,a.state.treeVec,a.state.Cladogram,a.canvas,a.ctx,a.state.RelScaling,.9*a.ctx.canvas.height-a.utils.maxNameLength)},a.toggleIndexDisplay=function(){a.swapCount=0,a.utils.circles=[],a.DisplayIndex=!a.DisplayIndex,a.ctx.clearRect(0,0,a.ctx.canvas.width,a.ctx.canvas.height),a.utils.redrawCurrentTree(a.state.Cladogram,a.canvas,a.ctx,a.state.RelScaling,.9*a.ctx.canvas.height-a.utils.maxNameLength),a.DisplayIndex&&(a.runDisplayIndex(a.state.Cladogram,a.state.RelScaling,a.ctx),a.showSwapInstructions(a.ctx))},a.showSwapInstructions=function(e){a.utils.circles.length>0&&(e.save(),e.translate(0,725),e.fillText("Instruction:\nClick on any node bubbles\non the screen to swap its associated branches ",0,0),e.restore())},a.runDisplayIndex=function(e,t,n){a.swapCount<3&&a.showSwapInstructions(a.ctx),e?a.utils.displayIndex(!1,n):a.utils.displayIndex(!0,n),a.swapCount++},a.saveAsPDF=function(){a.DisplayIndex&&a.toggleIndexDisplay();var e=a.canvas.toDataURL(),t=new E.a;t.addImage(e,"JPEG",10,-145,300,150,null,null,-90),t.save("download.pdf")},a.state={receivedData:a.props.received,treeVec:a.props.trees,tallestTreeScale:!1,useCladogram:!1,maxNameLength:0,RelScaling:a.props.relscal,Cladogram:a.props.clado,updateMe:!0},a.currentTree=0,a.utils=new I,a.DisplayIndex=!1,a.swapCount=0,a}return Object(m.a)(t,e),Object(g.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.canvas=this.refs.canvas,this.ctx=this.canvas.getContext("2d"),this.ctx.save(),this.ctx.font="italic 25px serif",this.ctx.fillText("Please select input file",(this.canvas.width-350)/2,this.canvas.height/2),this.ctx.restore(),window.addEventListener("resize",this.onWindowResize,!1),this.canvas.addEventListener("click",(function(t){if(e.utils.circles.length>0){var a={x:t.clientX-e.ctx.canvas.offsetLeft,y:t.clientY-e.ctx.canvas.offsetTop};e.utils.circles.forEach((function(t){e.IntersectWithCircle(a,t)&&(e.ctx.clearRect(0,0,e.ctx.canvas.width,e.ctx.canvas.height),e.utils.swapNodes(t.id,e.state.Cladogram,e.canvas,e.ctx,e.state.RelScaling,.9*e.ctx.canvas.height-e.utils.maxNameLength),e.DisplayIndex&&e.runDisplayIndex(e.state.Cladogram,e.state.RelScaling,e.ctx))}))}})),this.utils.tallestTreeScale=this.state.RelScaling,this.utils.useCladogram=this.state.Cladogram}},{key:"componentDidUpdate",value:function(){!0===this.state.receivedData&&(this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height),this.init()),this.DisplayIndex&&(this.DisplayIndex=!this.DisplayIndex,this.utils.circles=[]),this.utils.tallestTreeScale=this.state.RelScaling,this.utils.useCladogram=this.state.Cladogram}},{key:"render",value:function(){var e=this;return i.a.createElement("div",null,i.a.createElement("canvas",{ref:"canvas",width:window.innerWidth,height:.8*window.innerHeight}),i.a.createElement(k,{initial:0,max:this.state.treeVec.length,formatFn:function(e){return e.toFixed(2)},onChange:function(t){return e.slideToNextTree(t)}}),i.a.createElement("div",{className:"display-save-group"},i.a.createElement("button",{className:"display-btn",onClick:this.toggleIndexDisplay},"Swap Nodes"),"\xa0\xa0",i.a.createElement("button",{className:"save-btn",onClick:this.saveAsPDF},"Save as PDF"),"\xa0\xa0",i.a.createElement("button",{onClick:this.props.refresh},"Refresh")))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return{receivedData:e.received,treeVec:e.trees,RelScaling:e.relscal,Cladogram:e.clado}}}]),t}(i.a.Component),D=function(e){return n.createElement("label",{className:"check-label"},n.createElement("input",{type:"checkbox",checked:e.checked,onChange:e.onChange}),n.createElement("span",{className:"checkmark"}),n.createElement("span",{className:"check-custom"},e.text))},O=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(u.a)(this,Object(d.a)(t).call(this))).handleUpload=function(t){if(window.File&&window.FileReader&&window.FileList&&window.Blob){var a=new FileReader,n=document.querySelector("input[type=file]").files[0],i=Object(f.a)(e);n&&(n.type.match(/text.*/)&&!n.type.match(/text\/javascript/)?(a.onload=function(e){i.varifyInputFile(e.target.result.split("\n"))?(i.setState({trees:e.target.result.split("\n"),uploaded:!0,currLen:e.target.result.split("\n").length}),i.setState({currLen:e.target.result.split("\n").length}),i.past=i.state.currLen):(console.log("bad input"),i.forceUpdate())},e.CurrFile=n,a.readAsText(n)):alert("Upload was not a .txt file"))}else alert("Your browswer is too old for HTML5 file uploads. Please update.")},e.handleRefresh=Object(h.a)(c.a.mark((function t(){var a,n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(null===e.CurrFile){t.next=6;break}return a=new FileReader,n=Object(f.a)(e),a.onload=function(e){n.varifyInputFile(e.target.result.split("\n"))?(n.setState({trees:e.target.result.split("\n"),uploaded:!0,currLen:e.target.result.split("\n").length}),n.setState({currLen:e.target.result.split("\n").length}),n.logDiffLength(),n.past=n.state.currLen):n.forceUpdate()},t.next=6,a.readAsText(e.CurrFile);case 6:case"end":return t.stop()}}),t)}))),e.logDiffLength=function(){e.past!==e.state.currLen&&(e.past<e.state.currLen?alert("New lines added to file.\nOld Length: ".concat(e.past,"\nNew Length: ").concat(e.state.currLen,"\nAdded ").concat(e.state.currLen-e.past," new lines to the file.")):alert("Seems like you deleted some lines in your file! That doesn't seem right.\nPlease check your input file again"))},e.handleRelScalingChange=function(t){e.setState({RelScaling:!0,Cladogram:!1,AbsScaling:!1})},e.handleCladogramChange=function(t){e.setState({Cladogram:!0,RelScaling:!1,AbsScaling:!1})},e.handleAbsScaling=function(t){e.setState({AbsScaling:!0,Cladogram:!1,RelScaling:!1})},e.varifyInputFile=function(e){for(var t="",a=!1,n=0;n<e.length-1;n++){var i=e[n].replace(/(\s[#]\d+\.\d+)/g,"");i.match(/(\()/g).length!==i.match(/(\))/g).length&&(t+="Mismatch parenthesis at line ".concat(n+1,"\n"),a=!0),i.match(/(?=\D)(\w+)/g).length!==i.match(/,/g).length+1&&(t+="Incorrect tree depth at line ".concat(n+1,"\n"),a=!0),i.match(/(?=\D)(\w+)/g).length!==i.match(/(?=\D)(\w+)(:\s\d+\.\d+)/g).length&&(t+="Mismatch number of species and brlength at line ".concat(n+1,"\n"),a=!0)}return!a||(alert(t),!1)},e.state={uploaded:!1,trees:[],RelScaling:!0,Cladogram:!1,AbsScaling:!1,currLen:0},e.CurrFile=null,e.currFileLength=0,e.previousFileLen=0,e.past=0,e}return Object(m.a)(t,e),Object(g.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{style:{marginLeft:30,marginTop:15,marginRight:30}},i.a.createElement(R,{received:this.state.uploaded,trees:this.state.trees,clado:this.state.Cladogram,relscal:this.state.RelScaling,refresh:this.handleRefresh}),i.a.createElement("label",{className:"file-inp"},i.a.createElement("input",{type:"file",onChange:this.handleUpload})),i.a.createElement("div",{className:"scaling-btn-group"},i.a.createElement(D,{text:"Absolute Scaling",onChange:this.handleAbsScaling,checked:this.state.AbsScaling}),"\xa0\xa0\xa0\xa0\xa0",i.a.createElement(D,{text:"Relative Scaling",onChange:this.handleRelScalingChange,checked:this.state.RelScaling}),"\xa0\xa0\xa0\xa0\xa0",i.a.createElement(D,{text:"Cladogram",onChange:this.handleCladogramChange,checked:this.state.Cladogram})))}}]),t}(i.a.Component);var F=function(){return i.a.createElement(O,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(F,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[20,1,2]]]);
//# sourceMappingURL=main.a5d51daa.chunk.js.map