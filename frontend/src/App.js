import React, {Component} from 'react';
import logo from './components/logo.svg';
import './App.css';
import {Login} from "./components/Login";
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import Drawer from './components/Drawer';
import { Redirect } from 'react-router-dom';
import { SignUp } from './components/SignUp';



class App extends Component {

    constructor(props) {
        super(props); 
    
    }

    render() {

        return (

            <Router>
                <Switch>
                    <Route  path="/"
                    component={Login} exact> </Route>
                    
                    <Route  path="/signup"
                    component={SignUp} exact> </Route>

                    <Route  path="/todo"
                        component={Drawer} exact> </Route>

                    <Route path="/logout" render={()=>{
                        localStorage.clear();
                        this.props.history.push("/");
                        }} exact />
                </Switch>
            
            </Router>
        );

    }
}
export default App;
