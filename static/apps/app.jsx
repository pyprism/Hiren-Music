import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import Login from './components/Login.jsx';
import Main from './components/Main.jsx';
import Dashboard from './components/Dashboard.jsx';
import Upload from './components/Upload.jsx';
import axios from 'axios';
import Album from './components/Album.jsx';
import Albums from './components/Albums.jsx';
import AlbumCreate from './components/AlbumUpload.jsx';
import Tracks from './store/Tracks.jsx';


function authRequired(nextState, replace) {
    let token = sessionStorage.getItem('token');
    if (token) {
        axios({
            method: 'post',
            url: '/api-token-verify/',
            data: {
                'token': token
            }
        }).catch(function(response) {
            replace('/');
            sweetAlert("Oops!", 'Token Expired', "info");
        });
    } else {
        replace('/');
    }

}

const appState = new Tracks();

ReactDOM.render(
    <Router history={browserHistory} >
        <Route path="/" component={Login} />
        <Route path="/dashboard" onEnter={authRequired} component={Main}>
            <IndexRoute  component={Dashboard}/>
            <Route path="albums" component={Albums} />
            <Route path="album/create" component={AlbumCreate} />
            <Route path="album/:id" component={Album} appState={appState}/>
            <Route path="album/:id/upload"  component={Upload} />
            <Route path="stats"  component={Dashboard} />
        </Route>
    </Router>,
    document.getElementById('app')
);