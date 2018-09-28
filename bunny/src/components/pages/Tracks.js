import React from 'react';
import Sidebar from 'components/layouts/Sidebar';
import Navbar from 'components/layouts/Navbar';
import sidebarCollapse from 'utils/sidebarCollapse';
import Loading from 'components/partials/Loading';
import TrackList from 'components/partials/TrackList';
import 'css/dashboard.css';

export default class Tracks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            tracks: [],
            search: false,
            search_result: [],
            search_text: ''
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

    handleSearchChange(event) {
        if(event.target.value.length <= 1)  // reset state after zero search text
            this.setState({search: false});
        this.setState({search_text: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let results = [];
        let regexp = new RegExp(this.state.search_text, 'gi');
        this.state.tracks.forEach((post) => {
            if (post["title"].match(regexp)) results.push(post);
        });

        this.setState({search_result: results, search: true});
    }

    render() {

        let {search_text} = this.state;

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
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <div className="form-group">
                                    <input type="text" value={search_text} onChange={this.handleSearchChange.bind(this)} className="form-control" id="exampleInputEmail1"
                                           placeholder="Search track"/>
                                </div>
                            </form>
                            {this.state.search?  <TrackList tracks={this.state.search_result}/> : <TrackList tracks={this.state.tracks}/>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
