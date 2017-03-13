import React from 'react';
import {Link} from 'react-router';
import Helmet from "react-helmet";
import axios from 'axios';
import { browserHistory } from 'react-router';
import {observer} from "mobx-react";
import { observable } from 'mobx';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

@observer
export default class Album extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount ()  {
        this.props.route.appState.album(this.props.params.id);
    }

    render() {
        return (
            <div>
                <Helmet
                    title="Music: Album"
                />
                <div className="col-sm-4 text-center col-md-offset-4">
                    <Link to={"/dashboard/album/" + this.props.params.id + "/upload/"} className="btn btn-default"><span className="fa fa-music" /> Add New Music File</Link>
                </div>
                <br/>
                <hr/>
                <BootstrapTable data={this.props.route.appState.tracks} striped={true} hover={true}>
                    <TableHeaderColumn dataField="id" isKey={true} >ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="name" >Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="favorite" >Favorite</TableHeaderColumn>
                    <TableHeaderColumn dataField="offline" >Offline</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}