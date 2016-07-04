import React from 'react';
import {Link} from 'react-router';
import Helmet from "react-helmet";

export default class Albums extends React.Component {
    render() {
        return (
            <div>
                <Helmet
                    title="Music: Albums"
                />
                <p>
                    <Link to="/dashboard/album/create/" class="btn btn-default"><span className="fa fa-music" /> Create New Album</Link>
                </p>
            </div>
        )
    }
}