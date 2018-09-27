import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import sidebarCollapse from 'utils/sidebarCollapse';
import 'css/dashboard.css';

export default class Tracks extends React.Component {

    componentDidMount() {
        if(!localStorage.getItem("token"))
            this.props.history.push("/");

        document.title = "Hiren-Music: Music";

        sidebarCollapse();
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
