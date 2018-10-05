import React from 'react';
import Navbar from 'components/layouts/Navbar';
import Sidebar from 'components/layouts/Sidebar';


const DashboardLayout = props => ({
    render() {
        return (
            <div className="wrapper">
                 <Sidebar/>
                <div id="content">
                    <Navbar/>
                    {props.children}
                </div>
            </div>
        )
    }
});

export default DashboardLayout;
