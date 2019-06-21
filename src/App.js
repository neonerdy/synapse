import React, { Component } from 'react';
import { Header } from './Header';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { Project } from './Project';
import { Task } from './Task';
import { Dashboard } from './Dashboard';
import { AddProject } from './AddProject';
import { AddTask } from './AddTask';
import { Route } from 'react-router-dom';
import { TaskDetail } from './TaskDetail';
import { People } from './People';
import { AddPeople } from './AddPeople';
import { Document } from './Document';
import { AddDocument } from './AddDocument';
import { EditPeople } from './EditPeople';
import { EditProject } from './EditProject';
import { EditDocument } from './EditDocument';
import { EditTask } from './EditTask';
import { Login } from './Login';


class App extends Component {
  render() {
    return (
      <div>
          
            
          <Route exact path="/" component={Login}/>
          <Route path="/dashboard" component={Dashboard}/> 
          <Route path="/project" component={Project}/> 
          <Route path="/people" component={People}/> 
          <Route path="/document" component={Document}/> 
          <Route path="/task" component={Task}/> 
          <Route path="/task-detail/:id" component={TaskDetail}/> 
          <Route path="/add-project" component={AddProject}/>
          <Route path="/add-people" component={AddPeople}/>
          <Route path="/add-document" component={AddDocument}/>
          <Route path="/add-task" component={AddTask}/>
          <Route path="/edit-people/:id" component={EditPeople}/>
          <Route path="/edit-project/:id" component={EditProject}/>
          <Route path="/edit-document/:id" component={EditDocument}/>
          <Route path="/edit-task/:id" component={EditTask}/>
          
          
         
      </div>
    );
  }
}

export default App;
