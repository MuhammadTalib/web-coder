import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import "./style.css"
import RightBar from '../RightBar/RightBar';
import io from "socket.io-client";

class CodeShareScreen extends Component {
    
    componentDidMount(){
        this.socket = io.connect()
        let id = this.props.match.params.id;
        this.setState({url:id})
        this.socket.emit('join',id)
        this.socket.on('changecode',(code)=>{
            if(this.state.code!==code) this.setState({code:code})
        })
    }
    state = { 
        code:"",
        url:""
    }
    render() { 
        return ( <div className="codeshatre-main-wrapper">
            <textarea 
                className="code-text" 
                name="w3review" rows="4" cols="50" 
                value={this.state.code}
                onChange={(e)=>{
                    this.setState({code:e.target.value})
                    this.socket.emit('changecode',{room:this.state.url,code:e.target.value})
                }}
                placeholder="Write or paste code here then share. Anyone you share with will see code as it is typed!">
            </textarea>
            <RightBar/>
        </div> );
    }
}
 
export default withRouter(CodeShareScreen);