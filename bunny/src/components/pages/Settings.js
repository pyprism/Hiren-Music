import React from 'react';
import Sidebar from 'components/layouts/Sidebar';
import Navbar from 'components/layouts/Navbar';
import B2 from 'components/partials/B2';
import Storage from 'components/partials/Storage';
import 'css/dashboard.css';
import sidebarCollapse from 'utils/sidebarCollapse';


export default class Settings extends React.Component {

    componentDidMount() {
        if (!localStorage.getItem("token"))
            this.props.history.push("/");
        sidebarCollapse();
        document.title = "Hiren-Music: Settings";
    }

    render() {
        return (
            <div className="wrapper">
                <Sidebar/>
                <div id="content">
                    <Navbar/>
                    <B2/>
                    <Storage/>
                </div>
            </div>
        )
    }
}

