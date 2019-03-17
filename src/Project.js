

import React, {Component} from 'react';
import { Header } from './Header';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import axios from 'axios';
import config from './Config';


export class Project extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            projects: []
        }
    }

    componentDidMount() {
        this.getAllProjects();
    }

    getAllProjects =() => {
        axios.get(config.serverUrl + "/api/project/getall").then(response=> {
            this.setState({
                projects: response.data
            })
        });
    }


    addProject =()=> {
        this.props.history.push("/add-project");
    }

    editProject = (id) => {
        this.props.history.push("/edit-project/" + id);
    }


    deleteProject = (id) => {
        axios.delete(config.serverUrl + "/api/project/delete/" + id).then(response=> {
            this.getAllProjects();
        })
    }


    render() {

        const heightStyle = {
            minHeight: '959.8px'
        }

        return(
        
         <div class="wrapper">

             <Header/>
             <NavBar/>

            <div class="content-wrapper" style={heightStyle}>
                <section class="content-header">
                <h1>
                    Projects ({this.state.projects.length})
                </h1>
                <ol class="breadcrumb">
                    <button class="btn btn-primary" onClick={this.addProject}>Create New Project</button>
                </ol>
                </section>
                <br></br>
            
                <section class="content">
                    <div class="row">
                    
                        <div class="col-md-12">
                            <div class="box box-default">
                            
                                
                                <div class="box-body">
                                    <div class="pull-right">
                                        <button class="btn btn-default" type="button" name="refresh" aria-label="refresh" title="Refresh"><i class="fa fa-refresh"></i></button>
                                        <button type="button" aria-label="columns" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns"></i> <span class="caret"></span></button>
                                        <div class="export btn-group">
                                            <button class="btn btn-default" type="button">
                                                <i class="fa fa-download"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="pull-right search">
                                        <input class="form-control" type="text" placeholder="Search"/>
                                    </div>
                                    


                                    <br/><br/><br/>
                                
                                    <table class="table table-hover">
                                    <tbody>
                                        <tr>
                                            <th><u>PROJECT NAME</u></th>
                                            <th><u>INITIAL</u></th>
                                            <th><u>PROJECT MANAGER</u></th>
                                            <th><u>CREATED DATE</u></th>
                                            <th><u>DESCRIPTION</u></th>
                                            <th><u>STATUS</u></th>
                                            <th>ACTION</th>
                                        </tr>
                                       {this.state.projects.map(p=> 
                                        <tr key={p.id}>
                                            <td>{p.projectName}</td>
                                            <td>{p.initial}</td>
                                            <td>{p.projectManager}</td>
                                            <td>{p.createdDate}</td>
                                            <td>{p.description}</td>
                                            <td>{p.status}</td>
                                            <td>
                                                <a href="#" onClick={()=>this.editProject(p.id)}>Edit</a> &nbsp;|&nbsp; <a href="#" onClick={()=>this.deleteProject(p.id)}>Delete</a>
                                            </td>
                                        </tr>
                                        )}
                                        </tbody>
                                    </table>
    
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