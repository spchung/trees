import React from 'react'

class Slide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.currTree,
            visualVal: props.currTree,
            maxLen: 500 
        }
        this.val=this.props.currTree;
    }
  
    handleChange = (event) => {
      this.setState( { value : parseInt(event.target.value,10)});
      console.log(this.val);
      this.onChange(this.state.value);
    }

    static getDerivedStateFromProps(props, state) {
      return {
        maxLen : props.treeLength
      }
    }

    conponentDidUpdate(){

      // calculate step here 


    }

    onChange = (i) => {
      this.props.onChange(i);
    }

    arrowKeyChange = (i) =>{
      this.setState({
        value: i
      })
    }


  render() {
    return (
      <div>
        <label>
          <input 
            className="slider"
            id="typeinp" 
            type="range" 
            min="0" max={this.state.maxLen} 
            value={this.state.value} 
            onChange={this.handleChange}
            step={50}/>
          {this.state.value}/{this.state.maxLen}
        </label>
      </div>
    );
  }
}

export default Slide;