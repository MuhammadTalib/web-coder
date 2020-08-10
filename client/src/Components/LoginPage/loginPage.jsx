import React, { Component } from 'react';
import "./style.css";
import TextFieldComponent from "../TextFieldComponent/textfieldcomponent";
import Button from "@material-ui/core/Button";
import {NavLink, Redirect } from "react-router-dom";
import { post } from '../../api-handler';
class LoginPage extends Component {
    state = { 
        email:"",
        password:"",
        redirectToDashboard:false
    }
    onChangeTextField=(field,value)=>{
        this.setState({
            [field]:value
        })
    }
    Login=()=>{
        post('/login',{
            email:this.state.email,
            password:this.state.password
        },()=>{
            this.setState({redirectToDashboard:true})
            this.props.loginTrue()
        }).then((res)=>{
            localStorage.setItem("userData",JSON.stringify(res.user))
        })
    }
    render() { 
        if(this.state.redirectToDashboard) return <Redirect to="/codes"/>
        return <div className="main-wrapper">
            <div style={{
            width:"754px",
            position:"absolute",
            left:"50%",
            transform:"translateX(-50%)"
        }}>
            <div className="login-header">Log in to Access Web Coder</div>
            <TextFieldComponent
                style={{    
                    position: "absolute",
                    left: "50%",
                    transform:" translateX(-50%)",
                    marginTop : "100px"
                }}
                label="Email"
                value={this.state.email}
                onChangeTextField={(value)=>this.onChangeTextField("email",value)}
            /> 
            <TextFieldComponent
                style={{    
                    position: "relative",
                    left: "50%",
                    transform:" translateX(-50%)",
                    marginTop: "180px"
                }}
                label="Password"
                type="password"
                value={this.state.password}
                onChangeTextField={(value)=>this.onChangeTextField("password",value)}

            /> 
            <Button variant="contained" 
            onClick={this.Login}
            style={{
                position:"relative",
                backgroundColor:"#F25F5C",
                color:"#FFE066",
                width: "378px",
                left: "50%",
                transform: "translateX(-50%)",
                marginTop:"20px",
                height:"45px",
                fontSize: "16px",
                fontFamily: "Spartan"
            }}>Log In</Button>
            <div className="note">New to WebCoder? <NavLink className="NavLink" to="/signup">Register Here</NavLink> .</div>
            <div className="note"><NavLink to="/signup" className="NavLink">Forgot Your Password?</NavLink></div>        
            </div>
        </div>

    }
}
 
export default LoginPage;