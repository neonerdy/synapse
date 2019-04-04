
import React, {Component} from 'react';
import {Link,NavLink} from 'react-router-dom';

export class NavBar extends Component {

  

  statusClick =(status)=> {
    alert(status);
  }


    render() {



        return(

            <aside class="main-sidebar">
            <section class="sidebar">


            
              <ul class="sidebar-menu" data-widget="tree">
            
           
                <li class="header">MAIN NAVIGATION</li>
             
                <li>
                  <Link to="/dashboard">
                      <i class="fa fa-desktop"></i>
                      <span>Dashboard</span>
                  </Link>
                </li>

                <li>
                  <Link to="/project">
                    <i class="fa fa-calendar-check-o"></i>
                    <span>Projects</span>
                  </Link>
                </li>

                <li>
                  <Link to="/people">
                    <i class="fa fa-user"></i>
                    <span>People</span>
                   
                  </Link>
                </li>

                <li>
                  <Link to="/document">
                    <i class="fa fa-files-o"></i>
                    <span>Documents</span>
                   
                  </Link>
                </li>

                <li>
                  <Link to="/bug">
                    <i class="fa fa-clone"></i>
                    <span>Bugs</span>
                   
                  </Link>
                </li>


          {/*}
           
                 <li class="active treeview menu-open">
               
          <a href="#">
            <i class="fa fa-clone"></i> <span>Bugs</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>

          <ul class="treeview-menu">
            <li><Link to="/bug/All"><i class="fa fa-circle-o text-grey"></i>All Issues</Link></li>
            <li><Link to="/bug/New"><i class="fa fa-circle-o text-blue"></i>New</Link></li>
           <li><a href="javascript: return false;" onClick={()=>this.statusClick("Coding")}><i class="fa fa-circle-o text-orange"></i>Coding</a></li>
            <li><a href="javascript: return false;" onClick={()=>this.statusClick("Resolved")}><i class="fa fa-circle-o text-green"></i>Resolved</a></li>
            <li><a href="javascript: return false;"><i class="fa fa-circle-o text-purple"></i>Testing</a></li>
            <li><a href="javascript: return false;"><i class="fa fa-circle-o text-maroon"></i>Rework</a></li>
            <li><a href="javascript: return false;"><i class="fa fa-circle-o text-aqua"></i>Closed</a></li>
           
            
          </ul>
      

        </li>

              {*/} 
        
              </ul>
            </section>
          </aside>

        )
    }
}