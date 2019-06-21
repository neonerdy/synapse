
import React, {Component} from 'react';
import {Link} from 'react-router-dom';


export class Header extends Component {


    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            role: ''
        }
    }

    componentDidMount() {


        
    }

    logout() {
        //this.props.history.push("/");
    }

    render() {

        return(
                  <header class="main-header">
                   
                    <nav class="navbar navbar-static-top">
                    <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span class="sr-only">Toggle navigation</span>
                    </a>

                    
    
                    <Link to="/dashboard" class="logo">
                        <span class="logo-mini">TM</span>
                        <span class="logo-lg">Task Master</span>
                    </Link>

                    <div class="navbar-custom-menu">
                        <ul class="nav navbar-nav">
                        

                  
                        <li class="dropdown notifications-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                            <i class="fa fa-bell-o"></i>
                            <span class="label label-warning">10</span>
                        </a>
                        <ul class="dropdown-menu">
                            <li class="header">You have 10 notifications</li>
                            <li>
                            <ul class="menu">
                                <li>
                                <a href="#">
                                    <i class="fa fa-users text-aqua"></i> 5 new members joined today
                                </a>
                                </li>
                                <li>
                                <a href="#">
                                    <i class="fa fa-warning text-yellow"></i> Very long description here that may not fit into the
                                    page and may cause design problems
                                </a>
                                </li>
                                <li>
                                <a href="#">
                                    <i class="fa fa-users text-red"></i> 5 new members joined
                                </a>
                                </li>
                                <li>
                                <a href="#">
                                    <i class="fa fa-shopping-cart text-green"></i> 25 sales made
                                </a>
                                </li>
                                <li>
                                <a href="#">
                                    <i class="fa fa-user text-red"></i> You changed your username
                                </a>
                                </li>
                            </ul>
                            </li>
                            <li class="footer"><a href="#">View all</a></li>
                        </ul>
                        </li>


                        <li class="dropdown tasks-menu open">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                            <i class="fa fa-flag-o"></i>
                            <span class="label label-danger">9</span>
                            </a>
                            
                        </li>


                        <li class="dropdown user user-menu">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <span class="hidden-xs">Ariyanto</span>
                            </a>
                            <ul class="dropdown-menu">
                            <li class="user-header">
                                <p>
                                Ariyanto - Developer
                                <small>Member since Nov. 2012</small>
                                </p>
                            </li>
                            <li class="user-body">
                                <div class="row">
                                <div class="col-xs-4 text-center">
                                    <a href="#">Followers</a>
                                </div>
                                <div class="col-xs-4 text-center">
                                    <a href="#">Sales</a>
                                </div>
                                <div class="col-xs-4 text-center">
                                    <a href="#">Friends</a>
                                </div>
                                </div>
                            </li>
                            <li class="user-footer">
                                <div class="pull-left">
                                <a href="#" class="btn btn-default btn-flat">Profile</a>
                                </div>
                                <div class="pull-right">
                                <a href="#" onClick= {this.logout.bind(this)} class="btn btn-default btn-flat">Sign out</a>
                                </div>
                            </li>
                            </ul>
                        </li>

                        <li>
                            <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
                        </li>

                        </ul>
                    </div>
                    </nav>
                </header>
      
        )
    }

}