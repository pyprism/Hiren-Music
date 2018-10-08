import {Howl, Howler} from 'howler';

function random(){
    console.log("random");
}

function stop() {
    window.Howler.unload();
}

function changeVol(value) {
    window.Howler.volume(value);
}

function track(music=null, all=false){
    stop();
    if(!all) {
        const sound = new Howl({
            src: [music.upload],
            html5: true
        });
        sound.play();
    }
}

export default {track, random, changeVol, stop};
