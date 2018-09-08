import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
    return (
        <nav id="sidebar">
            <div className="sidebar-header">
                    <h3> <img src={require('../../image/drum.svg')} width="30" height="30" alt="logo"/> Hiren Music</h3>
                    <strong> <img src={require('../../image/drum.svg')} width="40" height="50" alt="logo"/></strong>
            </div>

            <ul className="list-unstyled components">
                <li className="active">
                    <NavLink to="/music" activeClassName="active" >
                        <FontAwesomeIcon icon={faHome} /> Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="#" activeClassName="active">
                        <i className="fas fa-briefcase"/>
                        About
                    </NavLink>
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

