import React from 'react'

class Slide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.currTree,
            maxLen: 500
        }
        this.val=this.props.currTree;
        this.step=50;
    }
  
    handleChange = (event) => {
      this.setState( { value : parseInt(event.target.value,10)});
      this.onChange(this.state.value);
    }

    static getDerivedStateFromProps(props, state) {
      return {
        maxLen : props.treeLength
      }
    }

    onChange = (i) => {
      this.props.onChange(i);
    }

    componentDidMount(){
      this.setState({value:0});
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
          <div style={{textAlign:'right'}}>
            {this.state.value}/{this.state.maxLen}
          </div>
          <input 
            className="slider"
            id="typeinp" 
            type="range" 
            min="0" max={this.state.maxLen} 
            value={this.state.value} 
            onChange={this.handleChange}
            step={1}/>
        </label>
      </div>
    );
  }
}

/* The step of this slider might cause app to slow down when dragging quickly */

export default Slide;