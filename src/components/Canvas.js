import React from 'react'
import Slider from './Slider';
// import TreeUtils from '../libs/treeUtils'

var TreeUtils = require('../libs/treeUtils');

class Canvas extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            receivedData : this.props.received,
            treeVec : this.props.trees,
            tallestTreeScale : false,
            useCladogram : false,
            maxNameLength : 0,
            RelScaling : this.props.relscal,
            Cladogram : this.props.clado,
        };
        this.TreeOfTrees = " ";
        this.currentTree = 0;
        this.utils = new TreeUtils(); // make a global 
        this.DisplayIndex = false;
    }
    // update local state from props changes 
    static getDerivedStateFromProps(props, state) {
        return {
            receivedData: props.received, 
            treeVec : props.trees, // already split by "/n"
            RelScaling : props.relscal,
            Cladogram : props.clado,
        };
    }

    componentDidMount(){
        this.canvas = this.refs.canvas;
        this.ctx = this.canvas.getContext("2d");
        // resize
        window.addEventListener('resize', this.onWindowResize, false); 
        this.canvas.addEventListener('click', (e)=> {
            if(this.utils.circles.length > 0){
                // console.log("has circles");
                const pos = {
                    x: e.clientX-this.ctx.canvas.offsetLeft,
                    y: e.clientY-this.ctx.canvas.offsetTop
                }
                this.utils.circles.forEach( circle => {
                    // console.log(this.IntersectWithCircle(pos, circle));
                    if(this.IntersectWithCircle(pos, circle)){
                        this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
                        this.utils.swapNodes(circle.id, this.state.Cladogram, this.canvas, this.ctx, this.state.RelScaling, this.ctx.canvas.height*0.9-this.utils.maxNameLength);
                        if(this.DisplayIndex){
                            if(this.state.Cladogram){
                                this.utils.display(false, this.ctx);
                            }
                            else if(this.state.RelScaling){
                                this.utils.display(true, this.ctx);
                            }
                            else{
                                this.utils.display(true, this.ctx);
                            }
                        }
                    }
                });
            }
        });
        // get init state for utils global scale 
        this.utils.tallestTreeScale = this.state.RelScaling;
        this.utils.useCladogram = this.state.Cladogram;
    }

    IntersectWithCircle = (pos, circle) => {
        return Math.pow(pos.x-circle.x,2)+Math.pow(pos.y-circle.y,2) < Math.pow(circle.radius,2); 
    }
    
    // called everytime there is a change to state -> triggered by getDerivedStates -> triggered by any relative prop changes
    componentDidUpdate(){
        if(this.state.receivedData === true){
            this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
            this.init();
        }

        if(this.DisplayIndex){
            this.DisplayIndex = !this.DisplayIndex;
            this.utils.circles =[];
        }

        // update utils gloabl vars -> maybe there is a ore elegant way to do this 
        this.utils.tallestTreeScale = this.state.RelScaling;
        this.utils.useCladogram = this.state.Cladogram;
    }

    // Will only be called when we receive new data 
    init = () => {
        if(this.state.treeVec[this.state.treeVec.length-2].match(";") === null){
            this.treeVec.pop();
        }
        // Draw first tree  
        let noTr = this.state.treeVec.length-2;
        this.utils.getMaxHeight(noTr, this.state.treeVec);
        this.utils.drawOneTree(0,this.state.treeVec, this.state.Cladogram,this.canvas,this.ctx, this.state.RelScaling, this.ctx.canvas.height*0.9-this.utils.maxNameLength);
    }

    onWindowResize = () => {
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight*0.8;
        this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
        // this.utils.drawOneTree(this.currentTree,this.state.treeVec, this.state.Cladogram,this.canvas,this.ctx, this.state.RelScaling, this.ctx.canvas.height*0.9-this.utils.maxNameLength);
        // need function to redraw tree instead
        this.utils.redrawCurrentTree(this.state.Cladogram,this.canvas,this.ctx, this.state.RelScaling, this.ctx.canvas.height*0.9-this.utils.maxNameLength);
        if(this.DisplayIndex){
            if(this.state.Cladogram){
                this.utils.display(false, this.ctx);
            }
            else if(this.state.RelScaling){
                this.utils.display(true, this.ctx);
            }
            else{
                this.utils.display(true, this.ctx);
            }
        }
    }
    // NOTE: hF = this.ctx.height*0.9-this.maxNameLength
    swapTree = (i) => {
        this.DisplayIndex = false;
        let index = Math.round(i);
        this.currentTree = index;
        this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
        this.utils.drawOneTree(index, this.state.treeVec, this.state.Cladogram,this.canvas,this.ctx, this.state.RelScaling, this.ctx.canvas.height*0.9-this.utils.maxNameLength);
    }

    toggleIndexDisplay = () => {
        // if(this.utils.circles.length > 0){
        this.utils.circles = [];
        this.DisplayIndex = !this.DisplayIndex;
        this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
        // this.utils.drawOneTree(this.currentTree,this.state.treeVec, this.state.Cladogram,this.canvas,this.ctx, this.state.RelScaling, this.ctx.canvas.height*0.9-this.utils.maxNameLength);
        this.utils.redrawCurrentTree(this.state.Cladogram,this.canvas,this.ctx, this.state.RelScaling, this.ctx.canvas.height*0.9-this.utils.maxNameLength);
        if(this.DisplayIndex){
            if(this.state.Cladogram){
                this.utils.display(false, this.ctx);
            }
            else if(this.state.RelScaling){
                this.utils.display(true, this.ctx);
            }
            else{
                this.utils.display(true, this.ctx);
            }
        } 
    }

    render(){
        return(
            <div style={{marginLeft:30, marginTop:15, marginRight:30}}>
                <canvas ref="canvas" width={window.innerWidth} height={(window.innerHeight*0.8)} />
                <Slider
                    initial={0}
                    max={this.state.treeVec.length} // use length of vector 
                    formatFn={number => number.toFixed(2)}
                    onChange={value => this.swapTree(value)} // round value to get index for treeVect
                />
                <button onClick={this.toggleIndexDisplay}>Display Node ID</button>
            </div>
        )
    }
}

export default Canvas 