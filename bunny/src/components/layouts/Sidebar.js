import React from 'react';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faToolbox, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
    return (
        <nav id="sidebar">
            <div className="sidebar-header">
                    <h3> <img src={require('../../image/drum.svg')} width="30" height="30" alt="logo"/> Hiren Music</h3>
                    <strong> <img src={require('../../image/drum.svg')} width="40" height="50" alt="logo"/></strong>
            </div>

            <ul className="list-unstyled components">
                <li className="active">
                    <NavLink to="/music">
                        <FontAwesomeIcon icon={faHome} /> Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/settings">
                        <FontAwesomeIcon icon={faToolbox}/> Settings
                    </NavLink>
                </li>
                <li>
                    <NavLink to="#">
                        <FontAwesomeIcon icon={faSignOutAlt}/> Logout
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
