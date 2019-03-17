
import React, {Component} from 'react';
import { Header } from './Header';
import { NavBar } from './NavBar';
import { Link } from 'react-router-dom';
import config from './Config';
import axios from 'axios';


export class Document extends Component 
{

    constructor(props) {
        super(props);
        this.state = {
            documents : []
        }
    }

    componentDidMount() {
        this.getAllDocument();
    }


    getAllDocument = () => {
        axios.get(config.serverUrl +  "/api/document/getall").then(response=> {
            this.setState({
                documents: response.data
            })
        })
    }

    addDocument =()=> {
        this.props.history.push("/add-document");
    }

    editDocument = (id) => {
        this.props.history.push("/edit-document/" + id);
    }

    deleteDocument = (id) => {
        axios.delete(config.serverUrl + "/api/document/delete/" + id).then(response=> {
            this.getAllDocument();
        })
    }


    renderIcon = (type,title) => {

        console.log(title);

        const iconExcel = {
            color:'green'
        }

        const iconPdf = {
            color:'red'
        }

        const iconDoc = {
            color:'blue'
        }

        if (type == 'xls') {
            return(
                <Link to="/document-detail">
                    <i class="fa  fa-file-excel-o" style={iconExcel}></i>&nbsp; {title}
                </Link>
            )
        } else if (type == 'pdf') {
            return(
                <Link to="/document-detail">
                    <i class="fa  fa-file-pdf-o" style={iconPdf}></i>&nbsp; {title}
                </Link>
            )
        } else if (type == 'doc') {
            return(
                <Link to="/document-detail">
                    <i class="fa  fa-files-pdf-o" style={iconDoc}></i>&nbsp; {title}
                </Link>
            )
        } else {
            return(
                <Link to="/document-detail">
                    <i class="fa fa-file-o"></i>&nbsp; {title}
                </Link>
            )
        }
    }


    render() {

      

        const style1 = {
            width:'30%'
        }

        const style2 = {
            width:'10%'
        }

        
        const style3 = {
            width:'20%'
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
                            Documents ({this.state.documents.length})
                        </h1>
                        <ol class="breadcrumb">
                            <button class="btn btn-primary" onClick={this.addDocument}>Create New Document</button>
                        </ol>
                    </section>
                    <br></br>


                    <section class="content">
                
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
                        <th style={style1}><u>TITLE</u></th>
                        <th><u>AUTHOR</u></th>
                        <th><u>VERSION</u></th>
                        <th><u>SIZE</u></th>
                        <th><u>FORMAT</u></th>
                        <th><u>CREATED DATE</u></th> 
                        <th><u>ACTION</u></th> 
                        
                      </tr>

                     {this.state.documents.map(d=> 
                      <tr style={fontStyle} id={d.id}>
                          <td>
                            {this.renderIcon(d.type,d.title)}
                          </td>
                          <td>{d.author.fullName}</td>
                          <td>{d.version}</td>
                          <td>{d.size}</td>
                          <td>{d.type}</td>
                          <td>{d.createdDate}</td>
                          <td>
                          <a href="#" onClick={()=>this.editDocument(d.id)}>Edit</a> &nbsp;|&nbsp; <a href="#" onClick={()=>this.deleteDocument(d.id)}>Delete</a>
                          </td>
                      </tr>
                      )}

                    
                    </tbody></table>
           
                  </div>


                            </div>
                        </div>
                    </section>




                </div>

            </div>


            )
    }

}