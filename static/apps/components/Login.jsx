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
        }).then(function (response) {
            if (response.data['token']) {
                sessionStorage.setItem('token', response.data['token']);
                browserHistory.push('/dashboard/');
            }
        })
            .catch(function (response) {
                sweetAlert("Oops!", response.data.non_field_errors[0], "error");
            });
    }

    render () {
        return <div className="login">
            <Helmet
                title="Hiren-Music: Login"
                link={[
                    {"rel": "stylesheet", "href": "/static/css/login.css"},
                    {"rel": "icon", "href": "/static/favicon.ico"},
                    {"rel": "stylesheet", "type": "text/css", "href": "/static/bower/sweetalert/dist/sweetalert.css"}

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