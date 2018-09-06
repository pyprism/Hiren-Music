import React, {Component} from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert2'
import '../../css/auth.css';


export default class Register extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            repeat_password: ""
        }
    }

    componentDidMount() {
        document.title = "Hiren-Music: Register";
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleRepeatPasswordChange(event) {
        this.setState({repeat_password: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if((this.state.password).length <=0 || (this.state.repeat_password).length <= 0) {
            return;
        }
        if((this.state.username).length <=0 ) {
            return;
        }
        if(this.state.password !== this.state.repeat_password) {
            this.setState({password: "", repeat_password: ""});
            swal('Oops...', "Repeat password didn't match", 'error');
            return;
        }
        let formData = new FormData();
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);
        formData.append('repeat_password', this.state.repeat_password);
        fetch('/api/base/register/', {
            body: formData,
            method: 'post'
        }).then(function (data) {
            return data.json();
        }).then(function (data) {
            if(data.bugs) {
                this.setState({username: "", password: "", repeat_password: ""});
                swal("Success", "Registration successful", "success");
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

        const {username, password, repeat_password} = this.state;

        return (
            <div className="lowin lowin-blue">
                <div className="lowin-brand">
                    <img src={require('../../image/drum.svg')} alt="logo"/>
                </div>
                <div className="lowin-wrapper">
                    <div className="lowin-box lowin-register">
                        <div className="lowin-box-inner">
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <p>Let's create your account</p>
                                <div className="lowin-group">
                                    <label>Username</label>
                                    <input type="text" value={username} autoFocus onChange={this.handleUsernameChange.bind(this)} className="lowin-input"/>
                                </div>
                                <div className="lowin-group">
                                    <label>Password</label>
                                    <input type="password" value={password} onChange={this.handlePasswordChange.bind(this)} className="lowin-input"/>
                                </div>
                                <div className="lowin-group">
                                    <label>Repeat Password</label>
                                    <input type="password" value={repeat_password} onChange={this.handleRepeatPasswordChange.bind(this)}
                                           className="lowin-input"/>
                                </div>
                                <button className="lowin-btn">
                                    Sign Up
                                </button>

                                <div className="text-foot">
                                    Already have an account? <Link to="/" className="login-link">Login</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


