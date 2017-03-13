import { observable, action, computed } from 'mobx';
import axios from 'axios';



export default class Tracks {
    @observable tracks = [];

    //constructor() {
    //}
    album(id) {
        axios({
            method: 'get',
            url: '/api/album/' + id + '/' + 'tracks/',
            headers: {
                'Authorization': 'JWT ' + sessionStorage.getItem('token')
            }
        }).then(function (response) {
            //console.log(response.data[0].length);
            console.log(response.data[0]);
            this.tracks.push.apply(this.tracks, response.data[0]);
            //Array.prototype.splice.apply(this.tracks, [0, ])
            console.log(this.tracks);
            console.log($.type(response.data));
        }.bind(this)).catch(function (response) {
            console.error(response);
            //sweetAlert("Oops!", response.data, "error");
        })
    }
    
}