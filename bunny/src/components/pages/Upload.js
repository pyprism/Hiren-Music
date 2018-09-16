import React from 'react';
import Sidebar from './../layouts/Sidebar';
import Navbar from './../layouts/Navbar';


export default class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: []
        }
    }

    componentDidMount() {
        if(!localStorage.getItem("token"))
            this.props.history.push("/");

        document.title = "Hiren-Music: Upload";
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
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1"
                                           aria-describedby="emailHelp" placeholder="Enter email"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1"
                                           placeholder="Password"/>
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
