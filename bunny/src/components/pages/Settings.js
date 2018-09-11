import React from 'react';
import { NavLink } from "react-router-dom";
import Sidebar from './../layouts/Sidebar';
import Navbar from './../layouts/Navbar';
import '../../css/dashboard.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faToolbox, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";


export default class Settings extends React.Component {

    componentDidMount() {
        if (!localStorage.getItem("token"))
            this.props.history.push("/");

        document.title = "Hiren-Music: Settings";
    }

    render() {
        return (
            <div className="wrapper">
                <Sidebar/>
                <div id="content">
                    <Navbar/>
                    <div className="card shadow-lg">
                        <h6 className="card-header text-left">
                            Backblaze B2
                        </h6>
                        <div className="card-body">
                            <h5 className="card-title ">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional
                                content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

