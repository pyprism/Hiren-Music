import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from "react-helmet";


export default class Upload extends React.Component {

    upload(e) {
        e.preventDefault();
        let data = new FormData();
        data.append('name', ReactDOM.findDOMNode(this.refs.name).value);
        data.append('album', ReactDOM.findDOMNode(this.refs.album).value);
        data.append('playlist', 1);
        data.append('file', ReactDOM.findDOMNode(this.refs.file).files[0]);
        $.ajax({
            url: '/api/music/',
            method: 'post',
            headers: {
                'Authorization': 'JWT ' + sessionStorage.getItem('token')
            },
            contentType: false,
            data: data,
            processData: false
        }).done(function (res) {
            $.notify("Music Saved", "success");
        }).fail(function (error) {
            if (error.responseText)
                sweetAlert("Oops!", error.responseText, "error");
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
