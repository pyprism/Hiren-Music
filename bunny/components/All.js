/**
 * Created by prism on 3/24/17.
 */
import React from 'react';
import { toJS } from "mobx";
import { observer } from "mobx-react";


@observer
export default class All extends React.Component {
    /***
     * show table
     */
    componentDidMount(){
        //this.props.route.movie.getMovies();
    }

    render() {

        //if(this.props.route.movie.loaded){
        if(true){



            return (
                <div>
                    I am dash :/
                </div>
            )
        }
        return (
            <div>Loading........</div>
        )

    }
}