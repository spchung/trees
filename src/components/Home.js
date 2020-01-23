import React from 'react'
import Canvas from './Canvas'

class Home extends React.Component{
    constructor(){
        super()

        this.state = {
            uploaded: false, 
        }
        // empty array we will populate with input data
        this.treeVect = []
    }

    handleUpload = (ev) => {
        // check browser capabilities  
        if( window.File && window.FileReader && window.FileList && window.Blob ){
            var reader = new FileReader();
            var file = document.querySelector('input[type=file]').files[0];
            var textFile = /text.*/;

            if(file.type.match(textFile)) {
                reader.onload = function (event) {
                    this.treeVect = event.target.result.split("\n");
                }
            }else{
                alert("Upload was not a .txt file");
            }
            // loads data into treeVect
            reader.readAsText(file);
            // set file upload status to True
            this.setState({
                uploaded: true,
            });
        }
        else {
            alert("Your browswer is too old for HTML5 file uploads. Please update. ");
        }
    }

    render(){
        return(
            <div>
                <Canvas received={this.state.uploaded}/>
                <input type ='file' onChange={this.handleUpload} />
            </div>
        )
    }

}

export default Home;
