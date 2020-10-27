import React, { Component } from 'react';
import Technician from './Technician';

class test extends Component {
    state={
        count: 0
    }
  interval=underfined
    clickHandler=()=> {  this.setState({count: this.state.count+1})

    }

    decrementinClickHandler =()=> {
        this.setState({count: this.state.count-1})
    }

    resetHandler = () => {
        this.setState({count: 0})
    }
componentDidMount(){
   this.interval= setInterval(()=>this.setState({count: this.state.count+1}), 1000)
}

componentWillUnmount(){
    clearInterval(this.inteval)
}

    render() {
        return (
            <div>
                <p>Counting: {this.state.count}</p>
                <button onClick={ this.clickHandler }>Increement</button>
                <button onClick={this.decrementinClickHandler}>Decrement</button>
                <button onClick={this.resetHandler}> Reset </button>
            </div>
        );
    }
}

export default test;
