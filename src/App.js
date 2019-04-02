import React, { Component } from 'react';
import { Header } from './Header';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { Project } from './Project';
import { Bug } from './Bug';
import { Dashboard } from './Dashboard';
import { AddProject } from './AddProject';
import { AddBug } from './AddBug';
import {Route} from 'react-router-dom';
import { BugDetail } from './BugDetail';
import { People } from './People';
import { AddPeople } from './AddPeople';
import { Document } from './Document';
import { AddDocument } from './AddDocument';
import { EditPeople } from './EditPeople';
import { EditProject } from './EditProject';
import { EditDocument } from './EditDocument';


class App extends Component {
  render() {
    return (
      <div>
          
            
          <Route exact path="/" component={Dashboard}/>
          <Route path="/dashboard" component={Dashboard}/> 
          <Route path="/project" component={Project}/> 
          <Route path="/people" component={People}/> 
          <Route path="/document" component={Document}/> 
          <Route path="/bug" component={Bug}/> 
          <Route path="/bug/:status" component={Bug}/> 
          <Route path="/bug-detail/:id" component={BugDetail}/> 
          <Route path="/add-project" component={AddProject}/>
          <Route path="/add-people" component={AddPeople}/>
          <Route path="/add-document" component={AddDocument}/>
          <Route path="/add-bug" component={AddBug}/>
          <Route path="/edit-people/:id" component={EditPeople}/>
          <Route path="/edit-project/:id" component={EditProject}/>
          <Route path="/edit-document/:id" component={EditDocument}/>
          
         
      </div>
    );
  }
}

export default App;
