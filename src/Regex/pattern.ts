const patternDict = [{
    pattern:'\\b(?<greeting>Hi|Hello|Hey)\\b',
    intent: 'salutation'
    },{
    pattern:'\\b(bye|exit)\\b',
    intent: 'exit'
}]

export default patternDict;