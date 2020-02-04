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


    //hidden from class
    function Node(data, left, right, father){
        this.data = data;
        this.left = left;
        this.right = right;
        this.father = father;
        this.space = 0;
        this.height = 0; 
        this.theta=0;
        // this.show = show;
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

    //context === this.ctx
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
                return; 
            }
            if(node.left !== null){
                this.postOrder(node.left, context, false);
            }
            if(node.right !== null){
                this.postOrder(node.right, context, false);
            } 
            if((node.left == null)&&(node.right == null)){
                // drawing the tips of the tree 
                space+=spaceFactor;
                node.space=space;
                this.printTheta( node.space+initX, node.height*heightFactor+initY+this.maxNameLength, node.theta, context );
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
                    this.printTheta(node.space+initX,node.height*heightFactor+initY+this.maxNameLength, node.theta, context)
                    this.makeEdge(node.space+initX,node.height*heightFactor+initY+this.maxNameLength,node.father.height*heightFactor+initY+this.maxNameLength,context);
                }
                else{
                    console.log(node.theta);
                    this.drawRootTheta(node, context, node.theta, true);
                }
            }
        }
        else if(brLng){
            if(node === null){
                return;
            }
            if(node.left != null){
                this.postOrder(node.left, context, true);
            }
            if(node.right != null){
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
                this.printTheta( node.space+initX, initY+this.maxNameLength, node.theta, context);
                this.makeEdge( node.space+initX, initY+this.maxNameLength, node.height*heightFactor+initY+this.maxNameLength, context);
            }
            else {
                node.space = (node.left.space + node.right.space)/2;
                context.lineWidth = 2;
                context.lineJoin = 'round';
                context.beginPath();
                context.moveTo(node.left.space+initX,node.right.height*heightFactor+initY+this.maxNameLength);
                context.lineTo(node.right.space+initX,node.right.height*heightFactor+initY+this.maxNameLength);
                context.stroke();
                if(node.father != null){
                    // this.makeEdge(100,200,500,context);
                    this.printTheta(node.space+initX, node.right.height*heightFactor+initY+this.maxNameLength, node.theta, context );
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
            // 1 - make trees
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
            // if(value==0)
            if(!useCladogram){
                scaleBar=30.0/heightFactor;
                this.makeEdge(initX-40,initY+this.maxNameLength,initY+this.maxNameLength+scaleBar*heightFactor,context);
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

    this.printTheta = (x,y,message,context) =>{
        if(message){
            context.textAlign='start';
            context.textBaseline='middle';
            context.save();
            context.translate(x-70,y+15);
            message = message.replace(/[#]/,"");
            context.fillText(message,0,0);
            context.restore();
        }
        else{
            console.log("bad");
        }
    } 

    this.treeFromNewick = (newickString,brLen,ctx) => {
        // var pounds;
        if(!brLen){
            let height = newickString.match(/(\,)/g).length;
            // overwrite input string 
            // newickString = newickString.replace(/(#\d+\.\d+)|(\d+\.\d+)/g,"").replace(/e-\d+/g,"").replace(/:/g,"");
            newickString = newickString.replace(/e-\d+/g,"").replace(/:/g,"");
            SPNAMES = newickString.match(/(?=\D)(\w+)/g);
            this.getMaxLenSN(SPNAMES, ctx);
            // let newick = newickString.match(/(\w+)|(\()|(\))|(\,)/g);
            let newick = newickString.match(/([A-Za-z]+)|(\()|(\))|(\,)|([#]\d+\.\d+)/g);

            let n = new Node("root", null, null,null,null,height);
            TREEROOT = n;
            let current = TREEROOT;
            current.height=0;
            for(let pos = 0; pos < newick.length; pos++){
                if((newick[pos] === "(")||(newick[pos]===",")){
                    n = new Node("empty", null, null,null,null,null);
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
                            // console.log("theta")
                        }
                        else{
                            current.data = newick[pos];
                            current.height = 0;
                        }
                        break;
                    }
	        }
	        TREEROOT.height=Math.max(current.right.height,current.left.height)+1;
        }

        else if(brLen){
            SPNAMES = newickString.replace(/(#\d+\.\d+)|(\d+\.\d+)/g,"").replace(/e-\d+/g,"").replace(/:/g,"").match(/(?=\D)(\w+)/g);
            this.getMaxLenSN(SPNAMES, ctx);
            newickString=newickString.replace(/e-\d+/g,"").replace(/:/g,"");
            let newick=newickString.match(/((\+|-)?([0-9]+\.[0-9]*|\.[0-9]+)([eE](\+|-)?[0-9]+)?)|(\w+)|(\()|(\))|(\,)|([#]\d+\.\d+)/g); 
            let n = new Node("root", null, null,null,null,null);
            TREEROOT = n;
            let current = TREEROOT;
            let cumY=0.0;
            for(let pos = 0; pos < newick.length; pos++){
                if(newick[pos] !== ")"){
                    n = new Node("empty", null, null,null,null,null);
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
                        if( (newick[pos].match(/(\+|-)?([0-9]+\.[0-9]*|\.[0-9]+)([eE](\+|-)?[0-9]+)?/) !=null) && (newick[pos].match(/([#]\d+\.\d+)/) == null) ) {
                            current.data = newick[pos];
                            current.height = parseFloat(newick[pos])+cumY;
                            // current.theta = 96;
                        }
                        else if(newick[pos].match(/([#]\d+\.\d+)/)){
                            current.theta = newick[pos];
                        }
                        else{
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
}
    
module.exports = TreeUtils;