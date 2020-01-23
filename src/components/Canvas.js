import React from 'react'
import Slider from './Slider';


class Canvas extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            receivedData : false,
        } 
    }
    // update local state from props changes 
    static getDerivedStateFromProps(props, state) {
        return {receivedData: props.received };
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
        console.log("Height: ", window.innerHeight)
        console.log("canvas height: ", this.ctx.canvas.height)
    }


    render(){
        let para;
        if(this.state.receivedData){
            para = <p>Yes Data</p>;
        }
        else{
            para = <p>No Data</p>

        }
        return(
            <div>
                <canvas ref="canvas" width={window.innerWidth} height={(window.innerHeight*0.8)} />
                {para}

                <Slider
                    initial={0}
                    max={100} // use length of vector 
                    formatFn={number => number.toFixed(2)}
                    onChange={value => console.log(value)} // round value to get index for treeVect
                />

            </div>
        )
    }
}

export default Canvas 