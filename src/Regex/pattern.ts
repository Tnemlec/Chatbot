const patternDict = [{
        pattern:'\\b(?<greeting>Hi|Hello|Hey)\\b',
        intent: 'salutation'
    },{
        pattern:'\\b(bye|exit)\\b',
        intent: 'exit'
    },{
        pattern: '([0-9])? best songs from ([^?]*) ?',
        intent: 'get_n_top_songs'
    },{
        pattern: 'add ([^-]*) - ([^-]*) - ([0-9]*)',
        intent: 'add_track_to_mid'
    }
]

export default patternDict;