import React, {Component} from 'react';

class Button extends Component {
    constructor(props){
        super(props);
        // this.state
    }
    render(){
        const rovers = [...this.props.rovers]
        return(
            <div>
                <input type="image" width="100" height="100" src={rovers[0]}/>
            </div>
        )
    }
}

export default Button