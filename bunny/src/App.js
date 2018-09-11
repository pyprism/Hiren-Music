import React, {Component} from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Settings from "./components/pages/Settings";
import Content from './components/layouts/Content';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path="/" exact component={Login} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/music" exact component={Content} />
                    <Route path="/settings" exact component={Settings} />
                </div>
            </Router>
        );
    }
}

export default App;
