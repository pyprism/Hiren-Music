import React from 'react';
import {Link} from 'react-router';
import Helmet from "react-helmet";
import axios from 'axios';
import { browserHistory } from 'react-router';

export default class Album extends React.Component {

    album(){
        //e.preventDefault();
        axios({
            method: 'get',
            url: '/api/album/' + this.props.params.id + '/',
            headers: {
                'Authorization': 'JWT ' + sessionStorage.getItem('token')
            }
        }).then(function (response) {
            console.log(response);
        }).catch(function (response) {
            console.log(response);
            sweetAlert("Oops!", response.data, "error");
        });
    }

    render() {
        console.log(this.props.params.id);
        return (
            <div>
                <Helmet
                    title="Music: Album"
                />
                Album
                {this.album()}
            </div>
        )
    }
}