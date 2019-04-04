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
            bugs: [],
            initialBugs: [],
            title: 'All Bugs'
        }
    }

    componentDidMount() {
        
        let status = this.props.match.params.status;
        this.getAllBugs();
      
    }


    getAllBugs = () => {
        axios.get(config.serverUrl + "/api/bug/getall").then(response=> {
            this.setState({
                bugs: response.data,
                initialBugs: response.data
            })
        })
    }

    getBugByStatus = (status) => {
        axios.get(config.serverUrl + "/api/bug/getbystatus/" + status).then(response=> {
            this.setState({
                bugs: response.data
            })
            console.log("bugs=" + response.data);
        })
    }

    addBug =()=> {
        this.props.history.push("/add-bug");
    }

    bugDetail =(id)=> {
        this.props.history.push("/bug-detail/" + id);
    }


    onFilterChange = (status) => {

        let filteredBugs = this.state.initialBugs.filter(b => b.status.toLowerCase()
            .includes(status.toLowerCase()));
        
        if (status == 'All')
        {
            this.setState( {
                bugs: this.state.initialBugs,
                title: 'All Bugs'
            })
        }
        else {
            this.setState( {
                bugs: filteredBugs,
                title: status + " Bugs"
            })
    
        }


    }

    onSearchChange = (e) => {

        let filteredBugs = this.state.initialBugs.filter(b => b.tracker.toLowerCase()
                .includes(e.target.value.toLowerCase()) ||
                b.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
                b.priority.toLowerCase().includes(e.target.value.toLowerCase()) ||
                b.assignee.toLowerCase().includes(e.target.value.toLowerCase())
            );
        
        if (e.target.value == '')
        {
            this.setState( {
                bugs: this.state.initialBugs
            })
        }
        else {
            this.setState( {
                bugs: filteredBugs
            })
    
        }
        
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
                <Header/>
                <NavBar/>

            <div class="content-wrapper" style={heightStyle}>
            
                <section class="content-header">
                <h1>
                    {this.state.title} ({this.state.bugs.length})
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

                           <div class="btn-group">
                                <button class="btn btn-default" type="button">Bug Status</button>
                                <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" style={buttonStyle}>
                                <span class="caret"></span>
                                
                                </button>
                                <ul class="dropdown-menu" role="menu">
                                    <li><a href="#" onClick={()=>this.onFilterChange("All")}>All</a></li>
                                    <li><a href="#" onClick={()=>this.onFilterChange("New")}>New</a></li>
                                    <li><a href="#" onClick={()=>this.onFilterChange("Coding")}>Coding</a></li>
                                    <li><a href="#" onClick={()=>this.onFilterChange("Resolved")}>Resolved</a></li>
                                    <li><a href="#" onClick={()=>this.onFilterChange("Testing")}>Testing</a></li>
                                    <li><a href="#" onClick={()=>this.onFilterChange("Rework")}>Rework</a></li>
                                    <li><a href="#" onClick={()=>this.onFilterChange("Closed")}>Closed</a></li>
                                    
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
                        
                         {this.state.bugs.map(b=>
                          <tr style={fontStyle}>
                              <td>
                                {this.renderTracker(b.priority, b.tracker)}
                              </td>
                              <td><a href="#" onClick={()=>this.bugDetail(b.id)}>{b.title}</a></td>
                              <td>{b.priority}</td>
                              <td>{b.assignee}</td>
                              <td>{b.status}</td>
                              <td>{moment(b.createdDate).format("MM/DD/YYYY hh:mm:ss")}</td>
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