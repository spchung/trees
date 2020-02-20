/* eslint-disable no-lone-blocks */
function TreeUtils(){
    // var treeString="empty";
    var TREEROOT;
    var SPNAMES=[];
    var initX=40;
    var initY=15; 
    // var scaleFactor=50;
    var spaceFactor=50
    var heightFactor=100;
    // var heightToSpaceFactor=1;
    var space=0;
    // var treeVec = [];
    // var aString="";
    // var treePos="";
    var maxHeight=0; 
    // var value=0;
    var scaleBar=0.0;

    this.tallestTreeScale=false;
    this.useCladogram=false;
    this.maxNameLength=0; 
    this.circles=[];


    /////////////////// ORIGINAL ////////////////
    function Node(data, left, right, father){
        this.data = data;
        this.left = left;
        this.right = right;
        this.father = father;
        this.space = 0;
        this.height = 0; 
        this.theta = 0;
        this.index = -99;
        this.circle = new Circle();
        // this.show = show;
    }
    // Add On circle class //
    function Circle(){
        this.id = 0;
        this.x = 0;
        this.y = 0;
    }

    this.getMaxHeight = (noTr, treeVec) => {
        maxHeight=0;
        for(let y=0; y<noTr; y++){
            let h1 = this.getTreeHeight(treeVec[y]);
            if(h1 > maxHeight){
                maxHeight = h1;
            }
        }
    }

    this.getTreeHeight = (tree) => {
        // strip all thetas out of tree
        var Newtree = tree.replace(/(#\d.\d+)([eE](\+|-)?[0-9]+)?/g,"");
        // count opening parenthese until first tip taxa is encountered
        var p=0;
        while(Newtree[p]==="("){
            p++;
        }
        // strip all leading "("s out of tree
        Newtree = Newtree.replace(/\(+/,"");
        // put elements of tree into a vector
        var newick=Newtree.match(/((\+|-)?([0-9]+\.[0-9]*|\.[0-9]+)([eE](\+|-)?[0-9]+)?)|(\w+)|(\()|(\))|(\,)/g); // ([eE][-+]?[0-9]+)?) /g);
        // get tree height
        var blsum=0;
        blsum += Number(newick[1]); 
        var j=0;
        for(var k=2; k<newick.length; k++){
            if(newick[k]==="("){
                j++;
            }
            else if ((newick[k]===")")&&(j===0)&&(p>1)) {
                blsum += Number(newick[k+1]); p--;
            }
            else if ((newick[k]===")")&&(j>0)) {
                j--;
            }
        }
        return blsum;
    }

    this.makeEdge = (x,y,z,context) => {
        context.lineWidth = 3;
        context.lineJoin = 'round';
        context.beginPath();
        context.moveTo(x,y);
        context.lineTo(x,z);
        context.stroke();
    }

    this.printNames = (nameArray, context) => {
        let currX=initX+spaceFactor;
        let cY=initY+this.maxNameLength -12;

        for (let i=0; i<nameArray.length;i++){
            context.textAlign='start';
            context.textBaseline='middle';
            context.save();
            context.translate(currX,cY);
            context.rotate(Math.PI*(3/2));	
            context.fillText(nameArray[i],0,0);
            context.restore();
	        currX+=spaceFactor;
        }
    } 

    this.postOrder = (node,context,brLng) => {
        if (!brLng){ // is a cladogram with no branch lengths
            if(node === null){
                // console.log("returned");
                return; 
            }
            if(node.left !== null){
                // console.log("going left");
                this.postOrder(node.left, context, false);
            }
            if(node.right !== null){
                // console.log("goin right");
                this.postOrder(node.right, context, false);
            } 
            if((node.left == null)&&(node.right == null)){
                // drawing the tips of the tree 
                space+=spaceFactor;
                node.space=space;
                this.printTheta( node.space+initX, node.height*heightFactor+initY+this.maxNameLength, node, context );
                this.makeEdge(node.space+initX, node.height*heightFactor+initY+this.maxNameLength,node.father.height*heightFactor+initY+this.maxNameLength,context);
            }
            else {
                node.space = (node.left.space + node.right.space)/2;
                context.lineWidth = 2;
                context.lineJoin = 'round';
                context.beginPath();
                context.moveTo(node.left.space+initX,node.height*heightFactor+initY+this.maxNameLength);
                context.lineTo(node.right.space+initX,node.height*heightFactor+initY+this.maxNameLength);
                context.stroke();
                if(node.father != null){
                    // var y1=node.right.height*heightFactor+initY+maxNameLength;
                    // var y2=node.height*heightFactor+initY+maxNameLength;
                    // this.makeEdge(node.space+initX,node.height*heightFactor+initY+this.maxNameLength,node.theta,context);
                    this.printTheta(node.space+initX,node.height*heightFactor+initY+this.maxNameLength, node, context)
                    this.makeEdge(node.space+initX,node.height*heightFactor+initY+this.maxNameLength,node.father.height*heightFactor+initY+this.maxNameLength,context);
                }
                else{
                    this.drawRootTheta(node, context, node.theta, true);
                }
            }
            // this.addNodeTag(node, order, context);
        }
        else if(brLng){
            if(node === null){
                // console.log("returned");
                return;
            }
            if(node.left != null){
                // console.log("going left");
                this.postOrder(node.left, context, true);
            }
            if(node.right != null){
                // console.log("going right");
                this.postOrder(node.right, context, true);
            }
            if((node.left === null)&&(node.right === null)){
                // drawing the tips of the tree 
                space+=spaceFactor;
                node.space=space;
                // var y2=node.height*heightFactor+initY+maxNameLength;
                // this.makeEdge(50,200,500,context);
                // console.log("nodeSpace: ", node.space, "initX: ", initX, "initY: ", initY, "MaxNameLen: ", this.maxNameLength, "nodeeight: ", node.height, "HeightFactor: ", heightFactor);
                // this.makeEdge(264,45,450, context);
                this.printTheta( node.space+initX, initY+this.maxNameLength, node, context, true);
                this.makeEdge( node.space+initX, initY+this.maxNameLength, node.height*heightFactor+initY+this.maxNameLength, context);
            }
            else {
                // non-tip nodes
                node.space = (node.left.space + node.right.space)/2;
                context.lineWidth = 2;
                context.lineJoin = 'round';
                // horizontal lines
                context.beginPath();
                context.moveTo(node.left.space+initX,node.right.height*heightFactor+initY+this.maxNameLength);
                context.lineTo(node.right.space+initX,node.right.height*heightFactor+initY+this.maxNameLength);
                context.stroke();
                // try printing order
                if(node.father != null){
                    // this.makeEdge(100,200,500,context);
                    this.printTheta(node.space+initX, node.right.height*heightFactor+initY+this.maxNameLength, node, context );
                    // node.space+initX,node.right.height*heightFactor+initY+this.maxNameLength,node.height*heightFactor+initY+this.maxNameLength,context
                    this.makeEdge(node.space+initX,node.right.height*heightFactor+initY+this.maxNameLength,node.height*heightFactor+initY+this.maxNameLength,context);
                }
                else{
                    this.drawRootTheta(node, context, node.theta, false);
                }
            }
        }
    }

    this.drawOneTree = (value,treeVec,useCladogram,canvas,context,tallestTreeScale,hF) => {   
        if(value < treeVec.length){
            // 1 - make tree structure from input text 
            if(!useCladogram){
                this.treeFromNewick(treeVec[value],true, context);
            }
            else{
                this.treeFromNewick(treeVec[value],false, context);
            }
        
            // 2 
            spaceFactor = (canvas.width-initX)*0.9/SPNAMES.length;
            space=0;
            if(!useCladogram){
                if(tallestTreeScale){
                    heightFactor=hF/maxHeight;

                }
                else{
                    heightFactor=hF/TREEROOT.left.height;
                }
            }
            else {
                heightFactor=hF/TREEROOT.height;
            }
            // draw scale bar at left
            if(!useCladogram){
                scaleBar=30.0/heightFactor;
                this.makeEdge(initX-40,initY+this.maxNameLength,initY+this.maxNameLength+scaleBar*heightFactor,context); // vertical side bar 
                context.fillText(scaleBar.toPrecision(1),initX-35,initY+this.maxNameLength+scaleBar*heightFactor);
            }
        
            context.font = "italic bold 16px serif";
            this.printNames(SPNAMES,context);
            if(!useCladogram){
                this.postOrder(TREEROOT,context,true);
            }
            else{
                this.postOrder(TREEROOT,context,false);
            }
        }
    }

    this.treeFromNewick = (newickString,brLen,ctx) => {
        var orderTag = 0;
        if(!brLen){
            let height = newickString.match(/(\,)/g).length;
            // overwrite input string 
            newickString = newickString.replace(/e-\d+/g,"").replace(/:/g,"");
            SPNAMES = newickString.match(/(?=\D)(\w+)/g);
            this.getMaxLenSN(SPNAMES, ctx);
            let newick = newickString.match(/([A-Za-z]+)|(\()|(\))|(\,)|([#]\d+\.\d+)/g);

            let n = new Node("root", null, null, null);
            n.height = height
            TREEROOT = n;
            let current = TREEROOT;
            current.height=0;
            for(let pos = 0; pos < newick.length; pos++){
                if((newick[pos] === "(")||(newick[pos]===",")){
                    n = new Node("empty", null, null, null);
                }
                switch(newick[pos]) {
                    case "(":
                        // up left
                            current.left = n;
                            n.father = current;
                            current = n;
                        break;
                    case ",":
                        // back then right
                            current = current.father;
                            current.right=n;
                            n.father = current;
                            current = n;
                        break;
                    case ")":
                        // back
                            current = current.father;
                            current.height=Math.max(current.right.height,current.left.height)+1;
                        break;
                    default:
                        if(newick[pos].match(/([#]\d+\.\d+)/g)){
                            current.theta = newick[pos];
                            current.order = orderTag;
                        }
                        else{
                            current.data = newick[pos];
                            current.height = 0;
                        }
                        break;
                    }
                orderTag+=1;
	        }
	        TREEROOT.height=Math.max(current.right.height,current.left.height)+1;
        }
        else if(brLen){
            SPNAMES = newickString.replace(/(#\d+\.\d+)|(\d+\.\d+)/g,"").replace(/e-\d+/g,"").replace(/:/g,"").match(/(?=\D)(\w+)/g);
            this.getMaxLenSN(SPNAMES, ctx);
            newickString=newickString.replace(/e-\d+/g,"").replace(/:/g,"");
            let newick=newickString.match(/((\+|-)?([0-9]+\.[0-9]*|\.[0-9]+)([eE](\+|-)?[0-9]+)?)|(\w+)|(\()|(\))|(\,)|([#]\d+\.\d+)/g); 
            let n = new Node("root", null, null, null, null, null, null);
            TREEROOT = n;
            let current = TREEROOT;
            let cumY=0.0;
            for(let pos = 0; pos < newick.length; pos++){
                if((newick[pos] === "(")||(newick[pos]===",")){
                    n = new Node("empty", null, null, null, null, null, null);
                }
                switch(newick[pos]) {
                    case "(":
                        // up left
                        current.left = n;
                        n.father = current;
                        current = n;
                        break;
                    case ",":
                        // back then right
                        current = current.father;
                        current.right=n;
                        n.father = current;
                        current = n;
                        break;
                    case ")":
                        // back
                        cumY = current.height;
                        current = current.father;
                        break;
                    case ";":
                        // at end
                        break;
                    default:
                        current.order = orderTag;
                        if( (newick[pos].match(/(\+|-)?([0-9]+\.[0-9]*|\.[0-9]+)([eE](\+|-)?[0-9]+)?/) !=null) && (newick[pos].match(/([#]\d+\.\d+)/) == null) ) {
                            current.height = parseFloat(newick[pos])+cumY;
                        }
                        else if(newick[pos].match(/([#]\d+\.\d+)/)){
                            current.theta = newick[pos];
                        }
                        else{
                            current.data = newick[pos];
                            cumY=0.0;
                        }
                        break;
                }
            }    
        }
    }

    this.getMaxLenSN = (sN, context) => {
        let mLen = 0;
        let iD = 0;

        for(let i=0; i<sN.length; i++){
            if(sN[i].length > mLen){
                mLen = sN[i].length;
                iD = i;
            }
            context.font = "italic bold 16px serif";
            this.maxNameLength=context.measureText(sN[iD]).width;
        }
    }

    ////////////// ADD ONS ///////////////
    //// Prinitng Theta Value ////
    this.printTheta = (x,y,node,context,branchTip) =>{
        if(node){
            // console.log(node.order)
            context.textAlign='start';
            context.textBaseline='middle';
            context.save();
            let X = x-70;
            let Y = y+15;
            context.translate(X, Y);
            let message = node.theta.replace(/[#]/,"");
            context.fillText(message,0,0);
            context.restore();
        }
    } 

    this.drawRootTheta = (node, context, message, clado) => {
        if(message){
            if(!clado){
                let x = (node.left.space+node.right.space)/2+initX;
                let y = node.right.height*heightFactor+initY+this.maxNameLength;
                context.save();
                context.translate(x,y+10);
                message = message.replace(/[#]/,"");
                context.fillText(message,0,0);
                context.restore();
            }
            else{
                let x = (node.left.space+node.right.space)/2+initX;
                let y = node.height*heightFactor+initY+this.maxNameLength
                context.save();
                context.translate(x,y+10);
                message = message.replace(/[#]/,"");
                context.fillText(message,0,0);
                context.restore()
            }
        }
        else{
            console.log("bad");
        }
    }

    function Swap(node,InputNodeID){
        if(node === null){
            return;
        }
        if(node.index === InputNodeID){
            if(node.left && node.right){
                let temp = node.left;
                node.left = node.right;
                node.right = temp;
            }
        }
        if(node.left !== null){
            Swap(node.left, InputNodeID);
        }
        if(node.right !== null){ 
            Swap(node.right, InputNodeID);
        }
    }

    //SPECIES NAME
    this.newSpeciesOrder = (node) => {
        var treeList =[]
        ExtractSpeciesOrder(node,treeList);
        return treeList;
    }

    //DISPLAY Index 
    this.displayIndex = (brLen, context) =>{
        if(this.circles.length === 0){
            if(TREEROOT){
                var indexer = new Indexer();
                EnumerateTree(TREEROOT,indexer);
                this.DrawIndex(TREEROOT, brLen, context, this.maxNameLength);
            }
        }
        else{
            if(TREEROOT){
                this.circles =[];
                this.DrawIndex(TREEROOT, brLen, context, this.maxNameLength);
            }
        }
    }

    function Indexer(){
        this.index = 0;
        this.assign = (node) =>{
            node.index = this.index;
            node.circle.id = this.index;
            this.index++;
        }
    }

    function ExtractSpeciesOrder(tNode, newickSt){
        // Call after altering a tree 
        // Recursively traverse tree to get new Species name order
        if(tNode === null){
            return;
        }
        var currNode = tNode;
        if(currNode.left !== null){
            ExtractSpeciesOrder(currNode.left, newickSt);
        }
        if(currNode.right !== null){
            ExtractSpeciesOrder(currNode.right, newickSt);
        }
        if((currNode.left === null) && (currNode.right === null)){
            newickSt.push(tNode.data);
        }
    }

    function EnumerateTree(node,indexer){
        if(node === null){
            return;
        }
        if((node.left !== null)&& (node.right!==null)){
            indexer.assign(node);
        }

        if(node.left !== null){
            EnumerateTree(node.left, indexer);
        }
        
        if(node.right !== null){
            EnumerateTree(node.right, indexer)
        }
    }

    this.DrawIndex = (node, brLen, context, maxNameLength) => {
        if(node === null){
            return;
        }
        if((node.left !== null) && (node.right!==null)){
            // print index
            if(brLen){
                // console.log(node.space+initX, node.right.height*heightFactor+initY,maxNameLength);
                // console.log(node.right.height, heightFactor,initY,maxNameLength);
                this.drawIndexToCanvas( node.space+initX, node.right.height*heightFactor+initY, maxNameLength, node, context, brLen);
            }else{
                // console.log(node.space+initX, node.height*heightFactor+initY,maxNameLength);
                this.drawIndexToCanvas( node.space+initX, node.height*heightFactor+initY, maxNameLength, node, context, brLen);
            }
        }
        if(node.left !== null){ 
            this.DrawIndex(node.left, brLen, context, maxNameLength);
        }
        if(node.right !== null){
            this.DrawIndex(node.right, brLen, context, maxNameLength);
        }
    }

    //called to generate an circle object for each potential node flip
    this.createCircle = (x, y, radius, id) => {
        this.circles.push({x: x, y: y, radius: radius, id: id});
    }

    this.drawIndexToCanvas = (x, y, MaxNameLen ,node, context, brLen) => {
        var radius = 15;
        if(node.father === null){
            if(brLen){
                let x = (node.left.space+node.right.space)/2+initX;
                let y = node.right.height*heightFactor+initY+MaxNameLen;
                
                context.save();
                context.beginPath();
                this.createCircle(x, y, radius, node.index);
                context.arc(x, y, radius, 0, 2*Math.PI, false);
                context.fillStyle = '#4a4a4a';
                context.fill();
                context.lineWidth = 3;
                context.strokeStyle = '#000000';
                context.stroke();
                context.restore();

                context.save();
                context.translate(x-4, y);
                context.fillStyle = '#ffffff';
                context.fillText(node.index,0,0);
                context.restore();
            }
            else{
                let x = (node.left.space+node.right.space)/2+initX-50;
                let y = node.height*heightFactor+initY+MaxNameLen+10

                context.save();
                context.beginPath();
                this.createCircle(x, y, radius, node.index);
                context.arc(x, y, radius, 0, 2*Math.PI, false);
                context.fillStyle = '#4a4a4a';
                context.fill();
                context.lineWidth = 3;
                context.strokeStyle = '#000000';
                context.stroke();
                context.restore();

                context.save();
                context.translate(x-4, y);
                context.fillStyle = '#ffffff';
                context.fillText(node.index,0,0);
                context.restore();
            }
        }
        else{
            context.textAlign='start';
            context.textBaseline='middle';
            
            context.save();
            context.beginPath();
            this.createCircle(x, y+30, radius, node.index);
            context.arc(x, y+30, radius, 0, 2*Math.PI, false);
            context.fillStyle = '#4a4a4a';
            context.fill();
            context.lineWidth = 3;
            context.strokeStyle = '#000000';
            context.stroke();
            context.restore()

            context.save();
            context.translate(x-4, y+30);
            context.fillStyle = '#ffffff';
            context.fillText(node.index, 0, 0);
            context.restore();
        }
    }

    this.swapNodes = (nodeId, useCladogram, canvas, context, tallestTreeScale, hF) => {
        if(TREEROOT){
            Swap(TREEROOT,nodeId);
            spaceFactor = (canvas.width-initX)*0.9/SPNAMES.length;
            space=0;
            if(!useCladogram){
                if(tallestTreeScale){
                    heightFactor=hF/maxHeight;

                }
                else{
                    heightFactor=hF/TREEROOT.left.height;
                }
            }
            else {
                heightFactor=hF/TREEROOT.height;
            }
            // draw scale bar at left
            // if(value==0)
            if(!useCladogram){
                scaleBar=30.0/heightFactor;
                this.makeEdge(initX-40,initY+this.maxNameLength,initY+this.maxNameLength+scaleBar*heightFactor,context); // vertical side bar 
                context.fillText(scaleBar.toPrecision(1),initX-35,initY+this.maxNameLength+scaleBar*heightFactor);
            }
        
            context.font = "italic bold 16px serif";
            this.printNames(this.newSpeciesOrder(TREEROOT) ,context);
            if(!useCladogram){
                this.postOrder(TREEROOT,context,true);
            }
            else{
                this.postOrder(TREEROOT,context,false);
            }
        }
    }
    
    this.redrawCurrentTree = (useCladogram, canvas, context, tallestTreeScale, hF) => {
        if(TREEROOT){
            spaceFactor = (canvas.width-initX)*0.9/SPNAMES.length;
            space=0;
            if(!useCladogram){
                if(tallestTreeScale){
                    heightFactor=hF/maxHeight;

                }
                else{
                    heightFactor=hF/TREEROOT.left.height;
                }
            }
            else {
                heightFactor=hF/TREEROOT.height;
            }
            // draw scale bar at left
            if(!useCladogram){
                scaleBar=30.0/heightFactor;
                this.makeEdge(initX-40,initY+this.maxNameLength,initY+this.maxNameLength+scaleBar*heightFactor,context); // vertical side bar 
                context.font = "italic bold 16px serif";
                context.fillText(scaleBar.toPrecision(1),initX-35,initY+this.maxNameLength+scaleBar*heightFactor);
            }
        
            context.font = "italic bold 16px serif";
            this.printNames(this.newSpeciesOrder(TREEROOT) ,context);
            if(!useCladogram){
                this.postOrder(TREEROOT,context,true);
            }
            else{
                this.postOrder(TREEROOT,context,false);
            }
        }
    }
}
    
module.exports = TreeUtils;