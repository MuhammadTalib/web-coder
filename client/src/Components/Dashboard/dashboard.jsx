import React, { Component } from 'react';
import './style.css'
import { post,get } from '../../api-handler';
import { Redirect } from 'react-router-dom';
import io from "socket.io-client";
import Button from '@material-ui/core/Button';

class Dashboard extends Component {
    state={
        url:"",
        redirectToCodeShare:false,
        codes:[]
    }
    getCodesData=()=>{
        post('/yourcodeshares',{
            user:{_id:this.props.user._id}
        }).then((res)=>{
            this.setState({codes:res})
        })
    }
    componentDidMount(){
        this.socket = io.connect()
        this.getCodesData()
    }
    renderTableHeader = () => {
        return <tr>
            <td>URL</td>
            <td>Title</td>
            <td>Syntax</td>
            <td>ModifiedDate</td>
            <td>CreatedDate</td>
            <td>Action</td>
        </tr>
    }
    renderTableData = () => {
    return this.state.codes.map((data, index) => {
        var {URL, Title, Syntax, ModifiedDate, CreatedDate, _id} = data
        return  (
            <tr key = {index}>
                <td>{"/"+URL}</td>
                <td>{Title}</td>
                <td>{Syntax}</td>
                <td>{ModifiedDate}</td>
                <td>{CreatedDate}</td>
                <td> 
                    <Button variant="contained" 
                    onClick={()=>{
                        post('/deleteCode',{_id}).then((res)=>{
                            this.setState({codes:res})
                        })
                    }}
                    style={{
                        backgroundColor:"#F25F5C",
                        color:"white"
                    }}>
                        Delete
                    </Button>
                </td>
        </tr>
        )
        })
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
        if(this.state.redirectToCodeShare) return <Redirect to={"/code/"+this.state.url}/>
        return (
             <div className = "code-screen">
            <div className="codeshare-heading">
            <p>Your Codeshares</p>
            </div>
            <div className="codeshare-button">
                <button onClick={this.ShareCodeNow}>New Codeshare</button>
            </div>
            <table className = "data">
                <thead>
                    {this.renderTableHeader()}
                    
                </thead>
                <tbody>
                    {this.renderTableData()}
                </tbody>
            </table>
        </div> );
    }
}
 
export default Dashboard;