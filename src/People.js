
import React, {Component} from 'react';
import { Header } from './Header';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import axios from 'axios';
import config from './Config';


export class People extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            initialPeople: [],
            people : []
        }
    }

    componentDidMount() {
        this.getAllPeople();
    }

    
    getAllPeople = () => {
        axios.get(config.serverUrl + "/api/people/getall").then(response=> {
            this.setState({
                initialPeople: response.data,
                people: response.data
            })
        });
    }

    deletePeople = (id) => {
        axios.delete(config.serverUrl + "/api/people/delete/" + id).then(response=> {
            this.getAllPeople();
        })
    }


    addPeople =()=> {
        this.props.history.push("/add-people");
    }

    editPeople = (id) => {
        this.props.history.push("/edit-people/" + id)
    }
    
    onSearchChange = (e) => {

        let filteredPeople = this.state.initialPeople.filter(p => p.fullName.toLowerCase()
            .includes(e.target.value.toLowerCase()));
        
        if (e.target.value == '')
        {
            this.setState( {
                people: this.state.initialPeople
            })
        }
        else {
            this.setState( {
                people: filteredPeople
            })
    
        }
        
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
                    People ({this.state.people.length})
                </h1>
                <ol class="breadcrumb">
                    <button class="btn btn-primary" onClick={this.addPeople}>Create New People</button>
                </ol>
                </section>
                <br></br>

                <section class="content">
                
                    <div class="box box-default">
                
                    <div class="box-body">
                        
                        <div class="pull-right">
                            <button class="btn btn-default" type="button" name="refresh" aria-label="refresh" title="Refresh"><i class="fa fa-refresh"></i></button>
                            <button type="button" aria-label="columns" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns"></i> <span class="caret"></span></button>
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

                         <table class="table table-hover">
                                    <tbody>
                                        <tr>
                                            <th><u>FULL NAME</u></th>
                                            <th><u>ROLE</u></th>
                                            <th><u>ADDRESS</u></th>
                                            <th><u>PHONE</u></th>
                                            <th><u>E-MAIL</u></th>
                                            <th>ACTION</th>
                                        </tr>
                                        {this.state.people.map(p=> 
                                        <tr key={p.id}>
                                            <td>{p.fullName}</td>
                                            <td>{p.role}</td>
                                            <td>{p.address}</td>
                                            <td>{p.phone}</td>
                                            <td>{p.email}</td>
                                            <td>
                                            <a href="#" onClick={()=>this.editPeople(p.id)}>Edit</a> &nbsp;|&nbsp; <a href="#" onClick={()=>this.deletePeople(p.id)}>Delete</a>                                            </td>
                                       
                                        </tr>
                                        )}
                                        </tbody>
                                    </table>


                    </div>
                </div>
                
                </section>             



            </div>

            <Footer/>

            </div>

        )
    }


   


}
