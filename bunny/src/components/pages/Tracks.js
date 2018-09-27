import React from 'react';
import Sidebar from 'components/layouts/Sidebar';
import Navbar from 'components/layouts/Navbar';
import sidebarCollapse from 'utils/sidebarCollapse';
import 'css/dashboard.css';

export default class Tracks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            tracks: []
        };
    }

    componentDidMount() {
        if(!localStorage.getItem("token"))
            this.props.history.push("/");

        document.title = "Hiren-Music: Tracks";

        sidebarCollapse();
        this.loadData();
    }

    loadData() {
        fetch('/api/music/track/', {
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token'),
            }
        }).then(function (data) {
            if(data.status === 200)
                return data.json();
        }).then(function (data) {
            let bugs = [];
            data.forEach(function (bunny, index) {
                let hiren = {};
                hiren['id'] = bunny.id;
                hiren['title'] = bunny.title;
                hiren['youtube'] = bunny.youtube;
                hiren['upload'] = bunny.upload;
                hiren['download'] = bunny.download;
                hiren['musician'] = bunny.musician.name;
                hiren['album'] = bunny.album.name;
                bugs.push(hiren);
            });
            this.setState({tracks: bugs});
            this.setState({loading: false});
        }.bind(this)).catch(function (err) {
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
                                All Tracks
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
                                All Tracks
                            </h6>
                            <div className="card-body">
                                <div className="container mt-5">
                                    sasa
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
    }
}
