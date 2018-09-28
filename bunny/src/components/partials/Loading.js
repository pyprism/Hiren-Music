import React from 'react';
import Sidebar from "components/layouts/Sidebar";
import Navbar from "components/layouts/Navbar";

export default function Loading(props) {
    return (
        <div className="wrapper">
            <Sidebar/>
            <div id="content">
                <Navbar/>
                <div className="card shadow-lg">
                    <h6 className="card-header text-left">
                        {props.title}
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