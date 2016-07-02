import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from "react-helmet";

export default class Album extends React.Component {
	render() {
        return (
        	<div>
        		<form onSubmit={this.upload.bind(this)}>
                    <div className="form-group">
                        <label>Album Name</label>
                        <input type="text" className="form-control" required ref="name" placeholder="Title" />
                    </div>
                    <div className="form-group">
                        <label>Cover Art</label>
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