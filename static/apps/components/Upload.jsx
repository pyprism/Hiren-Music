import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from "react-helmet";
import axios from 'axios';


export default class Upload extends React.Component {

    upload(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: '/api/music/',
            headers: {
                'Authorization': 'JWT ' + sessionStorage.getItem('token'),
                'Content-Type': 'multipart/form-data'
            },
            data: {
                'name': ReactDOM.findDOMNode(this.refs.name).value,
                'album': ReactDOM.findDOMNode(this.refs.album).value,
                'files': ReactDOM.findDOMNode(this.refs.file).value
            }
        }).then(function (response) {
            console.log(response);
        }).catch(function (response) {
            console.log(response);
        });
    }


render() {
    return (
        <div>
            <form onSubmit={this.upload.bind(this)}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" required ref="name" placeholder="Title" />
                </div>
                <div className="form-group">
                    <label>Album</label>
                    <input type="text" className="form-control" ref="album" placeholder="Album Name"/>
                </div>
                <div className="form-group btn btn-default btn-file">
                    <input type="file"  ref="file" />
                </div>
                <button type="submit" className="btn btn-default"><i className="fa fa-bookmark"> Save</i></button>
            </form>
        </div>
    )
}
}