class Track {
    name: string;
    playcount: number;
    listeners: number;
    mbid: string;
    url: string;
    duration: string;

    constructor(name: string, playcount: number, listeners: number, mbid: string, url: string, duration: string){
        this.name = name;
        this.playcount = playcount;
        this.listeners = listeners;
        this.mbid = mbid;
        this.url = url;
        this.duration = duration;
    }
}

class TopTracks {
    track: Track[];

    constructor(track: Track[]) {
        this.track = track;
    }
}

export {Track, TopTracks};