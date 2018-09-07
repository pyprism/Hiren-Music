import React, {Component} from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Content from './components/layouts/Content';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path="/" exact component={Login} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/dashboard" exact component={Content} />
                </div>
            </Router>
        );
    }
}

export default App;
