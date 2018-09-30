import React from 'react';
import { Link } from "react-router-dom";

export default class Storage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            base: '',
            upload: '',
            download: '',
            percentage: ''
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
            this.setState({base: data[0]['base'], upload: data[0]['upload'],
                download: data[0]['download'], percentage: data[0]['percentage']});
            this.setState({loading: false});
        });
    }

    baseProgressBar() {
        return(
            <div className="progress position-relative" style={{'height': '20px'}}>
                <div className={(this.state.base['percentage'] >= 50) ? 'progress-bar bg-danger' : 'progress-bar bg-info'} role="progressbar" style={{'width': this.state.base['percentage'] + '%'}} aria-valuenow={this.state.base['percentage']}
                     aria-valuemin="0" aria-valuemax="100">
                    <small className="justify-content-center d-flex position-absolute w-100" style={{'fontSize': '15px'}}>
                        App directory{this.state.base['percentage'] + '%'} used, {this.state.base['used']} used
                    </small>
                </div>
            </div>
        )
    }

    uploadProgressBar() {
        return(
            <div className="progress position-relative" style={{'height': '20px'}}>
                <div className={(this.state.upload['percentage'] >= 50) ? 'progress-bar bg-danger' : 'progress-bar bg-info'} role="progressbar" style={{'width': this.state.upload['percentage'] + '%'}} aria-valuenow={this.state.upload['percentage']}
                     aria-valuemin="0" aria-valuemax="100">
                    <small className="justify-content-center d-flex position-absolute w-100" style={{'fontSize': '15px'}}>
                        Upload directory {this.state.upload['percentage'] + '%'} used, {this.state.upload['used']} used
                    </small>
                </div>
            </div>
        )
    }

    downloadProgressBar() {
        return(
            <div className="progress position-relative" style={{'height': '20px'}}>
                <div className={(this.state.download['percentage'] >= 50) ? 'progress-bar bg-danger' : 'progress-bar bg-info'} role="progressbar" style={{'width': this.state.download['percentage'] + '%'}} aria-valuenow={this.state.download['percentage']}
                     aria-valuemin="0" aria-valuemax="100">
                    <small className="justify-content-center d-flex position-absolute w-100" style={{'fontSize': '15px'}}>
                        Download directory {this.state.download['percentage'] + '%'} used, {this.state.download['used']} used
                    </small>
                </div>
            </div>
        )
    }

    progressBar(){
        if(this.state.download  !== 'not found' && this.state.upload !== 'not found')
            return this.baseProgressBar();
        else if(this.state.download === 'not found')
            return this.uploadProgressBar();
        else if(this.state.upload === 'not found')
            return this.downloadProgressBar();
        return this.uploadProgressBar(), this.downloadProgressBar();

    }

    onClearBtnClick(){
        console.log("f");
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
                        <button type="button" className="btn btn-primary float-left"
                                data-toggle="tooltip" data-placement="top" title="Clear upload and download directory"
                                onClick={this.onClearBtnClick}>
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}