import React from 'react'
import Slider from './Slider';
import jsPDF from 'jspdf';
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
            updateMe: true
        };
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
        this.ctx.save();
        this.ctx.font ="italic 25px serif";
        this.ctx.fillText("Please select input file", (this.canvas.width-350)/2 , this.canvas.height/2);
        this.ctx.restore();
        // resize
        window.addEventListener('resize', this.onWindowResize, false); 
        this.canvas.addEventListener('click', (e)=> {
            if(this.utils.circles.length > 0){
                const pos = {
                    x: e.clientX-this.ctx.canvas.offsetLeft,
                    y: e.clientY-this.ctx.canvas.offsetTop
                }
                this.utils.circles.forEach( circle => {
                    if(this.IntersectWithCircle(pos, circle)){
                        this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
                        this.utils.swapNodes(circle.id, this.state.Cladogram, this.canvas, this.ctx, this.state.RelScaling, this.ctx.canvas.height*0.9-this.utils.maxNameLength);
                        if(this.DisplayIndex){
                            this.runDisplayIndex(this.state.Cladogram, this.state.RelScaling, this.ctx);
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
        this.utils.drawOneTree(this.currentTree,this.state.treeVec, this.state.Cladogram,this.canvas,this.ctx, this.state.RelScaling, this.ctx.canvas.height*0.9-this.utils.maxNameLength);
    }

    onWindowResize = () => {
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight*0.8;
        this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
        // need function to redraw tree instead
        this.utils.redrawCurrentTree(this.state.Cladogram,this.canvas, this.ctx, this.state.RelScaling, this.ctx.canvas.height*0.9-this.utils.maxNameLength);
        if(this.DisplayIndex){
            this.runDisplayIndex(this.state.Cladogram, this.state.RelScaling, this.ctx);
        }
    }
    // NOTE: hF = this.ctx.height*0.9-this.maxNameLength
    slideToNextTree = (i) => {
        this.DisplayIndex = false;
        let index = Math.round(i);
        this.currentTree = index;
        this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
        this.utils.drawOneTree(index, this.state.treeVec, this.state.Cladogram,this.canvas,this.ctx, this.state.RelScaling, this.ctx.canvas.height*0.9-this.utils.maxNameLength);
    }

    toggleIndexDisplay = () => {
        this.utils.circles = [];
        this.DisplayIndex = !this.DisplayIndex;
        // this.setState({updateMe:true});
        this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
        // this.utils.drawOneTree(this.currentTree,this.state.treeVec, this.state.Cladogram,this.canvas,this.ctx, this.state.RelScaling, this.ctx.canvas.height*0.9-this.utils.maxNameLength);
        this.utils.redrawCurrentTree(this.state.Cladogram,this.canvas,this.ctx, this.state.RelScaling, this.ctx.canvas.height*0.9-this.utils.maxNameLength);
        if(this.DisplayIndex){
            this.runDisplayIndex(this.state.Cladogram, this.state.RelScaling, this.ctx);
        }
    }

    runDisplayIndex = (clado, relscale, context) => {
        if(clado){
            this.utils.displayIndex(false, context);
        }
        else if(relscale){
            this.utils.displayIndex(true, context);
        }
        else{
            this.utils.displayIndex(true, context);
        }
    }

    saveAsPDF = () => {
        // clear node circles from canvas 
        if(this.DisplayIndex){
            this.toggleIndexDisplay();
        }
        var imgData = this.canvas.toDataURL();
        var pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 10, -145, 300, 150, null, null, -90);
        pdf.save("download.pdf");
    }

    render(){
        return(
            <div>
                <canvas ref="canvas" width={window.innerWidth} height={(window.innerHeight*0.8)} />
                <Slider
                    initial={0}
                    max={this.state.treeVec.length} // use length of vector 
                    formatFn={number => number.toFixed(2)}
                    onChange={value => this.slideToNextTree(value)} // round value to get index for treeVect
                />
                <div className="display-save-group">
                    <button className="display-btn" onClick={this.toggleIndexDisplay}>{this.DisplayIndex? "Hide Node ID": "Display Node ID"}</button>
                    &nbsp;&nbsp;
                    <button className="save-btn" onClick={this.saveAsPDF}>Save as PDF</button>
                    &nbsp;&nbsp;
                    <button onClick={this.props.refresh}>Refresh</button>
                </div>
            </div>
        )
    }
}

export default Canvas;