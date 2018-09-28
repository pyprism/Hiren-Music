import React from 'react';


export default function AlbumList(props) {
    return(
        <table className="table">
            <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Musician</th>
            </tr>
            </thead>
            <tbody>
            {props.albums.map((track, i) => {
                return (
                    <tr key={i+1}>
                        <td ><a href={track} target="_blank">{track.name}</a></td>
                        <td>{track.musician}</td>
                    </tr>
                );
            })}
            </tbody>
        </table>

    )
}
