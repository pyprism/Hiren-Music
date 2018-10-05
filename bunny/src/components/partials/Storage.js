import React from 'react';

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
                <div className={(this.state.base['percentage'] >= 50) ? 'progress-bar bg-info' : 'progress-bar bg-danger'} role="progressbar" style={{'width': this.state.base['percentage'] + '%'}} aria-valuenow={this.state.base['percentage']}
                     aria-valuemin="0" aria-valuemax="100">
                    <small className="justify-content-center d-flex position-absolute w-100" style={{'fontSize': '15px', 'color': 'black'}}>
                        Cache directory {this.state.base['percentage'] + '%'} free, {this.state.base['used']} used
                    </small>
                </div>
            </div>
        )
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
                    {this.baseProgressBar()}
                    <div style={{'marginTop': '50px'}}>
                        <button type="button" className="btn btn-primary float-left"
                                data-toggle="tooltip" data-placement="top" title="Clear cache directory"
                                onClick={this.onClearBtnClick}>
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}