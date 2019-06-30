import React, {Component} from 'react';
import { Header } from './Header';
import { NavBar } from './NavBar';
import { Footer } from './Footer';

import axios from 'axios';
import config from './Config';
import moment from 'moment';

export class TaskDetail extends Component
{
    constructor(props) {
        super(props);

        var userJson = localStorage.getItem("user");
        var user = JSON.parse(userJson);

        this.closeBtn = React.createRef();
        this.loggedDateText = React.createRef();

        this.state = {
            user: user,
            id: '',
            project: '',
            tracker: '',
            category: '',
            title: '',
            priority: '',
            reporter: '',
            assignee: '',
            tester: '',
            module: '',
            platform: '',
            version: '',
            createdDate: '',
            modifiedDate: '',
            closedDate: '',
            status: '',
            description: '',
            comments: [],
            histories: [],
            commentId: '',
            message: '',
            workLogs: [],
            loggedDate: moment(Date.now()).format("MM/DD/YYYY"),
            timeSpent: '',
            unit: '',
        }
    }

    componentDidMount() {

        let id = this.props.match.params.id;
        this.getTaskById(id);
        this.getCommentByTaskId(id);
        this.getHistoriesByTaskId(id);
        this.getWorkLogByTaskId(id);

    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onLoggedDateChange = (e) => {
        this.setState({
            loggedDate : e.target.value
        })
    }

    onTimeSpentChange = (e) => {
        this.setState({
            timeSpent : e.target.value
        })
    }


    getTaskById = (id) => {
        axios.get(config.serverUrl + "/api/task/getbyid/" + id).then(response=> {
            this.setState({
                id: response.data.id,
                project: response.data.project.projectName,
                category: response.data.category,
                tracker: response.data.tracker,
                title: response.data.title,
                priority: response.data.priority,
                reporter: response.data.reporter.fullName,
                assignee: response.data.assignee.fullName,
                tester: response.data.tester.fullName,
                module: response.data.module,
                platform: response.data.platform,
                version: response.data.version,
                createdDate: response.data.createdDate,
                modifiedDate: response.data.modifiedDate,
                closedDate: response.data.closedDate,
                status: response.data.status,
                description: response.data.description
            })
      })
        
    }

    getCommentByTaskId = (id) => {
        axios.get(config.serverUrl + "/api/comment/getbytaskid/" + id).then(response=> {
            this.setState({
                comments: response.data
            })
        })
    }

    getHistoriesByTaskId = (id) => {
        axios.get(config.serverUrl + "/api/history/getbytaskid/" + id).then(response=> {
            this.setState({
                histories: response.data
            })
        })
    }

    getWorkLogByTaskId = (id) => {
        axios.get(config.serverUrl + "/api/worklog/getbytaskid/" + id).then(response=> {
            this.setState({
                workLogs: response.data
            })
        })
    }


    updateStatus = (status) => {

        let id = this.props.match.params.id;
        axios.get(config.serverUrl + "/api/task/updatestatus/" + id + "/" + status + "/" + this.state.user.fullName).then(response=> {
            this.getTaskById(id);
            this.getHistoriesByTaskId(id);
        })
    }

    assignedTaskToMe = () => {

        let id = this.props.match.params.id;
        let userId = this.state.user.id;

        axios.get(config.serverUrl + "/api/task/assignedtasktome/" + id + "/" + userId).then(response=> {
            this.getTaskById(id);
        })
    }


    assignedTesterToMe = () => {

        let id = this.props.match.params.id;
        let userId = this.state.user.id;

        axios.get(config.serverUrl + "/api/task/assignedtestertome/" + id + "/" + userId).then(response=> {
            this.getTaskById(id);
        })
    }


    addTask =()=> {
        this.props.history.push("/add-task");
    }

    editTask = (id) => {
        this.props.history.push("/edit-task/" + id);
    }

    refreshTask = (id) => {
        this.getTaskById(id);
        this.getCommentByTaskId(id);
        this.getHistoriesByTaskId(id);
    }

    deleteTask = (id) => {
        axios.delete(config.serverUrl + "/api/task/delete/" + id).then(response=> {
            this.closeBtn.current.click();
            this.props.history.push("/task");
        })
    }


    saveComment = () => {

        var comment = {
            taskId : this.state.id,
            commenterId: this.state.user.id,
            message: this.state.message
        }

        axios.post(config.serverUrl + "/api/comment/save", comment).then(response=> {
            this.getCommentByTaskId(this.state.id);
        })
    }

    editComment = (id) => {
                
        axios.get(config.serverUrl + "/api/comment/getbyid/" + id).then(response=> {
            this.setState({
                commentId: response.data.id,
                message: response.data.message
            })

        })
 
    }

    updateComment = () => {
        var comment = {
            id: this.state.commentId,
            taskId: this.state.id,
            commenterId: this.state.user.id,
            message: this.state.message,
            createdDate: this.state.createdDate
        }
        axios.put(config.serverUrl + "/api/comment/update", comment).then(response=> {
            this.getCommentByTaskId(this.state.id);
        })
    }



    deleteComment = (id) => {
        axios.delete(config.serverUrl + "/api/comment/delete/" + id).then(response=> {
            this.getCommentByTaskId(this.state.id);
        })
    }



    saveWorkLog = () => {

        let workLog = {
            taskId: this.state.id,
            loggedDate: this.loggedDateText.current.value,
            userId: this.state.user.id,
            timeSpent: this.state.timeSpent,
            unit: this.state.unit
        }
              
        console.log(workLog);

        axios.post(config.serverUrl + "/api/worklog/save", workLog).then(response=> {
            this.getWorkLogByTaskId(this.state.id);
        })
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



    renderStatus = (status) => {
        if (status == "New") {
            return(
                <i class="fa fa-circle-o text-blue"></i>
            )
        }else if (status == "Coding") {
            return(
                <i class="fa fa-circle-o text-orange"></i>
            )
        } else if (status == "Resolved") {
            return(
                <i class="fa fa-circle-o text-green"></i>
            )
        } else if (status == "Testing") {
            return(
                <i class="fa fa-circle-o text-purple"></i>
            )
        } else if (status == "Rework") {
            return(
                <i class="fa fa-circle-o text-maroon"></i>
            )
        } else if (status == "Closed") {
            return(
                <i class="fa fa-circle-o text-aqua"></i>
            )
        }
    }


    render() {

        const heightStyle = {
            minHeight: '959.8px'
        }

        const buttonStyle = {
            height: '34px'
        }

        const fontStyle = {
            fontWeight: 'normal'
        }

        const popupStyle = {
            width: '800px'
        }

        const attachmentStyle = {
            width: '470px'
        }

        const modalStyle = {
            width: '500px'
        }

        const barStyle = {
            display:'none'
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
                    <br/>
                    <h1>
                        Task Detail
                    </h1>
                    <ol class="breadcrumb">
                        <button class="btn btn-primary" onClick={this.addTask}>Create New Task</button>
                    </ol>
                    </section>
                  
                    <section class="content">


                   <div id="addComment" class="modal fade" role="dialog">
                        <div class="modal-dialog" style={popupStyle}>
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    <h4 class="modal-title">Add Comment</h4>
                                </div>
                                <div class="modal-body">
                                    
                                <textarea class="form-control" rows="8" name="message" onChange={this.onValueChange}></textarea>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" onClick={this.saveComment} data-dismiss="modal">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="editComment" class="modal fade" role="dialog">
                        <div class="modal-dialog" style={popupStyle}>
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    <h4 class="modal-title">Edit Comment</h4>
                                </div>
                                <div class="modal-body">
                                <input type="text" name="id" value={this.state.commentId} onChange={this.onValueChange}/>    
                                <textarea class="form-control" rows="8" name="message" 
                                    onChange={this.onValueChange} value={this.state.message}></textarea>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" onClick={this.updateComment} data-dismiss="modal">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>

                        {/*}
                      <div id="addAttachment" class="modal fade" role="dialog">
                        <div class="modal-dialog" style={modalStyle}>
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    <h4 class="modal-title">Attachment</h4>
                                </div>
                                <div class="addAttachment-ui">
                                    
                                    <form action="/workitem/upload" name="fileUpload" method="post" enctype="multipart/form-data">
                                        <div class="modal-body row">
                                        <div class="col-md-12">
                                                <div id="divFile" class="form-group">
                                                        <input type="file" class="btn btn-default" name="uploadfile" id="myFile" style={attachmentStyle}/>
                                                </div>
                                            </div>
                                            
                                            <div class="col-md-12">
                                                <div class="progress" style={barStyle}>
                                                    <div class="progress-bar progress-bar active" role="progressbar" aria-valuemin="0" aria-valuemax="100">0%</div>
                                                </div>
                                            </div>
                                            <div id="errorAddAttachment" class="form-group col-md-12"></div>     
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary" id="btnUpload">Upload</button>
                                        </div>
                                    </form>
                                

                                </div>
                            </div>
                        </div>
                </div>

                {*/}


                <div id="addWorkLog" class="modal fade" role="dialog">
                        <div class="modal-dialog" style={{width: '350px'}}>
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    <h4 class="modal-title">Add Work Log</h4>
                                </div>
                                <div class="addWorkLog-ui">

                                        <div class="modal-body row">
                                            <input type="hidden" name="id" value=""/>
                                    
                                            <div class="col-md-12">
                                                    <div class="form-group">
                                                            
                                                        <label style={{fontWeight:'normal'}}>Date</label>
                                                        <span class="input-group-btn">
                                                            <div class="input-group date" data-provide="datepicker" data-date-autoclose="true" data-date-today-highlight="true">
                                                                <input type="text" name="loggedDate" class="form-control" style={{width: '280px'}} 
                                                                    ref={this.loggedDateText}/>
                                                                <div class="input-group-addon">
                                                                    <span class="fa fa-calendar"></span>
                                                                </div>
                                                            </div>
                                            
                                                        </span>
                                                    </div>
                                            </div>
                                        
                                            <div class="col-md-6">
                                                    <div id="divAddTimeSpent" class="form-group">
                                                        <label style={{fontWeight:'normal'}}>Time Spent</label> 
                                                        <input type="text" class="form-control" name="timeSpent" onChange={this.onTimeSpentChange} value={this.state.timeSpent} style={{fontWeight:'normal'}}/>                                                                                                      
                                                    </div>
                                                </div>
                                    
                                            <div class="col-md-6">
                                                <div id="divAddUnit" class="form-group">
                                                    <label style={{fontWeight:'normal'}}>Unit</label> 
                                                        <select class="form-control" name="unit" onChange={this.onValueChange} value={this.state.unit} style={{fontWeight:'normal'}}>
                                                            <option value="-1"></option>
                                                            <option value="Hour">Hour</option>
                                                            <option value="Day">Day</option>
                                                        </select>                                                                                                      
                                                </div>
                                            </div>                                    
                                            <div id="errorAddWorkLog" class="form-group col-md-12"></div>                                   
                                        </div>
                                    
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.saveWorkLog}>Save Work Log</button>
                                        </div>
                                        
                             
                                </div>
                            </div>
                        </div>
                </div>
                

                <div id="deleteTask" class="modal fade">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    <h4 class="modal-title">Delete</h4>
                                </div>
                                <div class="modal-body">
                                    Are you sure want to delete this task?
                                </div>
                                
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default pull-left"  data-dismiss="modal" ref={this.closeBtn}>Close</button>
                                    <button type="button" class="btn btn-danger" onClick={()=>this.deleteTask(this.state.id)}>Yes</button>
                                </div>
                                

                            </div>
                        </div>
                </div>



                
                        <div class="row">
                        
                            <div class="col-md-12">
                                <div class="box box-default">
                                    <br/>
                                    <div class="box-header with-border">
                                        <h3 class="box-title">{this.renderTracker(this.state.category, this.state.tracker)}&nbsp;&nbsp;{this.state.title}</h3>
                                        
                                     </div>

                                    <section class="content">


                                    <div class="pull-right">
                                      <button class="btn btn-default" type="button" onClick={()=>this.editTask(this.state.id)}><i class="fa fa-pencil-square-o"></i>
                                            &nbsp;Edit
                                        </button>
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-default" data-toggle="modal" data-target="#addComment">Comment</button>
                                            
                                            {/*}
                                            <button type="button" class="btn btn-default" data-toggle="modal" data-target="#addAttachment">Attachment</button>
                                            {*/}
                                            
                                            <button type="button" class="btn btn-default" data-toggle="modal" data-target="#addWorkLog">Work Log</button>
                                               
                                        </div>
                                        <div class="btn-group">
                                            <button class="btn btn-default" style={buttonStyle} type="button" onClick={this.refreshTask}><i class="fa fa-refresh"></i></button>    
                                            <button class="btn btn-default" style={buttonStyle} type="button" data-toggle="modal" data-target="#deleteTask">
                                                    <i class="fa fa-trash-o"></i>
                                            </button>
                                            
                                        </div>
                                        <div class="btn-group">
                                                <button class="btn btn-default" type="button">Update Status</button>
                                                <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" style={buttonStyle}>
                                                    <span class="caret"></span>
                                                
                                                </button>
                                                <ul class="dropdown-menu" role="menu">
                                                    <li><a href="#" onClick={()=>this.updateStatus("New")}>New</a></li>
                                                    <li><a href="#" onClick={()=>this.updateStatus("Coding")}>Coding</a></li>
                                                    <li><a href="#" onClick={()=>this.updateStatus("Resolved")}>Resolved</a></li>
                                                    <li><a href="#" onClick={()=>this.updateStatus("Testing")}>Testing</a></li>
                                                    <li><a href="#" onClick={()=>this.updateStatus("Rework")}>Rework</a></li>
                                                    <li><a href="#" onClick={()=>this.updateStatus("Closed")}>Closed</a></li>
                                                    
                                                </ul>
                                        </div>
                                        </div>

                                        <br/><br/>

                             
                          
                            <section class="content">
             
                                <div class = "row">
                                    <div class="col-md-6">
                                        <div class="row">
                                            <div class="col-lg-3"><label style={fontStyle}>Project</label> </div>
                                            <div class="col-lg-6"><label style={fontStyle}>{this.state.project}</label></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-3"><label style={fontStyle}>Category</label> </div>
                                            <div class="col-lg-6"><label style={fontStyle}>{this.state.category}</label></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-3"><label style={fontStyle}>Priority</label> </div>
                                            <div class="col-lg-6"><label style={fontStyle}>{this.state.priority}</label></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-3"><label style={fontStyle}>Reporter</label> </div>
                                            <div class="col-lg-6"><label style={fontStyle}>{this.state.reporter}</label></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-3"><label style={fontStyle}>Assignee </label> </div>
                                            <div class="col-lg-6"><label style={fontStyle}>{this.state.assignee}</label>
                                            <br/><a href="#!" onClick={this.assignedTaskToMe}>Assign to me</a> <br/></div>
                                        </div>
                                      
                                        <div class="row">
                                            <div class="col-lg-3"><label style={fontStyle}>Tester </label> </div>
                                            <div class="col-lg-6"><label style={fontStyle}>{this.state.tester}</label>
                                            <br/><a href="#!" onClick={this.assignedTesterToMe}>Assign to me</a> <br/></div>
                                    </div>
                                    
                                        <div class="row">
                                            <div class="col-lg-3"><label style={fontStyle}>Module </label> </div>
                                            <div class="col-lg-6"><label style={fontStyle}>{this.state.module}</label></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-3"><label style={fontStyle}>Platform </label> </div>
                                            <div class="col-lg-6"><label style={fontStyle}>{this.state.platform}</label></div>
                                        </div>
                                        
                                        <div class="row">
                                            <div class="col-lg-3"><label style={fontStyle}>Version</label> </div>
                                            <div class="col-lg-6"><label style={fontStyle}>{this.state.version}</label></div>
                                        </div>
                                        <div class="row">
                                                <div class="col-lg-3"><label style={fontStyle}>Created Date </label> </div>
                                                <div class="col-lg-6"><label style={fontStyle}>{moment(this.state.createdDate).format("MM/DD/YYYY hh:mm")}</label></div>
                                        </div>
                                        <div class="row">
                                                <div class="col-lg-3"><label style={fontStyle}>Modified Date </label> </div>
                                                <div class="col-lg-6"><label style={fontStyle}>{moment(this.state.modifiedDate).format("MM/DD/YYYY hh:mm")}</label></div>
                                        </div>
                                        <div class="row">
                                                <div class="col-lg-3"><label style={fontStyle}>Closed Date </label> </div>
                                                <div class="col-lg-6">
                                                    {this.state.closedDate != null? 
                                                    <label style={fontStyle}>
                                                        {moment(this.state.closedDate).format("MM/DD/YYYY hh:mm")}
                                                    </label>
                                                    : (
                                                        <label style={fontStyle}>
                                                        </label>     
                                                    )}
                                                </div>
                                        </div>
                                        <div class="row">
                                                <div class="col-lg-3"><label style={fontStyle}>Status</label> </div>
                                                <div class="col-lg-6"><label style={fontStyle}>{this.renderStatus(this.state.status)}&nbsp;{this.state.status}</label></div>
                                        </div>
                                        
                                    </div>
                                  
                                </div>

                         </section>
                            

                                <br></br>
                                <div class="box-header with-border">
                                    <h3 class="box-title"><b>Description</b></h3>
                                    <div class="box-tools pull-right">
                                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                        </button>
                                    </div>
                                   
                                </div>

                                <div class="box-body">
                                    <div class="row">
                                      <div class="col-md-12">
                                       {this.state.description}
                                       </div>
                                    </div>
                                </div>
                                <br/><br/>
                              

                                   {/*}                           

                                   <div class="box-header with-border">
                                    <h3 class="box-title"><b>Attachments</b></h3>
                                    <div class="box-tools pull-right">
                                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                        </button>
                                    </div>
                                    <br/><br/>
                                  
                                
                                    <div class="box-body">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <ul class="mailbox-attachments clearfix">

                                                    <li>
                                                        <span class="mailbox-attachment-icon has-img"><img src="lib/dist/img/photo1.png" alt="Attachment"/></span>
                                                        <div class="mailbox-attachment-info">
                                                            <a href="#" class="mailbox-attachment-name"><i class="fa fa-camera"></i> photo1.png</a>
                                                                <span class="mailbox-attachment-size">
                                                                2.67 MB
                                                                <a href="#" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a>
                                                                </span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <span class="mailbox-attachment-icon has-img"><img src="lib/dist/img/photo2.png" alt="Attachment"/></span>

                                                        <div class="mailbox-attachment-info">
                                                            <a href="#" class="mailbox-attachment-name"><i class="fa fa-camera"></i> photo2.png</a>
                                                                <span class="mailbox-attachment-size">
                                                                1.9 MB
                                                                <a href="#" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a>
                                                                </span>
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <span class="mailbox-attachment-icon"><i class="fa fa-file-word-o"></i></span>

                                                        <div class="mailbox-attachment-info">
                                                            <a href="#" class="mailbox-attachment-name"><i class="fa fa-paperclip"></i> App Description.docx</a>
                                                                <span class="mailbox-attachment-size">
                                                                1,245 KB
                                                                <a href="#" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a>
                                                                </span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <span class="mailbox-attachment-icon"><i class="fa fa-file-pdf-o"></i></span>

                                                        <div class="mailbox-attachment-info">
                                                            <a href="#" class="mailbox-attachment-name"><i class="fa fa-paperclip"></i> Sep2014-report.pdf</a>
                                                                <span class="mailbox-attachment-size">
                                                                1,245 KB
                                                                <a href="#" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a>
                                                                </span>
                                                        </div>
                                                        </li>



                                                </ul>
                                            </div>    
                                        </div>
                                    </div>    

                                </div>
                                
                                  {*/}

                                <br/>

                                  <div class="box-header with-border" >
                                    <h3 class="box-title"><b>Activity</b></h3>
                                    <div class="box-tools pull-right">
                                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                        </button>
                                    </div>
                                </div>

                                <br/>


                                  <div class="nav-tabs-custom">
                                        <ul class="nav nav-tabs">
                                            <li class="active"><a href="#tab_comment" data-toggle="tab" aria-expanded="true" style={fontStyle}>Comments</a></li>
                                            <li class=""><a href="#tab_history" data-toggle="tab" aria-expanded="true" style={fontStyle}>Histories</a></li>
                                            <li class=""><a href="#tab_worklog" data-toggle="tab" aria-expanded="true" style={fontStyle}>Work Logs</a></li>
                                            
                                        </ul>
                                        <div class="tab-content">
                        
                                            <div class="tab-pane active" id="tab_comment">

                                                <div class="box-body">
                                                    <div class="row">
                                                    <div class="col-md-12">
                                                        {this.state.comments.map(c=> 
                                                        <div> 
                                                        <div><b>{c.commenter}</b> - {moment(this.state.commendDate).format("MM/DD/YYYY hh:mm")}</div>
                                                        <br/>
                                                        <div>{c.message}</div> 
                                                        <br/>
                                                        <div><a href="#!" onClick={()=>this.editComment(c.id)}  data-toggle="modal" data-target="#editComment">Edit</a>&nbsp;|&nbsp;
                                                             <a href="#!" onClick={()=>this.deleteComment(c.id)}>Delete</a></div>
                                                            <br/>
                                                        </div>
                                                        )}
                                                    
                                                    </div>
                                                    </div>
                                                </div>
                                            

                                            </div>
                                            <div class="tab-pane" id="tab_history">

                                                 <div class="box-body">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            {this.state.histories.map(h=> 
                                                            <div> 
                                                            <div>{h.activityLog}</div> 
                                                            <br/>
                                                            </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="tab-pane" id="tab_worklog">
                                                <div class="box-body">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            {this.state.workLogs.map(w=> 
                                                            <div> 
                                                            <div>{w.user} logged {w.timeSpent} {w.unit} at {moment(w.loggedDate).format("MM/DD/YYYY")}</div> 
                                                            <br/>
                                                            </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                </div>

















                                    </section>


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