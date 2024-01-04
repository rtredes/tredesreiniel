import { typingFunction, randomizeText } from "./effects/texts_effects.js"

async function initializeTyping() {
    const typers = [...document.querySelectorAll('.typer')].map(function (element) {
        const textContent = element.textContent.split('')
        element.textContent = ""
        return {
            element, textContent
        }
    })

    for (let typer of typers) {
        const typed_element = await typingFunction(typer)
        const remove_typer = typed_element.dataset.removeTyperOnFinish
        if (remove_typer == 'true')
            typed_element.classList.add('finished-typing')
    }
}

function linksHoverEffect() {
    const links = document.querySelectorAll('header nav a')
    const randomizedTexts = document.querySelectorAll('.randomizedText')

    randomizedTexts.forEach(text => {
        randomizeText(text, 35, 25)
    })

    links.forEach(link => {
        link.addEventListener('mouseenter', function () {
            randomizeText(this, 7)
        })
    })
}

function wordByWordAppear() {
    const header = document.querySelector('header')
    const scrollDown = document.querySelector('.scrollDown')
    const element = document.querySelector('.wbw_appear')
    const words = [...element.textContent.split('')].map(word => {
        const span = document.createElement('span')
        span.textContent = word

        return span
    })

    element.textContent = ''
    element.append(...words)

    const wordsTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#banner",
            pin: true,
            pinSpacing: true,
            start: "top top",
            end: "+=3000",
            scrub: 1
        },
    })
    wordsTimeline.to(header, {opacity: 0, yPercent: -100, duration: 0})
    words.forEach(word => {
        wordsTimeline.to(word, { opacity: 1, duration: .1, ease: "circ.inOut" })
    })
    wordsTimeline.to(header, {opacity: 1, yPercent: 0, duration: 2, ease: "circ.inOut"})
    wordsTimeline.to(scrollDown, { opacity: 0, duration: 1, ease: "circ.inOut" }, '<')

}

function worksSliderInit(){
    const trigger = document.querySelector('#projects')
    const title = trigger.querySelector('h2')
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: trigger,
            pin: true,
            pinSpacing: true,
            start: "top 100px",
            end: "+=3000",
            scrub: 1
        },
    })

    
    timeline.to('.works-card-slider', {xPercent: -80, duration: 1})
    timeline.to(title, {color: '#0ee00e', duration: 0.01}, '<')
    timeline.to(title, {opacity: 0, x: -25, duration: .25}, '<=.75')
}

function aboutmeInit(){
    const trigger = document.querySelector('#about-me')
    const title = trigger.querySelector('h2')
    const hidden = trigger.querySelectorAll('.will-appear')
    const about_me = trigger.querySelector('.about-me')
    const country_image = trigger.querySelector('#country img')

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: trigger,
            pin: true,
            pinSpacing: true,
            start: "top 100px",
            end: "+=2000",
            scrub: 1
        },
    })

    hidden.forEach(hidden_element => {
        timeline.to(hidden_element, {opacity: 0, y: 50, duration: 0})
    })
    timeline.to(about_me, {yPercent: 100, duration: 0})
    timeline.to(about_me, {yPercent: 0, duration: .5})
    timeline.to(title, {color: '#0ee00e', duration: 0.01}, '<')

    
    hidden.forEach(hidden_element => {
        timeline.to(hidden_element, {opacity: 1, y: 0, duration: .25})
    })

    


    timeline.to(country_image, {opacity: 0.25, duration: 1})
    timeline.to(country_image, {scale: 2.5, duration: 1.5}, '-=2')

    

}

function initialize() {
    let banner = gsap.timeline();
    initializeTyping()
    linksHoverEffect()
    wordByWordAppear()
    aboutmeInit()
    worksSliderInit()
    
}


initialize() 