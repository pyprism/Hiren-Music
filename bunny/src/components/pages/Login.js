import React, {Component} from 'react';
import '../../css/auth.css';

export default class Login extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <div className="lowin lowin-blue">
                <div className="lowin-brand">
                    <img src={require('../../image/drum.svg')} alt="logo"/>
                </div>
                <div className="lowin-wrapper">
                    <div className="lowin-box lowin-login">
                        <div className="lowin-box-inner">
                            <form>
                                <p>Sign in to continue</p>
                                <div className="lowin-group">
                                    <label>Email <a href="#" className="login-back-link">Sign in?</a></label>
                                    <input type="text" name="username" className="lowin-input"/>
                                </div>
                                <div className="lowin-group password-group">
                                    <label>Password </label>
                                    <input type="password" name="password" autoComplete="current-password"
                                           className="lowin-input"/>
                                </div>
                                <button className="lowin-btn login-btn">
                                    Sign In
                                </button>

                                <div className="text-foot">
                                    Don't have an account? <a href="" className="register-link">Register</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

