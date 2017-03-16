import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Login} from './components/Login';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';


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

// class HelloMessage extends React.Component {
//   render() {
//     return <div>Hello {this.props.name}</div>;
//   }
// }
//
// ReactDOM.render(<HelloMessage name="Naima" />, document.getElementById('app'));

ReactDOM.render(
    <Router>
        <Route path="/" component={Login}/>
    </Router>,
    document.getElementById('app')
);

