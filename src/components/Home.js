import React from 'react'
import Canvas from './Canvas'
import Checkbox from './Checkbox'

class Home extends React.Component{
    constructor(){
        super()

        this.state = {
            uploaded: false, 
            trees: [],
            RelScaling : true,
            Cladogram : false,
        }
    }

    handleUpload = (ev) => {
        if( window.File && window.FileReader && window.FileList && window.Blob ){
            var reader = new FileReader();
            var file = document.querySelector('input[type=file]').files[0];
            var textFile = /text.*/;
            var scope = this; // for anonymous funtion below that is not in the class component 
            if(file.type.match(textFile)) {
                reader.onload = function (event) {
                    scope.setState({
                        trees : event.target.result.split("\n"),    // loads data into state  
                        uploaded: true                              // switch upload status
                    });
                }
                reader.readAsText(file);
            }
            else {
                alert("Upload was not a .txt file");
            }
        }
        else {
            alert("Your browswer is too old for HTML5 file uploads. Please update.");
        }
    }

    handleRelScalingChange = (ev)=> {
        this.setState({
            RelScaling: ev.target.checked
        });
    }

    handleCladogramChange = (ev) => {
        this.setState({
            Cladogram : ev.target.checked
        });
    }


    render(){
        return(
            <div>
                <Canvas received={this.state.uploaded} trees = {this.state.trees} clado = {this.state.Cladogram} relscal={this.state.RelScaling}/>
                <input type ='file' onChange={this.handleUpload} />
                <Checkbox text="Relative Scaling" onChange={this.handleRelScalingChange} checked={this.state.RelScaling} />
                <Checkbox text="Cladogram" onChange={this.handleCladogramChange} checked={this.state.Cladogram} />
            </div>
        )
    }

}

export default Home;
