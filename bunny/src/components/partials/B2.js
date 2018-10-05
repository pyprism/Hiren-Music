import React from 'react';
import { Link } from "react-router-dom";

export default class B2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: []
        }
    }

    componentDidMount() {
        fetch("/api/base/b2/blackbaze/", {
            headers:{
                'Authorization': 'Token ' + localStorage.getItem('token'),
            }
        }).then(data => {
            return data.json();
        }).then(data=> {
            this.setState({data: data});
            this.setState({loading: false});
        });
    }

    render() {
        if(this.state.loading) {
            return (
                <div className="card shadow-lg">
                    <h6 className="card-header text-left">
                        Backblaze B2
                    </h6>
                    <div className="card-body">
                        <div className="container mt-5">
                            <div className="row">
                                <div className="col">
                                    <img className="img-fluid d-block mx-auto" alt="loading indicator" src={require("../../image/loading.svg")} />
                                </div>
                            </div>
                        </div>
                        <div style={{'marginTop': '50px'}}>
                            <Link to='/music/B2'>
                                <button type="button" className="btn btn-primary float-left">
                                    Add Account
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="card shadow-lg">
                <h6 className="card-header text-left">
                    Backblaze B2
                </h6>
                <div className="card-body">
                    <div className="container table-responsive">
                        <table className="table table-striped table-borderless table-hover">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">App Key</th>
                                <th scope="col">App Key ID</th>
                                <th scope="col">Upload Enabled</th>
                                <th scope="col">Account Authenticated</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.data.map((bunny, i) => {
                                return (<tr key={i+25}>
                                    <td key={i} >
                                        <Link to={`/b2/${bunny.id}/`} >{i+1}</Link>
                                    </td>
                                    <td key={i+44}>
                                        <Link to={`/b2/${bunny.id}/`} >{bunny.app_key}</Link>
                                    </td>
                                    <td key={i+45}>
                                        <Link to={`/b2/${bunny.id}/`} >{bunny.app_key_id}</Link>
                                    </td>
                                    <td key={i+46}>
                                        <Link to={`/b2/${bunny.id}/`} >{(bunny.upload) ? 'Yes' : 'No'} </Link>
                                    </td>
                                    <td key={i+47}>
                                        <Link to={`/b2/${bunny.id}/`} >{(bunny.verification) ? 'Yes' : 'No'}</Link>
                                    </td>
                                </tr>);
                            })}
                            </tbody>
                        </table>
                    </div>
                    <div style={{'marginTop': '50px'}}>
                        <Link to='/B2'>
                            <button type="button" className="btn btn-primary float-left">
                                Add Account
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}