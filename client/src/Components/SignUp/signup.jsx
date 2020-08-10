import React, { Component } from 'react'
import {NavLink,Redirect } from "react-router-dom";
import "./style.css";
import TextFieldComponent from "../TextFieldComponent/textfieldcomponent";
import Button from "@material-ui/core/Button";
import {post} from "../../api-handler"
class SignUp extends Component {
    state = { 
        FirstName:"",
        LastName:"",
        Email:"",
        Password:"",
        ConfirmPassword:"",
        LoginID:"",
        redirectToLogin:false
    }
    onSignUp=()=>{
        post('/signup',{
            first_name: this.state.FirstName,
            last_name:  this.state.LastName,
            password:   this.state.Password,
            email:      this.state.Email,
            login_id:   this.state.LoginID
        },()=>{
            this.setState({redirectToLogin:true})
        })
    }
    onChangeTextField=(field,value)=>{
        this.setState({
            [field]:value
        })
    }
    render() { 
        if(this.state.redirectToLogin) return <Redirect to="/login"/>
        return <div className="main-wrapper">
            <div style={{
            width:"43%",
            position:"absolute",
            left:"50%",
            transform:"translateX(-50%)"
            }}>
                <div className="login-header">Welcome To Web Coder</div>
                <form noValidate autoComplete="off" onSubmit={this.onSignUp}>
                    <TextFieldComponent
                        style={{    
                            position: "relative",
                            width:"300px",
                            left: "50%",
                            transform:" translateX(-50%)",
                            marginTop : "20px"
                        }}
                        label="First Name"
                        value={this.state.FirstName}
                        onChangeTextField={(value)=>this.onChangeTextField("FirstName",value)}
                    /> 
                    <TextFieldComponent
                        style={{    
                            position: "relative",
                            width:"300px",
                            left: "50%",
                            transform:" translateX(-50%)",
                            marginTop : "10px"
                        }}
                        label="Last Name"
                        value={this.state.LastName}
                        onChangeTextField={(value)=>this.onChangeTextField("LastName",value)}
                    /> 
                    <TextFieldComponent
                        style={{    
                            position: "relative",
                            width:"300px",
                            left: "50%",
                            transform:" translateX(-50%)",
                            marginTop : "10px"
                        }}
                        label="Email"
                        value={this.state.Email}
                        onChangeTextField={(value)=>this.onChangeTextField("Email",value)}
                    /> 
                    <TextFieldComponent
                        style={{    
                            position: "relative",
                            width:"300px",
                            left: "50%",
                            transform:" translateX(-50%)",
                            marginTop: "10px"
                        }}
                        label="Password"
                        type="password"
                        value={this.state.Password}
                        onChangeTextField={(value)=>this.onChangeTextField("Password",value)}

                    /> 
                    <TextFieldComponent
                        style={{    
                            position: "relative",
                            width:"300px",
                            left: "50%",
                            transform:" translateX(-50%)",
                            marginTop: "10px"
                        }}
                        label="Confirm Password"
                        type="ConfirmPassword"
                        value={this.state.ConfirmPassword}
                        onChangeTextField={(value)=>this.onChangeTextField("ConfirmPassword",value)}
                    /> 
                    <Button variant="contained" 
                        onClick={this.onSignUp}
                        style={{
                            position:"relative",
                            backgroundColor:"#F25F5C",
                            color:"#FFE066",
                            width:"300px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            marginTop:"10px",
                            height:"45px",
                            fontSize: "16px",
                            fontFamily: "Spartan"
                        }}
                    >
                            SIGN UP
                    </Button>
                </form>
                <div className="note">
                    Already have an account? <NavLink className="NavLink" to="/login">Log In</NavLink> .
                </div>
            </div>
        </div>;
    }
}

export default SignUp;