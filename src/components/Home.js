import React from 'react'
import Canvas from './Canvas'

class Home extends React.Component{
    constructor(){
        super()

        this.state = {
            uploaded: false, 
            trees: [],
        }
        // empty array we will populate with input data
    }

    handleUpload = (ev) => {
        // check browser capabilities  
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


    render(){
        return(
            <div>
                <Canvas received={this.state.uploaded} trees = {this.state.trees}/>
                <input type ='file' onChange={this.handleUpload} />
            </div>
        )
    }

}

export default Home;
