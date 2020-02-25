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
            AbsScaling : false,
            currLen : 0
        }
        this.CurrFile = null;
        this.currFileLength = 0;
        this.previousFileLen = 0;
        this.past =0;
    }

    handleUpload = (ev) => {
        if( window.File && window.FileReader && window.FileList && window.Blob ){
            var reader = new FileReader();
            var file = document.querySelector('input[type=file]').files[0];
            var textFile = /text.*/;
            var scope = this; // for anonymous funtion below that is not in the class component 
            if(file){
                if(file.type.match(textFile) && !file.type.match(/text\/javascript/)) // .js file is also considered a text file (try console.log(file.type));
                {
                    reader.onload = function (event) {
                        if(scope.varifyInputFile(event.target.result.split("\n"))){
                            scope.setState({
                                trees : event.target.result.split("\n"),    // loads data into state  
                                uploaded: true,                              // switch upload status -> also triggers the actual drawing of the tree
                                currLen : event.target.result.split("\n").length
                            });
                            scope.setState({currLen: event.target.result.split("\n").length}); 
                            // console.log(this.currFileLength);
                            scope.past = scope.state.currLen;
                        }
                        else{
                            console.log("bad input");
                            scope.forceUpdate();
                        }
                    }
                    this.CurrFile = file; // for refresh purposes
                    reader.readAsText(file);
                }
                else {
                    alert("Upload was not a .txt file");
                }
            }
        }
        else {
            alert("Your browswer is too old for HTML5 file uploads. Please update.");
        }
    }

    handleRefresh = async () =>{
        if(this.CurrFile!==null){
            var reader = new FileReader(); 
            var scope = this;
            reader.onload = function (event) {
                if(scope.varifyInputFile(event.target.result.split("\n"))){
                    scope.setState({
                        trees : event.target.result.split("\n"),    // loads data into state  
                        uploaded: true,                              // switch upload status -> also triggers the actual drawing of the tree
                        currLen : event.target.result.split("\n").length
                    });
                    scope.setState({currLen: event.target.result.split("\n").length}); 
                    scope.logDiffLength();
                    scope.past = scope.state.currLen;
                }
                else{
                    scope.forceUpdate();
                }
            }
            await reader.readAsText(this.CurrFile);
            // this.logging();
        }
        // window.setTimeout(3000);
    }

    logDiffLength=()=>{
        if(this.past !== this.state.currLen){
            if(this.past < this.state.currLen){
                alert(`New lines added to file.\nOld Length: ${this.past}\nNew Length: ${this.state.currLen}\nAdded ${this.state.currLen - this.past} new lines to the file.`);
            }
            else{
                alert(`Seems like you deleted some lines in your file! That doesn't seem right.\nPlease check your input file again`);
            }
        }
    }

    handleRelScalingChange = (ev)=> {
        this.setState({
            RelScaling: true, 
            Cladogram: false, 
            AbsScaling: false
        });
    }

    handleCladogramChange = (ev) => {
        this.setState({
            Cladogram : true,
            RelScaling: false,
            AbsScaling: false
        });
    }

    handleAbsScaling = (ev) => {
        this.setState({
            AbsScaling : true, 
            Cladogram: false,
            RelScaling: false
        })
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
            if( string.match(/(?=\D)(\w+)/g).length !== string.match(/(?=\D)(\w+)(:\s\d+\.\d+)/g).length ){
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
            <div style={{marginLeft:30, marginTop:15, marginRight:30}}>
                <Canvas received={this.state.uploaded} trees = {this.state.trees} clado = {this.state.Cladogram} relscal={this.state.RelScaling} refresh={this.handleRefresh}/>
                <label className="file-inp">
                    <input type ='file' onChange={this.handleUpload} />
                </label>
                <div className="scaling-btn-group">
                    <Checkbox text="Absolute Scaling" onChange={this.handleAbsScaling} checked={this.state.AbsScaling}/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                    <Checkbox text="Relative Scaling" onChange={this.handleRelScalingChange} checked={this.state.RelScaling} />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                    <Checkbox text="Cladogram" onChange={this.handleCladogramChange} checked={this.state.Cladogram} />
                </div>
                
            </div>
        )
    }

}

export default Home;
