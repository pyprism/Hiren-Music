import React, {Component} from 'react';
import { Link, Redirect } from "react-router-dom";
import swal from 'sweetalert2'
import '../../css/auth.css';

export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
        }
    }

    componentDidMount() {
        document.title = "Hiren-Music: Login";
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if((this.state.password).length <=0 || (this.state.username).length <= 0) {
            return;
        }
        let formData = new FormData();
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);
        fetch('/api/base/login/', {
            body: formData,
            method: 'post'
        }).then(function (data) {
            return data.json();
        }).then(function (data) {
            if(data.token) {
                localStorage.setItem("token", data.token);
                <Redirect to="/dashboard"/>
            } else if(data.error) {
                this.setState({username: "", password: "", repeat_password: ""});
                swal("Error", data.error, "error");
            } else if(data["f**k"])
                swal("Warning", "Not valid data!", "warning");
        }.bind(this)).catch((error) => {
            swal("Error", "check console", "error");
            console.log(error);
        });

    }

    render() {
        const {username, password} = this.state;

        return (
            <div className="lowin lowin-blue">
                <div className="lowin-brand">
                    <img src={require('../../image/drum.svg')} alt="logo"/>
                </div>
                <div className="lowin-wrapper">
                    <div className="lowin-box lowin-login">
                        <div className="lowin-box-inner">
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <p>Sign in to continue</p>
                                <div className="lowin-group">
                                    <label>Username</label>
                                    <input type="text" value={username} autoFocus onChange={this.handleUsernameChange.bind(this)} className="lowin-input"/>
                                </div>
                                <div className="lowin-group password-group">
                                    <label>Password </label>
                                    <input type="password" value={password} onChange={this.handlePasswordChange.bind(this)}
                                           className="lowin-input"/>
                                </div>
                                <button className="lowin-btn login-btn">
                                    Sign In
                                </button>

                                <div className="text-foot">
                                    Don't have an account? <Link to="/register" className="register-link">Register</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

