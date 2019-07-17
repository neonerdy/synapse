
import React, {Component} from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { NavBar } from './NavBar';
import { Setting } from './Setting';
import axios from 'axios';
import config from './Config'
import { ChangePhoto } from './ChangePhoto';

export class Dashboard extends Component
{
    constructor(props) {
        super(props);

        var userJson = localStorage.getItem("user");
        var user = JSON.parse(userJson);
       
        this.state = {
           user: user,
           projects: 0,
           bugs: 0,
           features: 0,
           others: 0,
           activeProjectId: '',
           isHideClosedTask: false,
           isShowAssignedToMe: false
        }
    }


    componentDidMount() {
                 
        this.getUserTaskCount(this.state.user.id);
    }


    getUserTaskCount = (id) => {
        
        axios.get(config.serverUrl + "/api/people/getbyid/" + id).then(response=> {
            this.setState({
                activeProjectId: response.data.activeProjectId,
                isHideClosedTask: response.data.isHideClosedTask,
                isShowAssignedToMe: response.data.isShowAssignedToMe
            })

            this.getProjectCount(this.state.activeProjectId);
            this.getBugsCount(this.state.activeProjectId);
            this.getFeaturesCount(this.state.activeProjectId);
            this.getOthersCount(this.state.activeProjectId);

        });
    }



    getProjectCount = (projectId) => {
       
        if (projectId == '00000000-0000-0000-0000-000000000000') {
            axios.get(config.serverUrl + "/api/project/getprojectcount").then(response=> {
                this.setState({
                    projects: response.data
                })
            });
        } else {
            this.setState({
                projects: 1
            })
        }

    }

    getBugsCount = (projectId) => {

        if (projectId == '00000000-0000-0000-0000-000000000000') {
            axios.get(config.serverUrl + "/api/task/gettaskcount/bug").then(response=> {
                this.setState({
                    bugs: response.data
                })
            });
        } else {
            axios.get(config.serverUrl + "/api/task/gettaskcountbyproject/bug/" + projectId).then(response=> {
                this.setState({
                    bugs: response.data
                })
            });
        }
    }


    getFeaturesCount = (projectId) => {

        if (projectId == '00000000-0000-0000-0000-000000000000') {
            axios.get(config.serverUrl + "/api/task/gettaskcount/feature").then(response=> {
                this.setState({
                    features: response.data
                })
            });
        } else {
            axios.get(config.serverUrl + "/api/task/gettaskcountbyproject/feature/" + projectId).then(response=> {
                this.setState({
                    features: response.data
                })
            });
        }
    } 

    getOthersCount = (projectId) => {

        if (projectId == '00000000-0000-0000-0000-000000000000') {
            axios.get(config.serverUrl + "/api/task/gettaskcount/other").then(response=> {
                this.setState({
                    others: response.data
                })
            });
        } else {
            axios.get(config.serverUrl + "/api/task/gettaskcountbyproject/other/" + projectId).then(response=> {
                this.setState({
                    others: response.data
                })
            });
        }
    }



   
    addTask =()=> {
        this.props.history.push("/add-task");
    }



