import {Howl, Howler} from 'howler';

function random(){
    console.log("random");
}

function track(music=null, all=false){
    if(!all) {
        const sound = new Howl({
            src: [music.upload],
            html5: true
        });
        sound.play();
    }
}

export default {track, random};
