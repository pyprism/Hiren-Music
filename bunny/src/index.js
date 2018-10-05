import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Login from "components/pages/Login";
import registerServiceWorker from './registerServiceWorker';
import Register from "components/pages/Register";

class Index extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path="/" exact component={Login} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/music" component={App} />
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
