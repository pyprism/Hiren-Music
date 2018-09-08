import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import '../../css/dashboard.css';

export default class Content extends React.Component {

    componentDidMount() {
        if(!localStorage.getItem("token"))
            this.props.history.push("/");

        document.title = "Hiren-Music: Music";

        const $ = window.$;
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
        });
    }

    render() {
        return (
            <div className="wrapper">
                <Sidebar/>
                <div id="content">
                    <Navbar/>
                    bunny
                </div>
            </div>
        )
    }
}
