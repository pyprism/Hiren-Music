import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import DashboardLayout from 'components/layouts/DashboardLayout';
import Settings from "components/pages/Settings";
import Tracks from 'components/pages/Tracks';
import B2Create from 'components/pages/B2Create';
import Upload from 'components/pages/Upload';
import Albums from 'components/pages/Albums';
import Musicians from 'components/pages/Musicians';
import audioPlayer from 'utils/audioPlayer';


class App extends Component {
    render() {
        return (
            <Router>
                <DashboardLayout>
                    <Switch>
                        <Route path="/music/tracks" render={(props) => <Tracks {...props} track={audioPlayer} />} />
                        <Route path="/music/settings" component={Settings} />
                        <Route path="/music/B2" component={B2Create} />
                        <Route path="/music/upload" component={Upload} />
                        <Route path="/music/albums" component={Albums} />
                        <Route path="/music/musicians" component={Musicians} />
                    </Switch>
                </DashboardLayout>
            </Router>
        );
    }
}

export default App;
