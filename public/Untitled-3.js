
function numberToLetter(inp){
    const words = 'Zero One Two Three Four Five Six Seven Eight Nine'.split(' ')
    const input = `${inp}`.split('')
    let result = []
    let unique = 0

    input.forEach(i => {
        const r = words[Number(i)]
    if(result.indexOf(r) == -1) unique++
        result.push(r)
    })

    console.log(result.join(', '))
    console.log( 'Total Unique Words: ' + unique)
}