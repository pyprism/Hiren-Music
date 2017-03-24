/**
 * Created by prism on 3/24/17.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class SettingsEdit extends React.Component {
    /**
     *  Handle bucket settings creation
     * @param e
     */
    form(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: '/api/bucket/',
            headers: {
                'Authorization': "JWT " + localStorage.getItem('token')
            },
            data: {
                'bucket_id': ReactDOM.findDOMNode(this.refs.bucket_id).value,
                'bucket_dir': ReactDOM.findDOMNode(this.refs.bucket_dir).value
            }
        }).then(function(response){
            console.log(response);
            sweetAlert("Saved", "Saved Successfully", "success");
        }).catch(function (err) {
            if(err.statusText === 'Forbidden') {
                sweetAlert("Oops!", 'Token Expired, Log Out Please !', "error");
            }else {
                console.error(err);
                sweetAlert('Error', err.statusText, 'error');
            }
        })
    }

    render() {
        return(
            <form className="form-horizontal" id="form" onSubmit={this.form.bind(this)}>
                <div className="form-group" >
                    <label className="control-label col-sm-2" > Bucket ID </label>
                    <div className="col-sm-10">
                        <input className="form-control" type="text" required autoFocus ref="bucket_id" placeholder="Bucket ID" />
                    </div>
                </div>
                <div className="form-group" >
                    <label className="control-label col-sm-2" > Bucket Directory </label>
                    <div className="col-sm-10">
                        <input className="form-control" type="text" required ref="bucket_dir" placeholder="Bucket Directory Name" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-default" ><i className="fa fa-save" /> Save</button>
                    </div>
                </div>
            </form>
        )
    }
}