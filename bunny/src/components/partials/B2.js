import React from 'react';
import { Link } from "react-router-dom";

export default class B2 extends React.Component {
    render() {
        return (
            <div className="card shadow-lg">
                <h6 className="card-header text-left">
                    Backblaze B2
                </h6>
                <div className="card-body">
                    <Link to='/B2'>
                        <button type="button" className="btn btn-primary float-left">
                            Add New Account
                        </button>
                    </Link>
                </div>
            </div>
        )
    }
}