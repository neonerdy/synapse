import React, {Component} from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { NavBar } from './NavBar';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import config from './Config';

export class Bug extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bugs: []
        }
    }

    componentDidMount() {
        this.getAllBugs();
    }


    getAllBugs = () => {
        axios.get(config.serverUrl + "/api/bug/getall").then(response=> {
            this.setState({
                bugs: response.data
            })
        })
    }


    addBug =()=> {
        this.props.history.push("/add-bug");
    }

    bugDetail =()=> {
        this.props.history.push("/bug-detail");
    }

    renderTracker = (priority, tracker) => {
        if (priority == 'High') {
            return(
                <span class="label label-danger"><b>{tracker}</b></span>
            )
        } else {
            return(
                <span class="label label-success"><b>{tracker}</b></span>
            )
        }
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
                <Header/>
                <NavBar/>

            <div class="content-wrapper" style={heightStyle}>
            
                <section class="content-header">
                <h1>
                    Bugs (15)
                </h1>
                <ol class="breadcrumb">
                    <button class="btn btn-primary" onClick={this.addBug}>Create New Bug</button>
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
                                    <button class="btn btn-default" type="button" name="advancedSearch" aria-label="advanced search" title="Advanced search"><i class="fa fa fa-search-plus"></i></button>
                                    <button type="button" aria-label="columns" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns"></i> <span class="caret"></span></button>
                                    <div class="export btn-group">
                                       <button class="btn btn-default" data-toggle="dropdown" type="button">
                                           <i class="fa fa-download"></i> 
                                        </button>
                                     </div>     
                               </div>
                               <div class="pull-right search">
                                   <input class="form-control" type="text" placeholder="Search"/>
                               </div>
                               <br/><br/><br/>
                           
                        <div class="box-body table-responsive no-padding">
                        <table class="table table-hover">
                          <tbody>
                           <tr>
                            <th style={style0}><u>TRACKER</u></th>   
                            <th style={style2}><u>TITLE</u></th>
                            <th style={style1}><u>PRIORITY</u></th>
                           
                            <th style={style1}><u>ASSIGNEE</u></th>
                            <th style={style1}><u>STATUS</u></th>
                            <th style={style1}><u>CREATED DATE</u></th>   
                            
                          </tr>
                        
                         {this.state.bugs.map(b=>
                          <tr style={fontStyle}>
                              <td>
                                {this.renderTracker(b.priority, b.tracker)}
                              </td>
                              <td><Link to="/bug-detail">{b.title}</Link></td>
                              <td>{b.priority}</td>
                              <td>{b.assignee}</td>
                              <td>{b.status}</td>
                              <td>{moment(b.createdDate).format("MM/DD/YYYY")}</td>
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