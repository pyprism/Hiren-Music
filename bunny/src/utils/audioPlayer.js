import {Howl, Howler} from 'howler';
import {observable, autorun, action, decorate, computed} from "mobx";

class AudioPlayer {

    random(){
        console.log("random");
    }

    stop() {
        window.Howler.unload();
    }

    changeVol(value) {
        window.Howler.volume(value);
    }

    track(music=null, all=false) {
        this.stop();
        if (!all) {
            const sound = new Howl({
                src: [music.upload],
                html5: true
            });
            window.sound = sound;
            sound.play();
        }
    }

    pause(){
        window.sound.pause(null);
    }
}

const audioPlayer = decorate(AudioPlayer, {
    songName: observable,
    random: computed,
    stop: computed,
    changeVol: computed,
    track: computed
});

export default audioPlayer;
