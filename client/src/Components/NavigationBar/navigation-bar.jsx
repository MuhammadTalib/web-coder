import React, { Component } from 'react';
import "./style.css"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link,Redirect} from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';

class NavigationBar extends Component {
    
    state={
        openDialog:false,
        rediectToHome:false
    }
    

    render() { 
        if(this.state.rediectToHome) return <Redirect to="/"/>
        return ( 
            <AppBar>
                <Toolbar className="toolbar-style">
                    <Typography variant="h6" className="main-heading" component={Link} to="/" style={{textDecoration:"none",color:"white"}}>
                        Web Coder
                    </Typography>
                    
                    <Button 
                        color="inherit" 
                        className="share1-btn btn login-btn"
                        style={{
                            border : "1px solid white",
                            marginRight: "30px"
                        }}
                        onClick={()=>{
                            this.setState({openDialog:true})
                        }}
                        >
                            Share
                    </Button>
                    {this.props.login ?
                        <React.Fragment>
                            <Button 
                                color="inherit" 
                                className="btn"
                                style={{
                                    marginLeft:"200px"
                                }}
                                onClick={()=>{
                                    this.props.logout()
                                    this.setState({rediectToHome:true})
                                }}
                                >
                                    Logout
                            </Button>

                        </React.Fragment>:
                        <React.Fragment>
                            <Button 
                                color="inherit" 
                                className="btn"
                                style={{
                                    marginLeft:"200px"
                                }}
                                component={Link} to="/signup">
                                    Sign Up
                            </Button>

                            <Button 
                                color="inherit" 
                                className="btn login-btn"
                                component={Link} to="/login">
                                    Login
                            </Button>
                        </React.Fragment>
                    } 
                </Toolbar>

                <Dialog onClose={()=>{
                    this.setState({openDialog:false})
                }}  fullWidth={true} maxWidth={"md"} 
                aria-labelledby="simple-dialog-title" 
                open={this.state.openDialog}>
                    <div className="dialog-title">Anyone with access to this URL will see your code in real time.</div>
                    <div className="url-web">{window.location.href}</div>
                </Dialog>

            </AppBar>
         );
    }
}
 
export default NavigationBar;