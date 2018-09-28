import React from 'react';


export default function MusicianList(props) {
    return(
        <table className="table text-center">
            <thead>
            <tr>
                <th scope="col">Name</th>
            </tr>
            </thead>
            <tbody>
            {props.musicians.map((track, i) => {
                return (
                    <tr key={i+1}>
                        <td>{track.name}</td>
                    </tr>
                );
            })}
            </tbody>
        </table>

    )
}
