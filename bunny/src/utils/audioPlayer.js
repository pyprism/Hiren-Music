import {Howl, Howler} from 'howler';

const randomx = () => {
    console.log("random");
};

const track = (id=null, all=false) => {
    console.log(id);
    console.log(all);
};

export const audioPlayer = track, randomx;
