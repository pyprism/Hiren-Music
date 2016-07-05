import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from "react-helmet";
import axios from 'axios';


export default class Upload extends React.Component {

    upload(e) {
        e.preventDefault();
        let data = new FormData();
        data.append('name', ReactDOM.findDOMNode(this.refs.name).value);
        data.append('album', this.props.params.id);
        data.append('file', ReactDOM.findDOMNode(this.refs.file).files[0]);
        axios({
            url: '/api/music/',
            method: 'post',
            headers: {
                'Authorization': 'JWT ' + sessionStorage.getItem('token')
            },
            data: data
        }).then(function (response) {
            console.log(response);
            $.notify("Music Saved", "success");
        }).catch(function (response) {
            console.error(response);
            sweetAlert("Oops!", response.data, "error");
        });
    }


    render() {
        return (
            <div>
                <Helmet
                    title="Music: Upload Music"
                />
                <form onSubmit={this.upload.bind(this)}>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" className="form-control" required ref="name" placeholder="Title" />
                    </div>
                    <div className="form-inline">
                        <div className="form-group">
                            <label className="btn btn-default btn-file">
                                <span className="fa fa-file-audio-o"/> Music File <input type="file" ref="file"  required style={{display: 'none'}} />
                            </label>
                        </div>
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-default"><i className="fa fa-upload"> Upload</i></button>
                </form>
            </div>
        )
    }
}
