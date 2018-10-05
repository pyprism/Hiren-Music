import React from 'react';
import Sidebar from 'components/layouts/Sidebar';
import Navbar from 'components/layouts/Navbar';
import sidebarCollapse from 'utils/sidebarCollapse';
import swal from 'sweetalert2';


export default class B2Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            app_key: "",
            app_key_id: "",
            upload: false
        }
    }

    componentDidMount() {
        if(!localStorage.getItem("token"))
            this.props.history.push("/");

        document.title = "Hiren-Music: Add B2 Account";

        sidebarCollapse();
    }

    handleAppKeyChange(event) {
        this.setState({app_key: event.target.value});
    }

    handleAppKeyIdChange(event) {
        this.setState({app_key_id: event.target.value});
    }

    handleUploadChange(event) {
        this.setState({upload: event.target.checked});
    }

    handleSubmit(event) {
        event.preventDefault();
        if((this.state.app_key).length <=0 || (this.state.app_key_id).length <= 0) {
            return;
        }
        let formData = new FormData();
        formData.append('app_key', this.state.app_key);
        formData.append('app_key_id', this.state.app_key_id);
        formData.append('upload', this.state.upload);

        fetch('/api/base/b2/blackbaze/', {
            body: formData,
            method: 'post',
            headers:{
                'Authorization': 'Token ' + localStorage.getItem('token'),
            }
        }).then(function (data) {
            return data.json();
        }).then(function (data) {
            this.setState({app_key: "", app_key_id: "", upload: false});
            this.props.history.push("/music/settings");
            swal("Saved", "B2 account details has been added", "success");
        }.bind(this)).catch(function(err) {
           console.error(err);
           swal("Error", "check console", "error");
        });
    }

    render() {

        const {app_key, app_key_id, upload} = this.state;

        return (
            <div className="wrapper">
                <Sidebar/>
                <div id="content">
                    <Navbar/>
                    <div className="card shadow-lg">
                        <h6 className="card-header text-left">
                            Add B2 Account
                        </h6>
                        <div className="card-body" style={{'textAlign': 'left'}}>
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">App Key</label>
                                    <input type="text" value={app_key} autoFocus className="form-control" id="exampleInputEmail1"
                                            onChange={this.handleAppKeyChange.bind(this)} placeholder="Enter app key"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">App Key ID</label>
                                    <input type="text" value={app_key_id}  className="form-control" id="exampleInputPassword1"
                                           onChange={this.handleAppKeyIdChange.bind(this)} placeholder="Enter app key id"/>
                                </div>
                                <div className="form-group form-check">
                                    <input type="checkbox" value={upload}  className="form-check-input" onChange={this.handleUploadChange.bind(this)} id="exampleCheck1"/>
                                        <label className="form-check-label" htmlFor="exampleCheck1">Enable Upload</label>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

