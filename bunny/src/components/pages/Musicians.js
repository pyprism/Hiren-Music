import React from 'react';
import sidebarCollapse from 'utils/sidebarCollapse';
import MusicianList from 'components/partials/MusicianList';
import 'css/dashboard.css';

export default class Musicians extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            musicians: [],
            search: false,
            search_result: [],
            search_text: ''
        };
    }

    componentDidMount() {
        if(!localStorage.getItem("token"))
            this.props.history.push("/");

        document.title = "Hiren-Music: Musicians";

        sidebarCollapse();
        this.loadData();
    }

    loadData() {
        fetch('/api/music/musician/', {
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
                hiren['name'] = bunny.name;
                bugs.push(hiren);
            });
            this.setState({musicians: bugs});
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
        this.state.musicians.forEach((post) => {
            if (post["name"].match(regexp)) results.push(post);
        });

        this.setState({search_result: results, search: true});
    }

    render() {

        let {search_text} = this.state;

        if(this.state.loading) {
            return (
                <div className="card shadow-lg">
                    <h6 className="card-header text-left">
                        All Musicians
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
                    All Musicians
                </h6>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            <input type="text" value={search_text} onChange={this.handleSearchChange.bind(this)} className="form-control" id="exampleInputEmail1"
                                   placeholder="Search musician"/>
                        </div>
                    </form>
                    {this.state.search?  <MusicianList musicians={this.state.search_result}/> : <MusicianList musicians={this.state.musicians}/>}
                </div>
            </div>
        )
    }
}
