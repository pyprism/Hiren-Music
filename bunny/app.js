import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Login from './components/Login';
import Settings from './components/Settings';
import All from './components/All';
import Main from './components/Main';
import {settings} from './stores/settings';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';


function refresh() {
    let token = localStorage.getItem('token');
    if(token){
        axios({
            method: 'post',
            url: '/api-token-refresh/',
            data: {
                'token': token
            }
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.error(error);
            sweetAlert("Oops!", error.statusText, "error");
        });
    }
}

setInterval(refresh(), 60 * 60);

function authRequired(nextState, replace) {
    let token = localStorage.getItem('token');
    if (token) {
        axios({
            method: 'post',
            url: '/api-token-verify/',
            data: {
                'token': token
            }
        }).then(function (res) {

        }).catch(function(response) {
            replace('/');
            sweetAlert("Oops!", 'Token Expired', "error");
        });
    } else {
        replace('/');
    }

}


var conf = new settings();

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Login}/>
        <Route path="/music" onEnter={authRequired}  component={Main}>
            <IndexRoute component={All}/>
            <Route path="all" component={All} />
            <Route path="settings" settings={conf} component={Settings} />
        </Route>
    </Router>,
    document.getElementById('app')
);

