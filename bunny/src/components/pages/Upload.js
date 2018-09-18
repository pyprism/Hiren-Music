import React from 'react';
import Sidebar from './../layouts/Sidebar';
import Navbar from './../layouts/Navbar';
import Select from 'react-select';


export default class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            musician: [],
            album: [],
        }
    }

    getMusician() {
        return new Promise(function (resolve, reject) {
            fetch('/api/music/musician/', {
                headers: {
                    'Authorization': 'Token ' + localStorage.getItem('token'),
                }
            }).then(data => {
                resolve(data.json());
            }).catch(err => {
                reject(err);
            });
        });
    }

    getAlbum() {
        return new Promise(function (resolve, reject) {
            fetch('/api/music/album/', {
                headers: {
                    'Authorization': 'Token ' + localStorage.getItem('token'),
                }
            }).then(data => {
                resolve(data.json());
            }).catch(err => {
                reject(err);
            })
        });
    }

    componentDidMount() {
        if(!localStorage.getItem("token"))
            this.props.history.push("/");

        document.title = "Hiren-Music: Upload";

        Promise.all([this.getMusician(), this.getAlbum()])
            .then(data =>  {
                console.log(data[0]);
                console.log(data[1]);
                this.setState({loading: false});
            })
            .catch(err => {
                console.error(err);
            })
    }

    render() {
        if(this.state.loading) {
            return (
                <div className="wrapper">
                    <Sidebar/>
                    <div id="content">
                        <Navbar/>
                        <div className="card shadow-lg">
                            <h6 className="card-header text-left">
                                Upload New Song
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
                    </div>
                </div>
            )
        }
        return (
            <div className="wrapper">
                <Sidebar/>
                <div id="content">
                    <Navbar/>
                    <div className="card shadow-lg">
                        <h6 className="card-header text-left">
                            Upload New Song
                        </h6>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Title</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1"
                                           placeholder="Enter title"/>
                                </div>
                                <div className="form-group">
                                    <label >Genre</label>
                                    <input type="text" className="form-control"
                                           placeholder="Enter title"/>
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
