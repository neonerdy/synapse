
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import config from './Config';


export class Header extends Component {


    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        }
    }

    componentDidMount() {
        this.getMyTasks(this.props.user.id);
    }


    getMyTasks = (id) => {
        axios.get(config.serverUrl + "/api/task/getmytask/" + id).then(response=> {
            this.setState({
                tasks: response.data,
            })
        })
    }

    taskDetail = (id) => {
        this.props.history.push("/task-detail/" + id);
    }


    logout=()=> {
        localStorage.removeItem("user");
        this.props.history.push("/");
    }

    render() {

        return(
                  <header class="main-header">
                   
                    <nav class="navbar navbar-static-top">
                    <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span class="sr-only">Toggle navigation</span>
                    </a>

                    
    
                    <Link to="/dashboard" class="logo">
                        <span class="logo-mini">TM</span>
                        <span class="logo-lg">Task Master</span>
                    </Link>

                    <div class="navbar-custom-menu">
                        <ul class="nav navbar-nav">
                        

                  
                        <li class="dropdown notifications-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                            <i class="fa fa-bell-o"></i>
                            <span class="label label-warning">{this.state.tasks.length}</span>
                        </a>
                        <ul class="dropdown-menu">
                            <li class="header"><b>You have {this.state.tasks.length} notifications</b></li>
                            <li>
                            <ul class="menu">

                              {this.state.tasks.map(t=> 
                                <li>
                                    <a href="#!" onClick={()=>this.taskDetail(t.id)}>{t.tracker}&nbsp;&nbsp;{t.title}</a>   
                                </li>
                            )}
                               

                          
                            </ul>
                            </li>
                           
                        </ul>
                        </li>


                        <li class="dropdown tasks-menu open">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                            <i class="fa fa-flag-o"></i>
                            <span class="label label-danger">9</span>
                            </a>
                            
                        </li>


                        <li class="dropdown user user-menu">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <span class="hidden-xs">{this.props.user.fullName}</span>
                            </a>
                            <ul class="dropdown-menu">
                            <li class="user-header">
                                <p>
                                {this.props.user.fullName} - {this.props.user.role}
                                <small>{this.props.user.email}</small>
                                </p>
                            </li>
                            
                            <li class="user-footer">
                                <div class="pull-left">
                                <a href="#" class="btn btn-default btn-flat">My Task</a>
                                </div>
                                <div class="pull-right">
                                <a href="#" onClick= {this.logout} class="btn btn-default btn-flat">Sign out</a>
                                </div>
                            </li>
                            </ul>
                        </li>

                        <li>
                            <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
                        </li>

                        </ul>
                    </div>
                    </nav>
                </header>
      
        )
    }

}