import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlayCircle} from "@fortawesome/free-solid-svg-icons";


export default function TrackList(props) {
    return(
        <table className="table">
            <thead>
            <tr>
                <th scope="col"><button className='btn btn-default btn-circle' data-toggle="tooltip" data-placement="top" title="Play all song"><FontAwesomeIcon icon={faPlayCircle} /></button></th>
                <th scope="col">Title</th>
                <th scope="col">Musician</th>
            </tr>
            </thead>
            <tbody>
            {props.tracks.map((track, i) => {
                return (
                    <tr key={i+1}>
                        <th><button className='btn btn-default btn-circle'><FontAwesomeIcon icon={faPlayCircle} /></button></th>
                        <td ><a href={track} target="_blank">{track.title}</a></td>
                        <td>{track.musician}</td>
                    </tr>
                );
            })}
            </tbody>
        </table>

    )
}
