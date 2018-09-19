import React from 'react';
import Sidebar from 'components/layouts/Sidebar';
import Navbar from 'components/layouts/Navbar';
import Select from 'react-select';
import sidebarCollapse from 'utils/sidebarCollapse';
import Creatable from 'react-select/lib/Creatable';


export default class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            musician: [],
            album: [],
            selected_genre: 'Und',
            selected_musician: '',
            selected_album: '',
            title: '',
            file: null
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

    albumMusicianBuilder(obj, musician=null, album=null){
        if(obj.length) {
            let bunny = [];
            obj.forEach(function(item) {
                bunny.push({label: item.name, value: item.name});
            });
            if(musician)
                this.setState({musician: bunny});
            else
                this.setState({album: bunny});
        }
    }

    componentDidMount() {
        if(!localStorage.getItem("token"))
            this.props.history.push("/");

        document.title = "Hiren-Music: Upload";
        sidebarCollapse();

        Promise.all([this.getMusician(), this.getAlbum()])
            .then(data =>  {
                this.albumMusicianBuilder(data[0], true);
                this.albumMusicianBuilder(data[1], false, true);
                this.setState({loading: false});
            })
            .catch(err => {
                console.error(err);
            })
    }

    handleGenreChange(selected_genre) {
        this.setState({ selected_genre });
        console.log(selected_genre['value']);
    };

    handleAlbumChange(selected_album) {
        this.setState({ selected_album });
    }

    handleMusicianChange(selected_musician){
        this.setState({ selected_musician });
    }

    handleTitleChange(event){
        this.setState({title: event.target.value});
    }

    handleFileChange(event) {
        this.setState({file: event.target.files[0]});
    }

    handleSubmit(event) {
        event.preventDefault();
        if(!this.state.file || this.state.title.length === 0) {
            return;
        }
        let formData = new FormData();
        formData.append('title', this.state.title);
    }

    render() {

        const { musician, album, selected_genre, title, file } = this.state;

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
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Title</label>
                                    <input type="text" value={title} onChange={this.handleTitleChange.bind(this)} className="form-control" id="exampleInputEmail1"
                                           placeholder="Enter title"/>
                                </div>
                                <div className="form-group">
                                    <label >Genre</label>
                                    <Select
                                        isClearable
                                        value={selected_genre}
                                        onChange={this.handleGenreChange}
                                        options={this.genre_options}
                                        isSearchable
                                    />
                                </div>
                                <div className="form-group">
                                    <label >Album</label>
                                    <Creatable
                                        isClearable
                                        onChange={this.handleAlbumChange}
                                        options={album}
                                    />
                                </div>
                                <div className="form-group">
                                    <label >Musician</label>
                                    <Creatable
                                        isClearable
                                        onChange={this.handleMusicianChange}
                                        options={musician}
                                    />
                                </div>
                                <div className="form-group">
                                    <label >Music File</label>
                                    <input type="file" onChange={this.handleFileChange.bind(this)} className="form-control-file" accept="audio/*" />
                                </div>
                                <button type="submit" className="btn btn-primary">Upload</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
