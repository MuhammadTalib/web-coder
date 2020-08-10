import React,{ Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage/loginPage";
import NavigationBar from './Components/NavigationBar/navigation-bar';
import SignUp from "./Components/SignUp/signup"
import Dashboard from './Components/Dashboard/dashboard';
import Home from "./Components/Home/home"
import CodeShareScreen from './Components/CodeShare/codeshare';

class App extends Component {
  state = { login:false,user:{} }
  componentDidMount(){
    var user=JSON.parse(localStorage.getItem("userData"))
    if(user) this.setState({login:true,user:user})
  }
  render() { 
    return ( <div className="app-main-div">
    <BrowserRouter>
      <NavigationBar login={this.state.login} logout={()=>{
        this.setState({login:false})
        localStorage.clear()
      }}></NavigationBar>
      <Route 
        exact path="/" 
        render={(props) => <Home {...props} user={this.state.user} />}   
      />
      <Route 
        exact path="/login" 
        render={(props) => <LoginPage {...props} loginTrue={()=>{this.setState({login:true})}} />}  
      />
      <Route 
        path="/signup"
        render={(props) => <SignUp {...props} user={this.state.user} />}
      />
      <Route 
        path="/codes" 
        render={(props) => <Dashboard {...props} user={this.state.user} />} 
      />
      <Route path="/code/:id" children={<CodeShareScreen />} />
    </BrowserRouter>
  
  </div> );
  }
}
 
export default App;
