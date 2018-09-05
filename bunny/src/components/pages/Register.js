import React, {Component} from 'react';
import '../../css/auth.css';


export default class Register extends Component {
    render() {
        return (
            <div className="lowin lowin-blue">
                <div className="lowin-brand">
                    <img src={require('../../image/drum.svg')} alt="logo"/>
                </div>
                <div className="lowin-wrapper">
                <div className="lowin-box lowin-register">
                        <div className="lowin-box-inner">
                            <form>
                                <p>Let's create your account</p>
                                <div className="lowin-group">
                                    <label>Name</label>
                                    <input type="text" name="name" autoComplete="name" className="lowin-input"/>
                                </div>
                                <div className="lowin-group">
                                    <label>Email</label>
                                    <input type="email" autoComplete="email" name="email" className="lowin-input"/>
                                </div>
                                <div className="lowin-group">
                                    <label>Password</label>
                                    <input type="password" name="password" autoComplete="current-password"
                                           className="lowin-input"/>
                                </div>
                                <button className="lowin-btn">
                                    Sign Up
                                </button>

                                <div className="text-foot">
                                    Already have an account? <a href="" className="login-link">Login</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


