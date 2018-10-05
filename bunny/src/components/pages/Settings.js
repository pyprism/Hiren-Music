import React from 'react';
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
            <React.Fragment>
                <B2/>
                <span/>
                <Storage/>
            </React.Fragment>
        )
    }
}

