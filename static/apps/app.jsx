import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import Login from './components/Login.jsx';
import Main from './components/Main.jsx';
import Dashboard from './components/Dashboard.jsx';
import Upload from './components/Upload.jsx';
import axios from 'axios';
import Album from './components/Album.jsx';
import AlbumCreate from './components/AlbumUpload.jsx';


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

ReactDOM.render(
    <Router history={browserHistory} >
        <Route path="/" component={Login} />
        <Route path="/dashboard" onEnter={authRequired} component={Main}>
            <IndexRoute  component={Dashboard}/>
            <Route path="albums" component={Album} />
            <Route path="album/create" component={AlbumCreate} />
            <Route path="stats"  component={Dashboard} />
            <Route path="upload"  component={Upload} />
        </Route>
    </Router>,
    document.getElementById('app')
);