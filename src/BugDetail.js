import React, {Component} from 'react';
import { Header } from './Header';
import { NavBar } from './NavBar';
import { Footer } from './Footer';

export class BugDetail extends Component
{
    constructor(props) {
        super(props);
    }

    addBug =()=> {
        this.props.history.push("/add-bug");
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
            display:'none;margin-top:10px'
        }

        return(
            <div class="wrapper">
               <Header/>
               <NavBar/>

                <div class="content-wrapper" style={heightStyle}>
                
                    <section class="content-header">
                    <br/>
                    <h1>
                        Bug Detail
                    </h1>
                    <ol class="breadcrumb">
                        <button class="btn btn-primary" onClick={this.addBug}>Create New Bug</button>
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
                                        
                                    <textarea class="form-control" rows="8"></textarea>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                    </div>


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





                
                        <div class="row">
                        
                            <div class="col-md-12">
                                <div class="box box-default">
                                    <br/>
                                    <div class="box-header with-border">
                                        <h3 class="box-title"><span class="label label-danger">SYN-431</span> &nbsp;Create new bug doesn't work properly</h3>
                                        
                                     </div>

                                    <section class="content">


                                    <div class="pull-right">
                                      <button class="btn btn-default" type="button" data-target="#editWorkItem" data-toggle="modal" data-id="<%=id%>"><i class="fa fa-pencil-square-o"></i>
                                            &nbsp;Edit
                                        </button>
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-default" data-toggle="modal" data-target="#addComment" data-id="<%=id%>">Comment</button>
                                            <button type="button" class="btn btn-default" data-toggle="modal" data-target="#addAttachment" data-id="<%=id%>">Attachment</button>
                                                          
                                        </div>
                                        <div class="btn-group">
                                            <button class="btn btn-default" style={buttonStyle} type="button"><i class="fa fa-refresh"></i></button>    
                                            <button class="btn btn-default" style={buttonStyle} type="button" data-toggle="modal" data-target="#deleteWorkItem">
                                                    <i class="fa fa-trash-o"></i>
                                            </button>
                                            
                                        </div>
                                        <div class="btn-group">
                                                <button class="btn btn-default" type="button">Update Status</button>
                                                <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" style={buttonStyle}>
                                                    <span class="caret"></span>
                                                
                                                </button>
                                                <ul class="dropdown-menu" role="menu">
                                                    <li><a href="#">New</a></li>
                                                    <li><a href="#">On Progress</a></li>
                                                    <li><a href="#">Resolved</a></li>
                                                    <li><a href="#">Testing</a></li>
                                                    <li><a href="#">Rework</a></li>
                                                    <li><a href="#">Closed</a></li>
                                                    
                                                </ul>
                                        </div>
                                        </div>

                                        <br/><br/>

                             
                          
                            <section class="content">
             
                                <div class = "row">
                                    <div class="col-md-6">
                                        <div class="row">
                                            <div class="col-lg-3"><label style={fontStyle}>Priority</label> </div>
                                            <div class="col-lg-6"><label style={fontStyle}>High</label></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-3"><label style={fontStyle}>Reporter</label> </div>
                                            <div class="col-lg-6"><label style={fontStyle}>Erika Kartawidjaja</label></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-3"><label style={fontStyle}>Assignee </label> </div>
                                            <div class="col-lg-6"><label style={fontStyle}>Ariyanto</label>
                                            <br/><a href="/workitem/assigntome/<%=id%>" >Assign to me</a> <br/></div>
                                        </div>
                                      
                                        <div class="row">
                                            <div class="col-lg-3"><label style={fontStyle}>Tester </label> </div>
                                            <div class="col-lg-6"><label style={fontStyle}>Erika</label>
                                            <br/><a href="/workitem/assigntestertome/<%=id%>">Assign to me</a> <br/></div>
                                    </div>
                                    
                                        <div class="row">
                                            <div class="col-lg-3"><label style={fontStyle}>Module </label> </div>
                                            <div class="col-lg-6"><label style={fontStyle}>UI</label></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-3"><label style={fontStyle}>Platform </label> </div>
                                            <div class="col-lg-6"><label style={fontStyle}>Web</label></div>
                                        </div>
                                        
                                        <div class="row">
                                            <div class="col-lg-3"><label style={fontStyle}>Version</label> </div>
                                            <div class="col-lg-6"><label style={fontStyle}>1.2.1</label></div>
                                        </div>
                                        <div class="row">
                                                <div class="col-lg-3"><label style={fontStyle}>Created Date </label> </div>
                                                <div class="col-lg-6"><label style={fontStyle}>14/02/2019 12:30:11</label></div>
                                        </div>
                                        <div class="row">
                                                <div class="col-lg-3"><label style={fontStyle}>Modified Date </label> </div>
                                                <div class="col-lg-6"><label style={fontStyle}>14/02/2019 12:30:11</label></div>
                                        </div>
                                        <div class="row">
                                                <div class="col-lg-3"><label style={fontStyle}>Closed Date </label> </div>
                                                <div class="col-lg-6"><label style={fontStyle}></label></div>
                                        </div>
                                        <div class="row">
                                                <div class="col-lg-3"><label style={fontStyle}>Status</label> </div>
                                                <div class="col-lg-6"><label style={fontStyle}><span class="label label-info" >New</span></label></div>
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
                                <br/><br/>

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
                                            <li class=""><a href="#tab_history" data-toggle="tab" aria-expanded="true" style={fontStyle}>History</a></li>
                                        </ul>
                                        <div class="tab-content">
                        
                                            <div class="tab-pane active" id="tab_comment">
                                          
                                            </div>
                                            <div class="tab-pane" id="tab_history">
                                          
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