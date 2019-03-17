
import React, {Component} from 'react';
import './App.css';
import { Header } from './Header';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import axios from 'axios';
import config from './Config';

export class AddProject extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            error: {},
            projectName: '',
            initial: '',
            projectManagerId: '',
            projectManagers: [],
            description: '',
        }
    }

    componentDidMount() {
        this.getProjectManagers();
    }


    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    validate = () => {

        let isValid = true;
        let error = {};
      
        if (this.state.projectName == '') {
            error.projectName = 'is required';
            isValid = false;
        }
        if (this.state.initial == '') {
            error.initial = 'is required';
            isValid = false;
        } 
        if (this.state.projectManagerId == '') {
            error.projectManagerId = 'is required';
            isValid = false;
        }
        if (this.state.description == '') {
            error.description = 'is required';
            isValid = false;
        }

        this.setState({
            error: error 
        })

        return isValid;

    }

    getProjectManagers = () => {
        axios.get(config.serverUrl + "/api/people/getall").then(response=> {
            this.setState({
                projectManagers: response.data
            })
        })
    }


    save = () => {

        let isValid = this.validate();

       console.log(isValid); 

        if (isValid)
        {
            let project = {
                projectName: this.state.projectName,
                initial: this.state.initial,
                projectManagerId: this.state.projectManagerId,
                description: this.state.description
            }

            axios.post(config.serverUrl + "/api/project/save", project).then(response=> {
                this.props.history.push("/project");
            })
        
        }
    }

    cancelAdd = () => {
        this.props.history.push("/project");
    }

    newProjectManager = () => {
        this.props.history.push("/add-people");
    }

    render() {

        const heightStyle = {
            minHeight: '959.8px'
        }

        let errStyle = {
            color: 'darkred'
        }

        return(
            <div class="wrapper">
            <Header/>
            <NavBar/>
                 <div class="content-wrapper" style={heightStyle}>
                    <section class="content-header">
                        <h1>
                            Create Project
                        </h1>
                    </section>
                    <br/>
                     <section class="content">

                         <div class="row">
                                  
                            <div class="col-md-12">
                                <div class="box box-default">
                                    <div class="box-header with-border">
                                        <h3 class="box-title"></h3>
                                        <div class="box-tools pull-right">
                                           
                                        </div>

                                      <form class="form-horizontal">
                                      <div id="name" class="form-group">
                                            <label class="col-md-3 control-label">Project Name</label>
                                            <div class="col-md-7 col-sm-12 required">
                                                <input class="form-control" type="text" name="projectName" onChange={this.onValueChange}/>
                                            </div>
                                            &nbsp;&nbsp;<span style={errStyle}>{this.state.error.projectName}</span>
                                      </div>
                                      <div id="initial" class="form-group">
                                            <label class="col-md-3 control-label">Initial</label>
                                            <div class="col-md-7 col-sm-12 required">
                                                <input class="form-control" type="text" name="initial" onChange={this.onValueChange}/>
                                            </div>
                                            &nbsp;&nbsp;<span style={errStyle}>{this.state.error.initial}</span>
                                      </div>
                                      
                                      <div id="manager" class="form-group">
                                            <label class="col-md-3 control-label">Project Manager</label>
                                            <div class="col-md-7 col-sm-12 required">
                                                <select class="form-control" name="projectManagerId" onChange={this.onValueChange}>
                                                    <option key="" value="">Select Project Manager</option>
                                                    {this.state.projectManagers.map(pm=> 
                                                        <option key={pm.id} value={pm.id}>{pm.fullName}</option>
                                                    )}
                                                </select>
                                            </div>
                                            <div class="col-md-1 col-sm-1 text-left">
                                                <a href="#" onClick={this.newProjectManager} class="btn btn-sm btn-default">New</a>
                                            </div>
                                            &nbsp;&nbsp;<span style={errStyle}>{this.state.error.projectManagerId}</span>
                                      </div>

                                      <div id="description" class="form-group">
                                            <label class="col-md-3 control-label">Description</label>
                                            <div class="col-md-7 col-sm-12 required">
                                                <input class="form-control" type="text" name="description" onChange={this.onValueChange}/>
                                            </div>
                                            &nbsp;&nbsp;<span style={errStyle}>{this.state.error.description}</span>
                                      </div>


                                      </form>

                                        <div class="box-footer text-right">
                                            <a href="#" onClick={this.cancelAdd} class="btn btn-link text-left">Cancel</a>
                                            <button type="button" onClick={this.save} class="btn btn-primary"><i class="fa fa-check icon-white"></i> Save</button>
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