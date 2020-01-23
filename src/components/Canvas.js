import React from 'react'


class Canvas extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            receivedData : false,
        } 
    }
    static getDerivedStateFromProps(props, state) {
        return {receivedData: props.received };
      }

    onComponentDidmount(){
        let txt ="";
        if(this.state.receivedData){
            txt = "yeer"
        }else{
            txt = "naaar"
        }
        console.log(txt);
        this.setState({
            receivedData : this.props.received,
        });
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
                <canvas ref="canvas" color="red"/>
                {para}
            </div>
        )
    }
}

export default Canvas 