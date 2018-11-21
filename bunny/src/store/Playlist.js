import { observable, action, computed, autorun } from 'mobx';

let playlist = observable([]);

function CurrentList(list) {
    playlist = list;
    console.log(list);
}

action(CurrentList);

autorun(() => console.log(playlist));

export default CurrentList;