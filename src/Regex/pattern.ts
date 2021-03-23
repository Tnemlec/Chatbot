const patternDict = [{
    pattern: '\\b(?<greeting>Hi|Hello|Hey)\\b',
    intent: 'salutation'
}, {
    pattern: '\\b(bye|exit)\\b',
    intent: 'exit'
}, {
    pattern: '([0-9])? best songs from ([^?]*) ?',
    intent: 'get_n_top_songs'
},{
    pattern: '(?<number>\\d*).*(tracks?|songs?|musics?).*(with|contains?)\\s(?<name>.*)',
    intent: 'search_songs'
}, {
    pattern: '(?<number>\\d*).*(creators?|artists?).*(with|contains?)\\s(?<name>.*)',
    intent: 'search_artists'
}
]

export default patternDict;