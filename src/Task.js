import React, {Component} from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { NavBar } from './NavBar';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import config from './Config';

export class Task extends Component {

    constructor(props) {
        super(props);
        
        var userJson = localStorage.getItem("user");
        var user = JSON.parse(userJson);

        this.state = {
            user: user, 
            tasks: [],
            initialTasks: [],
            title: 'All Tasks'
        }
    }

    componentDidMount() {
        
        let status = this.props.match.params.status;
        this.getAllTasks();
      
    }


    getAllTasks = () => {
        axios.get(config.serverUrl + "/api/task/getall").then(response=> {
            this.setState({
                tasks: response.data,
                initialTasks: response.data
            })
        })
    }

    getTaskByStatus = (status) => {
        axios.get(config.serverUrl + "/api/task/getbystatus/" + status).then(response=> {
            this.setState({
                tasks: response.data
            })
        })
    }


    addTask =()=> {
        this.props.history.push("/add-task");
    }


    taskDetail =(id)=> {
        this.props.history.push("/task-detail/" + id);
    }

    onCategoryFilter = (category) => {

        let filteredTasks = this.state.initialTasks.filter(t => t.category.toLowerCase()
            .includes(category.toLowerCase()));
        
        if (category == 'All')
        {
            this.setState( {
                tasks: this.state.initialTasks,
                title: 'All Tasks'
            })
        }
        else {
            this.setState( {
                tasks: filteredTasks,
                title: category + 's'
            })
        }
    }


    onStatusFilter = (status) => {

        let filteredTasks = this.state.initialTasks.filter(t => t.status.toLowerCase()
            .includes(status.toLowerCase()));
        
        if (status == 'All')
        {
            this.setState( {
                tasks: this.state.initialTasks,
                title: 'All Tasks'
            })
        }
        else {
            this.setState( {
                tasks: filteredTasks,
                title: status + " Tasks"
            })
        }
    }

    
    onSearchChange = (e) => {

        let filteredTasks = this.state.initialTasks.filter(t => t.tracker.toLowerCase()
                .includes(e.target.value.toLowerCase()) ||
                t.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
                t.priority.toLowerCase().includes(e.target.value.toLowerCase()) ||
                t.assignee.toLowerCase().includes(e.target.value.toLowerCase())
            );
        
        if (e.target.value == '')
        {
            this.setState( {
                tasks: this.state.initialTasks
            })
        }
        else {
            this.setState( {
                tasks: filteredTasks
            })
    
        }
        
    }



    renderTracker = (category, tracker) => {
        if (category == 'Feature') {
            return(
                <span class="label label-success"><b>{tracker}</b></span>
            )
        } else if (category == 'Bug') {
            return(
                <span class="label label-danger"><b>{tracker}</b></span>
            )
        } else if (category == "Other") {
            return(
                <span class="label label-warning"><b>{tracker}</b></span>
            )
        }
    }



    render() {

        const fontStyle = {
            fontWeight:'normal'
        }
        
        const heightStyle = {
            minHeight: '959.8px'
        }

        const buttonStyle = {
            height: '34px'
        }

        return(

            <div class="wrapper">
                <Header 
                    history={this.props.history} 
                    user={this.state.user}
                />
                <NavBar/>

            <div class="content-wrapper" style={heightStyle}>
            
                <section class="content-header">
                <h1>
                    {this.state.title} ({this.state.tasks.length})
                </h1>
                <ol class="breadcrumb">
                    <button class="btn btn-primary" onClick={this.addTask}>Create New Task</button>
                </ol>
                </section>
                <br></br>

                <section class="content">
                
                <div class="row">
                   
                   <div class="col-md-12">
                       <div class="box box-default">
                       
                           
                           <div class="box-body">


                           <div class="btn-group">
                                <button class="btn btn-default" type="button">Task Category</button>
                                <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" style={buttonStyle}>
                                <span class="caret"></span>
                                
                                </button>
                                <ul class="dropdown-menu" role="menu">
                                    <li><a href="#" onClick={()=>this.onCategoryFilter("All")}>All</a></li>
                                    <li><a href="#" onClick={()=>this.onCategoryFilter("Feature")}>Feature</a></li>
                                    <li><a href="#" onClick={()=>this.onCategoryFilter("Bug")}>Bug</a></li>
                                    <li><a href="#" onClick={()=>this.onCategoryFilter("Other")}>Other</a></li>
                                    
                                </ul>
                            </div>
                            &nbsp; &nbsp;

                           <div class="btn-group">
                                <button class="btn btn-default" type="button">Task Status</button>
                                <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" style={buttonStyle}>
                                <span class="caret"></span>
                                
                                </button>
                                <ul class="dropdown-menu" role="menu">
                                    <li><a href="#" onClick={()=>this.onStatusFilter("All")}>All</a></li>
                                    <li><a href="#" onClick={()=>this.onStatusFilter("New")}>New</a></li>
                                    <li><a href="#" onClick={()=>this.onStatusFilter("Coding")}>Coding</a></li>
                                    <li><a href="#" onClick={()=>this.onStatusFilter("Resolved")}>Resolved</a></li>
                                    <li><a href="#" onClick={()=>this.onStatusFilter("Testing")}>Testing</a></li>
                                    <li><a href="#" onClick={()=>this.onStatusFilter("Rework")}>Rework</a></li>
                                    <li><a href="#" onClick={()=>this.onStatusFilter("Closed")}>Closed</a></li>
                                    
                                </ul>
                            </div>
                              
                               <div class="pull-right">
                                    <button class="btn btn-default" type="button" name="refresh" aria-label="refresh" title="Refresh"><i class="fa fa-refresh"></i></button>
                                    <button class="btn btn-default" type="button" name="advancedSearch" aria-label="advanced search" title="Advanced search"><i class="fa fa fa-search-plus"></i></button>
                                  
                                   
                                    <div class="export btn-group">
                                       <button class="btn btn-default" data-toggle="dropdown" type="button">
                                           <i class="fa fa-download"></i> 
                                        </button>
                                     </div>    
                                     
                                     
                               </div>
                               <div class="pull-right search">
                                   <input class="form-control" type="text" placeholder="Search" onChange={this.onSearchChange}/>
                               </div>
                               <br/><br/><br/>
                           
                        <div class="box-body table-responsive no-padding">
                        <table class="table table-hover">
                          <tbody>
                           <tr>
                            <th style={{width:'8%'}}><u>TRACKER</u></th>   
                            <th style={{width:'40%'}}><u>TITLE</u></th>
                            <th style={{width:'10%'}}><u>PRIORITY</u></th>
                           
                            <th style={{width:'10%'}}><u>ASSIGNEE</u></th>
                            <th style={{width:'8%'}}><u>STATUS</u></th>
                            <th style={{width:'12%'}}><u>CREATED DATE</u></th>   
                            
                          </tr>
                        
                         {this.state.tasks.map(t=>
                          <tr style={fontStyle}>
                              <td>
                                {this.renderTracker(t.category, t.tracker)}
                              </td>
                              <td><a href="#" onClick={()=>this.taskDetail(t.id)}>{t.title}</a></td>
                              <td>{t.priority}</td>
                              <td>{t.assignee}</td>
                              <td>{t.status}</td>
                              <td>{moment(t.createdDate).format("MM/DD/YYYY hh:mm:ss")}</td>
                          </tr>
                          )}
                       
                        </tbody></table>
               
                      </div>


 
                           </div>
                       </div>
                   </div>
               </div>



                    

                </section>

            </div>

            <Footer/>

            </div>
        )
    }

}