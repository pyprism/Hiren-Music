import React from 'react';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft, faAlignJustify, faMusic, faServer, faUserAlt } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">

                <button type="button" id="sidebarCollapse" className="btn btn-info">
                    <FontAwesomeIcon icon={faAlignLeft} />
                </button>
                <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <FontAwesomeIcon icon={faAlignJustify} />
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/tracks">
                                <FontAwesomeIcon icon={faMusic} /> Tracks</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/albums" activeClassName="active" >
                                <FontAwesomeIcon icon={faServer} /> Albums</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="#" activeClassName="active">
                                <FontAwesomeIcon icon={faUserAlt} /> Artists</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
