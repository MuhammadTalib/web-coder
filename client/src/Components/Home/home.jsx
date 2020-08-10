import React, { Component } from 'react';
import "./style.css"
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { post } from '../../api-handler';
import {Redirect} from "react-router-dom"
import io from "socket.io-client";

class Home extends Component {
    state = { 
        url:"",
        redirectToCodeShare:false
    }
    componentDidMount(){
        this.socket = io.connect()

    }
    ShareCodeNow=()=>{
        post('/newcodeshare',{userId:this.props.user._id}).then((res)=>{
            this.setState({
                url:res.code.URL,
                redirectToCodeShare:true
            })
            this.socket.emit('roomcreated',res.code.URL)
        })
    }
    render() { 
        if(this.state.redirectToCodeShare) return <Redirect to={"/code/"+this.state.url} />
        return ( <div className="main-wrapper">
        <div className="main-header">Share Your Code Live With Developers</div>
        <div className="sub-header">An Online Code editor for interviews, troubleshooting, teaching & more ...</div>
        <Button 
            variant="contained" 
            className="share-btn"
            onClick={this.ShareCodeNow}>Share Code Now</Button>

            <Grid container justify="center" className="desc-grid">
                <Grid item>
                    <Paper className="desc-paper">
                        <div className="paper-header">Code with your team</div>
                        <div className="paper-desc">
                            Open a Codeshare editor, write or copy code, then share it with friends and colleagues. Pair program and troubleshoot together.
                        </div>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className="desc-paper">
                        <div className="paper-header">Interview developers</div>
                        <div className="paper-desc">
                            Set coding tasks and observe in real-time when interviewing remotely or in person. Nobody likes writing code on a whiteboard.
                        </div>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className="desc-paper">
                        <div className="paper-header">Teach people to program</div>
                        <div className="paper-desc">
                            Share your code with students and peers then educate them. Universities and colleges around the world use Codeshare every day.
                        </div>
                    </Paper>
                </Grid>
            </Grid>
            <div className="bottom-desc">
                Created by Muhammad Talib Waseem. For help and support shoot us an email.
            </div>
    </div> );
    }
}
 
export default Home;