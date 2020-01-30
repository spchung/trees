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
        this.utils = new TreeUtils(); // make a global 
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
        
        // get init state for utils global scale 
        this.utils.tallestTreeScale = this.state.RelScaling;
        this.utils.useCladogram = this.state.Cladogram;
    }
    
    // called everytime there is a change to state -> triggered by getDerivedStates -> triggered by any relative prop changes
    componentDidUpdate(){
        if(this.state.receivedData === true){
            this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
            this.init();
        }
        // this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);

        // update utils gloabl vars -> maybe there is a ore elegant way to do this 
        this.utils.tallestTreeScale = this.state.RelScaling;
        this.utils.useCladogram = this.state.Cladogram;
    }

    // Will only be called when we receive new data 
    init = () => {
        if(this.state.treeVec[this.state.treeVec.length-2].match(";")===null){
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

    }
    // NOTE: hF = this.ctx.height*0.9-this.maxNameLength
    swapTree = (i) => {
        let index = Math.round(i);
        this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
        this.utils.drawOneTree(index,this.state.treeVec, this.state.Cladogram,this.canvas,this.ctx, this.state.RelScaling, this.ctx.canvas.height*0.9-this.utils.maxNameLength);
    }

    /////////////////////////////// TEST Functions ////////////////////////////////////////
    draw = () => {
        this.ctx.lineWidth = 3;
        this.ctx.lineJoin = 'round';
        this.ctx.beginPath();
        this.ctx.moveTo(50,50);
        this.ctx.lineTo(1000,50);
        this.ctx.stroke();
    }

    // checkVar = () => {
    //     if (this.utils.useCladogram){
    //         console.log("Cladogram unabled");
    //     }
    //     if(this.utils.tallestTreeScale){
    //         console.log("relscale enabled");
    //     }
    // }


    render(){
        return(
            <>
                <canvas ref="canvas" width={window.innerWidth} height={(window.innerHeight*0.8)} />
                {/* <button onClick = {this.draw}>X</button> */}
                <Slider
                    initial={0}
                    max={this.state.treeVec.length} // use length of vector 
                    formatFn={number => number.toFixed(2)}
                    onChange={value => this.swapTree(value)} // round value to get index for treeVect
                />
            </>
        )
    }
}

export default Canvas 