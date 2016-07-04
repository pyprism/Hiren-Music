import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from "react-helmet";
import axios from 'axios';
import { browserHistory } from 'react-router';


export default class AlbumCreate extends React.Component {

    upload(e) {
        e.preventDefault();
        let data = new FormData();
        data.append('name', ReactDOM.findDOMNode(this.refs.name).value);
        data.append('file', ReactDOM.findDOMNode(this.refs.file).files[0]);
        axios({
            method: 'post',
            url: '/api/album/',
            headers: {
                'Authorization': 'JWT ' + sessionStorage.getItem('token')
            },
            data: data
        }).then(function (response) {
            console.log(response);
            if(response.status == 201 )
                browserHistory.push('/dashboard/album/' + response.data['id']);
        }).catch(function (response) {
            console.log(response);
            sweetAlert("Oops!", response.data, "error");
        });
    }

    render() {
        return (
            <div>
                <Helmet
                    title="Music: Create Album"
                />
                <form onSubmit={this.upload.bind(this)}>
                    <div className="form-group">
                        <label>Album Name</label>
                        <input type="text" className="form-control" required ref="name" placeholder="Title" />
                    </div>
                    <div className="form-inline">
                        <div className="form-group">
                            <label className="btn btn-default btn-file">
                                <span className="fa fa-file-picture-o"/> Cover Art <input type="file" ref="file"  style={{display: 'none'}} />
                            </label>
                        </div>
                    </div>

                    <br/>
                    <button type="submit" className="btn btn-default"><i className="fa fa-bookmark"> Save</i></button>
                </form>
            </div>
        )
    }
}