/**
 * Created by prism on 3/16/17.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from "react-helmet";
import axios from 'axios';
import { browserHistory } from 'react-router';


export default class Login extends React.Component {

    login(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: '/api-token-auth/',
            data: {
                'username': ReactDOM.findDOMNode(this.refs.username).value,
                'password': ReactDOM.findDOMNode(this.refs.password).value
            }
        }).then(function(response) {
            if (response.data['token']) {
                localStorage.setItem('token', response.data['token']);
                browserHistory.push('/music/all');
            }
        }).catch(function (response) {
                sweetAlert("Oops!", 'Username/Password is not valid! ', "error");
        });
    }

    render () {
        return <div className="login">
            <Helmet
                title="Hiren-Movie: Login"
                link={[
                    {"rel": "stylesheet", "href": "/static/css/login.css"},
                    {"rel": "icon", "href": "/static/favicon.ico"},
                    {"rel": "stylesheet", "type": "text/css", "href": "/static/css/sweetalert.css"}
                ]}
            />
            <form onSubmit={this.login.bind(this)}>

                <label>
                    <input type="text" required ref="username"/>
                    <div className="label-text">User name</div>
                </label>
                <label>
                    <input type="password" required ref="password"/>
                    <div className="label-text">Password</div>
                </label>
                <button className="button" type="submit" > Login </button>
            </form>

        </div>
    }
}