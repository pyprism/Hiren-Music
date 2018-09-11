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
                    <div className="card">
                        <div className="card-header">
                            Blackbaze B2
                        </div>
                        <div className="card-body">
                            This is some text within a card body.
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

