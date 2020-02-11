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

    handleUpload = async (ev) => {
        if( window.File && window.FileReader && window.FileList && window.Blob ){
            var reader = new FileReader();
            var file = document.querySelector('input[type=file]').files[0];
            var textFile = /text.*/;
            var scope = this; // for anonymous funtion below that is not in the class component 
            if(file.type.match(textFile)) {
                reader.onload = function (event) {
                    if(scope.varifyInputFile(event.target.result.split("\n"))){
                        scope.setState({
                            trees : event.target.result.split("\n"),    // loads data into state  
                            uploaded: true                              // switch upload status -> also triggers the actual drawing of the tree
                        });
                    }
                    else{
                        console.log("bad input");
                        scope.forceUpdate();
                    }
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

    varifyInputFile = (inputVect) => {
        let returnString ="";
        let badInput = false;

        for(let i = 0; i < inputVect.length-1; i++){
            let string = inputVect[i].replace(/(\s[#]\d+\.\d+)/g, "");

            //1. paranthesis test 
            if( string.match(/(\()/g).length !== string.match(/(\))/g).length ){
                returnString+=(`Mismatch parenthesis at line ${i+1}\n`);
                badInput = true;
            }
            
            //2. comma to species name check
            if( string.match(/(?=\D)(\w+)/g).length !== (string.match(/,/g).length +1) ){
                returnString+=(`Incorrect tree depth at line ${i+1}\n`);
                badInput = true;
            }

            //3. species name and branchlength test 
            if( string.match(/(?=\D)(\w+)/g).length !== string.match(/(?=\D)(\w+)(\:\s\d+\.\d+)/g).length ){
                returnString+=(`Mismatch number of species and brlength at line ${i+1}\n`);
                badInput = true;
            }
        }
        if(badInput){
            alert(returnString);
            return false;
        }
        return true;
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
