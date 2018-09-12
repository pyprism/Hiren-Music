import React from 'react';
import Sidebar from './../layouts/Sidebar';
import Navbar from './../layouts/Navbar';
import sidebarCollapse from '../../utils/sidebarCollapse';


export default class B2Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            app_key: "",
            app_key_id: "",
        }
    }

    componentDidMount() {
        if(!localStorage.getItem("token"))
            this.props.history.push("/");

        document.title = "Hiren-Music: Add B2 Account Details";

        sidebarCollapse();
    }

    handleAppKeyChange(event) {
        this.setState({app_key: event.target.value});
    }

    handleAppKeyIdChange(event) {
        this.setState({app_key_id: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if((this.state.app_key).length <=0 || (this.state.app_key_id).length <= 0) {
            return;
        }
        let formData = new FormData();
        formData.append('app_key', this.state.app_key);
        formData.append('app_key_id', this.state.app_key_id);
    }

    render() {

        const {app_key, app_key_id} = this.state;

        return (
            <div className="wrapper">
                <Sidebar/>
                <div id="content">
                    <Navbar/>
                    <div className="card shadow-lg">
                        <h6 className="card-header text-left">
                            Add B2 Account Details
                        </h6>
                        <div className="card-body" style={{'text-align': 'left'}}>
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
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

