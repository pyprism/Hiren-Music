import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlayCircle, faStepBackward, faStepForward} from "@fortawesome/free-solid-svg-icons";
import {faVolumeDown, faVolumeUp, faRandom} from "@fortawesome/free-solid-svg-icons";


export default class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playing: false
        };
    }

    componentDidMount(){
        console.log("asa");
    }

    playButton() {
        if(this.state.playing)
            return (
                <FontAwesomeIcon icon={faPlayCircle} size="2x" spin/>
            )
        return (
            <FontAwesomeIcon icon={faPlayCircle} size="2x"/>
        )
    }

    render() {
        return (
            <nav className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark" style={{marginBottom: '0px'}}>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto mx-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="javascript:;">
                                <FontAwesomeIcon icon={faStepBackward} size="2x"/>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                {this.playButton()}
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <FontAwesomeIcon icon={faStepForward} size="2x"/>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <FontAwesomeIcon icon={faRandom} size="2x"/>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <FontAwesomeIcon icon={faVolumeDown} size="2x"/>
                            </a>
                        </li>
                        <li className="nav-item" style={{'marginTop': '12px'}}>
                            <input type="range" min="0" max="100" step="1"/>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <FontAwesomeIcon icon={faVolumeUp} size="2x"/>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

