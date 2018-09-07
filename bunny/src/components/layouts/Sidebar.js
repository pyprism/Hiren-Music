import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <nav id="sidebar">
            <div className="sidebar-header">
                    <h3> <img src={require('../../image/drum.svg')} width="30" height="30" alt="logo"/> Hiren Music</h3>
                    <strong> <img src={require('../../image/drum.svg')} width="30" height="30" alt="logo"/></strong>
            </div>

            <ul className="list-unstyled components">
                <li className="active">
                    <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                        <i className="fas fa-home"/>
                        Home
                    </a>
                    <ul className="collapse list-unstyled" id="homeSubmenu">
                        <li>
                            <a href="#">Home 1</a>
                        </li>
                        <li>
                            <a href="#">Home 2</a>
                        </li>
                        <li>
                            <a href="#">Home 3</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#">
                        <i className="fas fa-briefcase"/>
                        About
                    </a>
                    <a href="#pageSubmenu">
                        <i className="fas fa-copy"/>
                        Pages
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fas fa-image"/>
                        Portfolio
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fas fa-question"/>
                        FAQ
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fas fa-paper-plane"/>
                        Contact
                    </a>
                </li>
            </ul>
        </nav>
    )
}

