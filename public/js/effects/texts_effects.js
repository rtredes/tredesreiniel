export function randomizeText(element, max = 5, speed = 50) {
    const randomizing = element.dataset.randomizingText == 'true'
    if (randomizing) return false
    const txtArray = element.textContent.split('')
    const allText = `qwertyuiopasdfghjklzxcvbnm`.split('')
    const wrapMaxWidth = element.getBoundingClientRect().width
    element.style = `width: ${wrapMaxWidth}px`

    let randomized = txtArray.map(function (txt) {
        const times = txt == ' ' ? 0 : Math.ceil(Math.random() * max)
        return {
            times, txt
        }
    })
    let modifiedText = txtArray

    const randomizer = setInterval(function () {
        let finishedCtr = 0
        let finished = false
        element.dataset.randomizingText = true
        randomized.forEach(({ txt }, index) => {
            if (randomized[index].times-- > 0) {
                const chosenText = allText[Math.floor(Math.random() * allText.length)]
                modifiedText[index] = chosenText
                finishedCtr = 0
            } else {
                modifiedText[index] = txt
                finishedCtr++
                if (finishedCtr >= randomized.length) {
                    finished = true
                    clearInterval(randomizer)
                }
            }
        })
        element.textContent = modifiedText.join('')
        if (finished) {
            element.dataset.randomizingText = false
            element.removeAttribute('style')
        }
    }, speed)
}

export function typingFunction({ element, textContent }, index) {
    return new Promise(function (resolve) {
        let typing = setInterval(async function () {
            element.textContent += textContent.shift()
            if (textContent.length <= 0) {
                clearInterval(typing)
                resolve(element)
            }
        }, calculateValue(textContent))
    })
}

function calculateValue(input) {
    const length = input.length;
    let value = 200 - Math.min(length * 5, 200);
    value = Math.max(value, 25);
    return value;
}