import React from 'react';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Player from 'components/partials/Player';
import { faMusic, faToolbox, faSignOutAlt, faUpload } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar(props) {

    function logout() {
        localStorage.clear();
        this.props.history.push("/");
    }

    return (
        <React.Fragment>
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3> <img src={require('../../image/drum.svg')} width="30" height="30" alt="logo"/> Hiren Music</h3>
                    <strong> <img src={require('../../image/drum.svg')} width="40" height="50" alt="logo"/></strong>
                </div>

                <ul className="list-unstyled components">
                    <li>
                        <NavLink to="/tracks">
                            <FontAwesomeIcon icon={faMusic} /> Tracks
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/upload">
                            <FontAwesomeIcon icon={faUpload} /> Upload
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/settings">
                            <FontAwesomeIcon icon={faToolbox}/> Settings
                        </NavLink>
                    </li>
                    <li>
                        <NavLink onClick={logout} to='#'>
                            <FontAwesomeIcon icon={faSignOutAlt}/> Logout
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <Player/>
        </React.Fragment>
    )
}

