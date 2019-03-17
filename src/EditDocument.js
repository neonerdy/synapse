
import React, {Component} from 'react';
import { Header } from './Header';
import { NavBar } from './NavBar';
import axios from 'axios';
import config from './Config';

export class EditDocument extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            error: {},
            projects: [],
            people: [],
            id: '',
            projectId: '',
            fileName: '',
            title:'',
            authorId: '',
            version: ''
        }
    }

    componentDidMount() {
        
        let id = this.props.match.params.id;

        this.getDocumentById(id);
        this.getAllProjects();
        this.getAllPeople();
    }


    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getAllProjects = () => {
        axios.get(config.serverUrl + "/api/project/getall").then(Response=> {
            this.setState({
                projects: Response.data
            })
        })
    }

    getAllPeople = () => {
        axios.get(config.serverUrl + "/api/people/getall").then(Response=> {
            this.setState({
                people: Response.data
            })
        })
    }


    getDocumentById = (id) => {

        axios.get(config.serverUrl + "/api/document/getbyid/" + id).then(response=> {
            this.setState({
                id: response.data.id,
                projectId: response.data.projectId,
                title: response.data.title,
                authorId: response.data.authorId,
                version: response.data.version
            })
        })
    }


    validate = () => {

        let isValid = true;
        let error = {};

        if (this.state.projectId == '') {
            error.projectId = 'is required';
            isValid = false;
        }
        if (this.state.fileName == '') {
            error.fileName = 'is required';
            isValid = false;
        }
        if (this.state.title == '') {
            error.title = 'is required';
            isValid = false;
        }
        if (this.state.authorId == '') {
            error.authorId = 'is required';
            isValid = false;
        }
        if (this.state.version == '') {
            error.version = 'is required';
            isValid = false;
        }
        

        this.setState({
            error: error 
        })

        return isValid;
        
    }

    getFileSize = () => {

        let file = document.getElementById("fileName").files[0];
        return file.size;
    }

    getFileType = () => {

        let file = document.getElementById("fileName").files[0];
        var ext = file.name.substring(file.name.lastIndexOf('.')+1);

        return ext;
    }


    updateDocument = () => {

        let isValid = this.validate();
        if (isValid) {
     
            let document = {
                id: this.state.id,
                projectId: this.state.projectId,
                title: this.state.title,
                authorId: this.state.authorId,
                version: this.state.version,
                fileName: this.state.fileName,
                size: this.getFileSize(),
                type: this.getFileType()
            }

            console.log(document);
            

            axios.put(config.serverUrl + "/api/document/update", document).then(response=> {
                this.props.history.push("/document");
            })

        }        

    }

    cancelAdd = () => {
        this.props.history.push("/document");
    }



    render() {

        const heightStyle = {
            minHeight: '959.8px'
        }

        const attachmentStyle = {
            width: '700px'
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
                            Edit Document
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
                                
                                <div class="form-group">
                                    <label class="col-md-3 control-label">Project</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <select class="form-control" name="projectId" 
                                            onChange={this.onValueChange} value={this.state.projectId} >
                                            <option value="">Select Project</option>
                                            {this.state.projects.map(p=> 
                                                <option key={p.id} value={p.id}>{p.projectName}</option>
                                            )}
                                        </select>
                                     </div>
                                  
                                     <div class="col-md-2 col-sm-1">
                                     <span style={errStyle}>{this.state.error.projectId}</span>
                                        &nbsp;&nbsp; <a href="#" class="btn btn-sm btn-default">New</a>
                                    </div>
                                   
                                </div>

                                <div class="form-group">
                                    <label class="col-md-3 control-label">File Name</label>
                                    <div id="divFile" class="col-md-7 col-sm-12 required">
                                        <input type="file" class="btn btn-default" name="fileName" id="fileName" 
                                            onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.fileName}</span>
                                </div>
                                
                                <div class="form-group">
                                    <label class="col-md-3 control-label">Title</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="text" name="title" 
                                            onChange={this.onValueChange} value={this.state.title}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.title}</span>
                                </div>

                                <div class="form-group">
                                    <label class="col-md-3 control-label">Author</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <select class="form-control" name="authorId" 
                                            onChange={this.onValueChange} value={this.state.authorId}>
                                            <option value="">Select Author</option>
                                            {this.state.people.map(p=> 
                                                <option key={p.id} value={p.id}>{p.fullName}</option>
                                            )}
                                        </select>
                                     </div>
                                     <div class="col-md-2 col-sm-1 text-left">
                                       <span style={errStyle}>{this.state.error.authorId}</span>
                                        &nbsp;&nbsp; <a href="#" class="btn btn-sm btn-default">New</a>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-md-3 control-label">Version</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input class="form-control" type="text" name="version" 
                                            onChange={this.onValueChange} value={this.state.version}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.version}</span>
                                </div>


                                </form>

                                    <div class="box-footer text-right">
                                        <a class="btn btn-link text-left" href="#" onClick={this.cancelAdd}>Cancel</a>
                                        <button type="button" onClick={this.updateDocument} class="btn btn-primary"><i class="fa fa-check icon-white"></i>Update</button>
                                    </div>


                                </div>
                            </div>
                        </div>
                    
                    </div>


                     </section>
                </div>
            </div>
        )
    }
}