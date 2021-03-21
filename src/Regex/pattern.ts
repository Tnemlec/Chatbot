const patternDict = [{
    pattern:'\\b(?<greeting>Hi|Hello|Hey)\\b',
    intent: 'salutation'
    },{
    pattern:'\\b(bye|exit)\\b',
    intent: 'exit'
    },{
    pattern: 'top ([0-9]) tracks?',
    intent: 'get_top_artist'
    }
]

export default patternDict;