import React from 'react'
import Slider from './Slider';
// import TreeUtils from '../libs/treeUtils'

var TreeUtils = require('../libs/treeUtils');

class Canvas extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            receivedData : false,
            treeVec : [],
            tallestTreeScale : false,
            useCladogram : false,
            maxNameLength : 0
        } 
    }
    // update local state from props changes 
    static getDerivedStateFromProps(props, state) {
        return {
            receivedData: props.received, 
            treeVec : props.trees
        };
    }

    componentDidMount(){
        const canvas = this.refs.canvas;
        this.ctx = canvas.getContext("2d");

        // resize
        window.addEventListener('resize', this.onWindowResize, false); 
    }

    onWindowResize = () => {
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight*0.8;
    }
    // NOTE: hF = this.ctx.height*0.9-this.maxNameLength
    drawOneTree = (i,useCladogram,tallestTreeScale,hF) => {
        let index = Math.round(i);
        console.log(index);
        let u = new TreeUtils();
        console.log(u.printStr())
    
    }


    render(){
        return(
            <>
                <canvas ref="canvas" width={window.innerWidth} height={(window.innerHeight*0.8)} />
                <Slider
                    initial={0}
                    max={this.state.treeVec.length} // use length of vector 
                    formatFn={number => number.toFixed(2)}
                    onChange={value => this.drawOneTree(value, this.state.useCladogram, this.state.tallestTreeScale, this.ctx.height*0.9-this.maxNameLength)} // round value to get index for treeVect
                />

            </>
        )
    }
}

export default Canvas 