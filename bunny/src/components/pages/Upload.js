import React from 'react';
import Sidebar from 'components/layouts/Sidebar';
import Navbar from 'components/layouts/Navbar';
import Select from 'react-select';
import sidebarCollapse from 'utils/sidebarCollapse';


export default class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            musician: [],
            album: [],
            selected_genre: null
        };

        this.genre_options = [{ label: 'Folk', value: 'Fok'}, {label: 'Jazz', value: 'Jaz'}, {label:'Blues', value:'Blu'}, {label:'Classical', value: 'Cls'}, {label: 'Rock', value:'Roc'}, {label: 'Pop', value:'Pop'},
            {label: 'Melody', value: 'Mel'}, {label: 'Hip Hop', value: 'Hip'}, {label: 'Orchestra', value: 'Orc'}, {label: 'Opera', value:'Opr'}, {label: 'Country', value: 'Con'}, {label: 'Instrumental', value: 'Ins'}, {label: 'Techno', value: 'Tec'},
            {label: 'Ambient', value: 'Amb'}, {label: 'Heavy Metal', value: 'HMe'}, {label: 'Disco', value: 'Dis'}, {label: 'Euro Dance', value: 'EDa'}, {label: 'Metal', value: 'Met'}, {label: 'Comedy', value: 'Com'}, {label: 'Movie', value: 'Mov'},
            {label: 'Religious', value: 'Rel'}, {label: 'Rim', value:'Remix'}, {label:'Other', value: 'Und'}];
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
        sidebarCollapse();

        Promise.all([this.getMusician(), this.getAlbum()])
            .then(data =>  {
                console.log(data[0]);
                console.log(data[1]);
                this.setState({musician: data[0], album: data[1]});
                this.setState({loading: false});
            })
            .catch(err => {
                console.error(err);
            })
    }

    handleGenreChange = (selected_genre) => {
        this.setState({ selected_genre });
        console.log(selected_genre['value']);
    }

    render() {

        const { musician, album, selected_genre } = this.state;

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
                                    <Select
                                        value={selected_genre}
                                        onChange={this.handleGenreChange}
                                        options={this.genre_options}
                                        isSearchable={true}
                                    />
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
