const patternDict = [{
    pattern:'\\b(?<greeting>Hi|Hello|Hey)\\b',
    intent: 'salutation'
    },{
    pattern:'\\b(bye|exit)\\b',
    intent: 'exit'
    },{
    pattern: '([0-9])? best songs from ([^?]*) ?',
    intent: 'get_n_top_songs'
    }
]

export default patternDict;