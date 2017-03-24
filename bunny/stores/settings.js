/**
 * Created by prism on 3/24/17.
 */
import { observable, action, computed, autorun } from 'mobx';
import axios from 'axios';
import { toJS } from "mobx";

export class settings {
    @observable loaded = false;
    @observable conf = false;
    @observable values = [];
    @observable loadingText = 'Loading from remote server....';

    @action getData() {
        this.values = [];
        axios({
            method: 'get',
            url: '/api/bucket/',
            headers: {'Authorization': "JWT " + localStorage.getItem('token')}
        }).then(function (response) {
            if((response.data).length > 0) {
                this.conf = true;
            }
            this.loaded = true;
        }.bind(this)).catch(function (err) {
            console.error(err);
            sweetAlert("Oops!", err.statusText, "error");
        })
    }
}