    render() {

        const style0 = {
            width:'8%'
        }

        const style1 = {
            width:'10%'
        }

        const style2 = {
            width:'40%'
        }

        const fontStyle = {
            fontWeight:'normal'
        }
        
        const heightStyle = {
            minHeight: '959.8px'
        }

        return(

            <div class="wrapper">
             
             <Header 
                history={this.props.history} 
                user={this.state.user}
             />
             <NavBar/>

             <Setting/>   
             <ChangePhoto/>
            
            <div class="content-wrapper" style={heightStyle}>
            
                <section class="content-header">
                <h1>
                    Dashboard
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
                       <div class="box-header with-border">
                        <h3 class="box-title"></h3>
                        <div class="box-tools pull-right">
                            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                            </button>
                        </div>
                        </div>
                           
                           <div class="box-body">

                              <div class="row">
                        <div class="col-lg-3 col-xs-6">
                            <div class="small-box bg-teal">
                            <div class="inner">
                                <h3>{this.state.projects}</h3>
                                <p>Projects</p>
                            </div>
                                <div class="small-box-footer"/>
                                  
                                </div>
                        </div>

                        <div class="col-lg-3 col-xs-6">
                            <div class="small-box bg-maroon">
                            <div class="inner">
                                <h3>{this.state.features}</h3>
                                <p>Features</p>
                            </div>
                                <div class="small-box-footer"/>
                            </div>
                        </div>


                        <div class="col-lg-3 col-xs-6">
                            <div class="small-box bg-orange">
                            <div class="inner">
                                <h3>{this.state.bugs}</h3>
                                <p>Bugs</p>
                            </div>
                          
                                <div class="small-box-footer"/>
                            </div>
                        </div>

                        <div class="col-lg-3 col-xs-6">
                            <div class="small-box bg-purple">
                            <div class="inner">
                                <h3>{this.state.others}</h3>
                                <p>Others</p>
                            </div>
                                <div class="small-box-footer"/>
                            </div>
                        </div>
                        </div>



                           </div>
                        </div>
                    </div>
                </div>

                 
                 {/*}
                 <div class="row">

                  <div class="col-md-12">
                       <div class="box box-default">
                            <div class="box-header with-border">
                                    <h3 class="box-title">Assigned To Me</h3>
                                    <div class="box-tools pull-right">
                                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                        </button>
                                    </div>
                            </div>
                            <div class="box-body">

                             <div class="pull-right">
                                    <button class="btn btn-default" type="button" name="refresh" aria-label="refresh" title="Refresh"><i class="fa fa-refresh"></i></button>
                                    <button class="btn btn-default" type="button" name="advancedSearch" aria-label="advanced search" title="Advanced search"><i class="fa fa fa-search-plus"></i></button>
                                    <button type="button" aria-label="columns" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns"></i> <span class="caret"></span></button>
                                    <div class="export btn-group">
                                       <button class="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button">
                                           <i class="fa fa-download"></i> <span class="caret"></span></button><ul class="dropdown-menu" role="menu"><li data-type="csv"><a href="javascript:void(0)">CSV</a></li><li data-type="excel"><a href="javascript:void(0)">MS-Excel</a></li><li data-type="doc"><a href="javascript:void(0)">MS-Word</a></li><li data-type="txt"><a href="javascript:void(0)">TXT</a></li><li data-type="json"><a href="javascript:void(0)">JSON</a></li><li data-type="xml"><a href="javascript:void(0)">XML</a></li><li data-type="pdf"><a href="javascript:void(0)">PDF</a></li></ul></div>
                               </div>
                               <div class="pull-right search">
                                   <input class="form-control" type="text" placeholder="Search"/>
                               </div>
                               


                               <br/><br/><br/>
                           

                            <div class="box-body table-responsive no-padding">
                        <table class="table table-hover">
                          <tbody>
                           <tr>
                           <th style={style0}>PRIORITY</th>
                            <th style={style0}>TRACKER</th>   
                            <th style={style2}>TITLE</th>
                            <th style={style1}>REPORTER</th>
                            <th style={style1}>ASSIGNEE</th>
                            <th style={style1}>STATUS</th>
                            <th style={style1}>CREATED DATE</th>   
                            
                          </tr>

                          <tr style={fontStyle}>
                            <td><span class="label label-danger">High</span></td>
                              <td>SYN-431</td>
                              <td><a href="#">Create new bug doesn't work properly</a></td>
                              <td>Erika</td>
                              <td>Ariyanto</td>
                              <td>New</td>
                              <td>13/01/2019 09:17</td>
                          </tr>

                          <tr style={fontStyle}>
                             <td><span class="label label-success">Normal</span></td>
                              <td>SYN-142</td>
                              <td><a href="#">Display name not appear</a></td>
                              <td>Erika</td>
                              <td>Ariyanto</td>
                              <td>On Progress</td>
                              <td>12/01/2019 12:01</td>
                          </tr>
                       
                       
                          <tr style={fontStyle}>
                             <td><span class="label label-info">Low</span></td>
                              <td>SYN-142</td>
                              <td><a href="#">Input Bug have issue with validation</a></td>
                              <td>Erika</td>
                              <td>Ariyanto</td>
                              <td>Resolved</td>
                              <td>11/01/2019 09:34</td>
                          </tr>

                        </tbody></table>
               
                      </div>

                            </div>
                        </div>
                        

                    </div>    

               
                 </div>

                {*/}






                </section>

                


            </div>
            <Footer/>

            </div>

        )
    }

}