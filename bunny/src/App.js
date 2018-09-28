import React, {Component} from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Login from "components/pages/Login";
import Register from "components/pages/Register";
import Settings from "components/pages/Settings";
import Tracks from 'components/pages/Tracks';
import B2Create from 'components/pages/B2Create';
import Upload from 'components/pages/Upload';
import Albums from 'components/pages/Albums';
import Musicians from 'components/pages/Musicians';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path="/" exact component={Login} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/tracks" exact component={Tracks} />
                    <Route path="/settings" exact component={Settings} />
                    <Route path="/B2" exact component={B2Create} />
                    <Route path="/upload" exact component={Upload} />
                    <Route path="/albums" exact component={Albums} />
                    <Route path="/musicians" exact component={Musicians} />
                </div>
            </Router>
        );
    }
}

export default App;
