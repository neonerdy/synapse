
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import config from './Config';
import moment from 'moment';


export class Header extends Component {


    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            histories: []
        }
    }

    componentDidMount() {
        this.getMyTasks(this.props.user.id);
        this.getHistoryByUserId(this.props.user.id);

        this.getHistoryByUserId(this.props.user.id);
    }


    getMyTasks = (userId) => {
        axios.get(config.serverUrl + "/api/task/getmytask/" + userId).then(response=> {
            this.setState({
                tasks: response.data,
            })
        })
    }


    getMyTaskByProject = (userId, projectId) => {
        axios.get(config.serverUrl + "/api/task/getmytaskbyproject/" + userId + "/" + projectId).then(response=> {
            this.setState({
                tasks: response.data,
            })
        })
    }


    getHistoryByUserId =(id) => {
        axios.get(config.serverUrl + "/api/history/getbyuserid/" + id).then(response=> {
            this.setState({
                histories: response.data,
            })
            console.log(response.data);
        })
    }

    taskDetail = (id) => {
        this.props.history.push("/task-detail/" + id);
    }


    logout=()=> {
        localStorage.removeItem("user");
        this.props.history.push("/");
    }


    renderDate = (date) => {
      
        const today = new Date
        const yesterday = new Date; 

        yesterday.setDate(today.getDate() - 1)
        
        let d = moment(date).format('MM/DD/YYYY'); 
        let t = moment(date).format('MM/DD/YYYY');
        let ht =  moment(date).format('hh:mm');
        let hy = moment(yesterday).format('hh:mm');

        if(d == t) {
            return (
                <span>Today {ht}</span>
            )
        } else if (date == yesterday) {
            return (
                <span>Yesterday {hy}</span>
            )
        } else {
            return(
                <span>{moment(date).format('MM/DD/YYYY hh:mm')}</span>
            )
        }
      
    }

    renderPhoto = (photo) => {

        let userPhoto = '/SynapseAPI/Resources/' + photo;

        return(
            <img src={userPhoto} class="img-circle"/>
        )
    }

    renderMyTaskTitle = (task) => {
        if (task.title.length > 25) {
            return(
                <span>{task.tracker} {task.title.substring(0,25)}...</span>
            )
        } else {
            return(
                <span>{task.tracker} {task.title}</span>
            )
        }
    }

    renderMyTaskProgress = (task) => {

        let progress = Math.ceil((task.totalTimeSpentInHour/task.estimationInHour) * 100) + '%';

        console.log("p=" + progress);
        console.log(task.category);

        if (task.category == 'Feature') {
            return(
                <div class="progress-bar progress-bar-red" style={{width: progress}} role="progressbar" aria-valuemin="0" aria-valuemax="100"/>
            )
        } else if (task.category == 'Bug') {
            return(
                <div class="progress-bar progress-bar-green" style={{width: progress}} role="progressbar" aria-valuemin="0" aria-valuemax="100"/>
            )
        } else if (task.category == 'Other') {
            return(
                <div class="progress-bar progress-bar-yellow" style={{width: progress}} role="progressbar" aria-valuemin="0" aria-valuemax="100"/>
            )        
        }
       
    }


    render() {


       let avatar = '/SynapseAPI/Resources/' + this.props.user.photo;
   
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
                        

                    <li class="dropdown messages-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                        <i class="fa fa-bell-o"></i>
                        <span class="label label-danger">{this.state.histories.length}</span>
                        </a>
                        <ul class="dropdown-menu">
                        <li class="header">You have {this.state.histories.length} notifications</li>
                        <li>
                            <ul class="menu">
                                {this.state.histories.map(h=> 
                                <li>
                                    <a href="#">
                                    <div class="pull-left">
                                        {this.renderPhoto(h.userPhoto)}
                                    </div>
                                    <h4>
                                        {h.tracker}
                                        <small><i class="fa fa-clock-o"></i>&nbsp;{this.renderDate(h.date)}</small>
                                    </h4>
                                    <p>{h.user} {h.activityLog}</p>
                                    </a>
                                </li>
                                )}
                                
                           
                            </ul>
                        </li>
                        </ul>
                    </li>

                  
                    <li class="dropdown tasks-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                        <i class="fa fa-flag-o"></i>
                        <span class="label label-danger">{this.state.tasks.length}</span>
                        </a>
                        <ul class="dropdown-menu">
                        <li class="header">You have {this.state.tasks.length} tasks waiting</li>
                        <li>
                            <ul class="menu">
                            
                            {this.state.tasks.map(t=> 
                                <li>
                                    <a href="#!" onClick={()=>this.taskDetail(t.id)}>
                                    <h3>
                                        {this.renderMyTaskTitle(t)}
                                        <small class="pull-right">{Math.ceil((t.totalTimeSpentInHour/t.estimationInHour) * 100)}%</small>
                                    </h3>
                                    <div class="progress xs">
                                        {this.renderMyTaskProgress(t)}
                                    </div>

                                    </a>
                                </li>
                            )}

                          </ul>
                        </li>
                       
                        </ul>
                    </li>

                   


                        <li class="dropdown user user-menu">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <span class="hidden-xs">{this.props.user.fullName}</span>
                            </a>
                            <ul class="dropdown-menu">
                            <li class="user-header">
                                
                                <img src={avatar} class="img-circle"/>

                                <p>
                                {this.props.user.fullName} - {this.props.user.role}
                                <small>{this.props.user.email}</small>
                                </p>
                            </li>
                            
                            <li class="user-footer">
                              
                                <div class="pull-left">
                                    <a href="#" class="btn btn-default btn-flat" data-toggle="modal" data-target="#editPhoto">Change Photo</a>
                                </div>
                              
                                <div class="pull-right">
                                    <a href="#" onClick= {this.logout} class="btn btn-default btn-flat">Sign out</a>
                                </div>
                            </li>
                            </ul>
                        </li>

                        <li>
                        <a href="#" data-toggle="modal" data-target="#updateSetting"><i class="fa fa-gears"></i></a>
                    </li>

                      

                        </ul>
                    </div>
                    </nav>


       


                </header>

         

      
        )
    }

}