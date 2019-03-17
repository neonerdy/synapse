
import React, {Component} from 'react';
import './App.css';
import { Footer } from './Footer';
import { Header } from './Header';
import { NavBar } from './NavBar';

export class AddBug extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            isSaveSuccess: false
        }
    }

    save = () => {
        console.log("save ...");

        this.setState({
            isSaveSuccess: true
        })
    }

    render() {

        const heightStyle = {
            minHeight: '959.8px'
        }

        const selectStyle = {
            width: '100%'
        }

        return(

            <div class="wrapper">

                <Header/>
                <NavBar/>

                 <div class="content-wrapper" style={heightStyle}>
                    <section class="content-header">
                        <h1>
                            Create Bug
                        </h1>
                    </section>
                    <br/>
                  
                
                     <section class="content">

                         <div class="row">
                                  
                            <div class="col-md-12">
                                <div class="box box-default">
                                    <div class="box-header with-border">
                                       
                                    <div class="nav-tabs-custom">
                                        <ul class="nav nav-tabs">
                                        <li class="active"><a href="#tab_1" data-toggle="tab" aria-expanded="true">Detail</a></li>
                                        <li class=""><a href="#tab_2" data-toggle="tab" aria-expanded="false">Description</a></li>
                                        </ul>
                                        <div class="tab-content">
                                        <div class="tab-pane active" id="tab_1">
                                                
                                        <div class="form-horizontal">
                                      <div id="title" class="form-group">
                                            <label class="col-md-3 control-label">Title</label>
                                            <div class="col-md-7 col-sm-12 required">
                                                <input class="form-control" type="text"/>
                                            </div>
                                      </div>
                                      <div id="priority" class="form-group">
                                            <label class="col-md-3 control-label">Priority</label>
                                            <div class="col-md-7 col-sm-12 required">
                                                <select class="form-control">
                                                    <option>Select Priority</option>
                                                    <option>High</option>
                                                    <option>Medium</option>
                                                    <option>Low</option>
                                               </select>
                                            </div>
                                        </div>
                                      
                                      <div id="reporter" class="form-group">
                                            <label class="col-md-3 control-label">Reported By</label>
                                            <div class="col-md-7 col-sm-12 required">
                                                <select class="form-control">
                                                    <option>Select Reporter</option>
                                                    <option>Tony Stark</option>
                                                    <option>Bruce Banner</option>
                                                </select>
                                            </div>
                                            <div class="col-md-1 col-sm-1 text-left">
                                                <a href="#" data-toggle="modal" data-target="#createModal" data-select="location_id_location_select" class="btn btn-sm btn-default">New</a>
                                            </div>
                                      </div>

                                      <div id="assigned" class="form-group">
                                            <label class="col-md-3 control-label">Assigned To</label>
                                            <div class="col-md-7 col-sm-12 required">
                                                <select class="form-control">
                                                    <option>Select Assignee</option>
                                                    <option>Ariyanto</option>
                                                    <option>Erika Kartawidjaja</option>
                                                </select>
                                            </div>
                                            <div class="col-md-1 col-sm-1 text-left">
                                                <a href="#" data-toggle="modal" data-target="#createModal" data-select="location_id_location_select" class="btn btn-sm btn-default">New</a>
                                            </div>
                                      </div>



                                      <div id="module" class="form-group">
                                            <label class="col-md-3 control-label">Module</label>
                                            <div class="col-md-7 col-sm-12">
                                                <input class="form-control" type="text"/>
                                            </div>
                                      </div>

                                      <div id="platform" class="form-group">
                                            <label class="col-md-3 control-label">Platform</label>
                                            <div class="col-md-7 col-sm-12">
                                                <input class="form-control" type="text"/>
                                            </div>
                                      </div>

                                      <div id="version" class="form-group">
                                            <label class="col-md-3 control-label">Version</label>
                                            <div class="col-md-7 col-sm-12">
                                                <input class="form-control" type="text"/>
                                            </div>
                                      </div>

                                       <div id="tester" class="form-group">
                                            <label class="col-md-3 control-label">Tested By</label>
                                            <div class="col-md-7 col-sm-12 required">
                                                
                                            <select class="form-control">
                                                <option>Select Tester</option>
                                                <option>Ariyanto</option>
                                                <option>Erika Kartawidjaja</option>
                                            </select>
                                         
                                            

                                            </div>
                                            <div class="col-md-1 col-sm-1 text-left">
                                                <a href="#" data-toggle="modal" data-target="#createModal" data-select="location_id_location_select" class="btn btn-sm btn-default">New</a>
                                            </div>
                                      </div>
                                      


                                      </div>


                                        </div>
                                        <div class="tab-pane" id="tab_2">
                                            
                                            <div class="form-horizontal">
                                                <div id="title" class="form-group">
                                                <label class="col-md-3 control-label">Describe Issue</label>
                                            <div class="col-md-7 col-sm-12">
                                    
                                                <textarea id="editor1" class="form-control"></textarea>
                                             
                                            </div>
                                                </div>
                                            </div>         
                                        </div>
                                        
                                        </div>
                                    </div>

                                    <div class="text-right">
                                        <a class="btn btn-link text-left" href="#">Cancel</a>
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