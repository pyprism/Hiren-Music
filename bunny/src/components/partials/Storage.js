import React from 'react';
import { Link } from "react-router-dom";

export default class Storage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            base: '',
            upload: '',
            download: ''
        }
    }

    componentDidMount() {
        fetch("/api/base/space/", {
            headers:{
                'Authorization': 'Token ' + localStorage.getItem('token'),
            }
        }).then(data => {
            return data.json();
        }).then(data=> {
            this.setState({base: data[0]['base'], upload: data[0]['upload'], download: data[0]['download']});
            this.setState({loading: false});
        });
    }

    baseProgressBar() {
        return(
            <div className="progress">
                <div className="progress-bar bg-success" role="progressbar" style={{'width': 25 + '%'}} aria-valuenow="5"
                     aria-valuemin="0" aria-valuemax="100">
                    Free: {this.state.base['free']}

                    Total: {this.state.base['total']}

                    Used: {this.state.base['used']}
                </div>
            </div>
        )
    }

    progressBar(){
        if(this.state.download  === 'not found')
            return this.baseProgressBar();
    }

    render() {
        if(this.state.loading) {
            return (
                <div className="card shadow-lg">
                    <h6 className="card-header text-left">
                        Local Storage
                    </h6>
                    <div className="card-body">
                        <div className="container mt-5">
                            <div className="row">
                                <div className="col">
                                    <img className="img-fluid d-block mx-auto" alt="loading indicator" src={require("../../image/loading.svg")} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="card shadow-lg">
                <h6 className="card-header text-left">
                    Local Storage
                </h6>
                <div className="card-body">
                    {this.progressBar()}
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