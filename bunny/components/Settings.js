/**
 * Created by prism on 3/24/17.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from "react-helmet";
import axios from 'axios';
import { observer } from "mobx-react";
import { browserHistory } from 'react-router';

@observer
export default class Settings extends React.Component {

    componentDidMount(){
        this.props.route.settings.getData();
    }

    render() {
        if(this.props.route.settings.loaded){
          return (
            <div >
                <div className="row">
                    <Helmet
                        title="Hiren-Music: Settings"
                    />
                </div>
                form
            </div>
        )}

        return (
            <div>Loading........</div>
        )

       }
}