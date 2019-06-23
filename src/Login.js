
import React, {Component} from 'react';
import axios from 'axios';
import config from './Config';

export class Login extends Component
{


    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login =() => {

       
         var people = {
             UserName: this.state.username,
             Password: this.state.password
         }
      
         console.log(people);

         axios.post(config.serverUrl + "/api/people/login",people).then(response=>{
            var result = response.data;
          
            if (result != "") {
                localStorage.setItem("user", JSON.stringify(result));
                this.props.history.push("/dashboard");
            }

         })
           

    }


    render() {
        return(
          
            <div>

                <div class="login-box">
                    <div class="login-logo">
                    
                    </div>
                    <div class="login-box-body">
                       
                        <p class="login-box-msg">

                            <h1>TASK MASTER</h1>
                            <p>Web Issue Tracker Version 1.0</p>

                        </p>
                        <br/>
                        <div class="form-group has-feedback">
                            <input type="text" name="username" onChange={this.onValueChange} class="form-control" placeholder="User Name"/>
                            <span class="glyphicon glyphicon-user form-control-feedback"></span>
                        </div>
                        <div class="form-group has-feedback">
                            <input type="password" name="password" onChange={this.onValueChange} class="form-control" placeholder="Password"/>
                            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                        </div>
                        <br/><br/>
                        <div clas="row">
                    
                            <button type="button" onClick={this.login} class="btn btn-primary btn-block btn-flat">Sign In</button>
                        </div>
        
        
                    </div>
                </div>
         </div>
          
        )
    }



}