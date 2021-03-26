class Track {
    name: string;
    artistName: string;

    constructor(name: string, artistName: string){
        this.name = name;
        this.artistName = artistName;
    }

    public toString(): string {
        return `${this.name} - ${this.artistName}`;
    }
}

export default Track;