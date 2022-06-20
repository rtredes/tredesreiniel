import {
  SunAndMoon,
  Land,
  Star,
  Ambient,
  Cloud,
  CnvText,
  loadImages,
  sprites
} from "/projects/Scenery/scripts/Scenery.js"
import * as Containers from "/Js/Containers.js"

var mainBG = null
var introduction = null
var toTop = null

var theme = create.element("meta", {
  'name': 'theme-color',
  'content': '#47597D',
  'insertAt': {
    'target': document.head,
    'index': 1
  }
})

window.addEventListener("load", function() {
  loadImages(sprites, async function(imgs) {
    images = imgs
    try {
      mainBG = new CanvasAnimation(
        document.querySelector('.head'),
        "black", "Scenery"
      )
      
      /*Dynamic Data*/
      document.querySelector('.body').classList.add('loaded')
      document.querySelector('birthdate').innerText = getMyAge()
      document.querySelector('daySince > span').innerText = daysSinceRelationship()

      typeWritters()
      counter()
      registerApp('/service-worker.js')
      initializeAnimations()
    } catch (e) {
      console.error(e)
    }
  })
})

function initializeAnimations() {
  //Background

  mainBG.bgColor = gradient(mainBG, [
    { 'offSet': .5, color: 'black' },
    { 'offSet': 1, color: 'darkblue' }
  ])
  mainBG.objects = {
    'stars': [],
    'ambient': [],
    'sunAndMoon': [],
    'clouds': [],
    'lands': [],
    'cloudsFront': []
  }

  mainBG.insert({
    'name': 'ambient',
    'object': new Ambient({
      'canvas': mainBG,
      'color': gradient(mainBG, [
        { 'offSet': .5, 'color': '#FFFDD5' },
        { 'offSet': 1, 'color': 'white' }
      ])
    })
  })

  mainBG.insert({
    'name': 'sunAndMoon',
    'object': new SunAndMoon({
      'canvas': mainBG
    })
  })
  for (let i = 0; i < round(randomFloat(3, 10)); i++)
    mainBG.insert({
      'name': round(random()) ? 'clouds' : 'cloudsFront',
      'object': new Cloud({
        'canvas': mainBG,
        'x': randomFloat(0, mainBG.cw),
        'y': randomFloat(140, 160),
        'image': images.clouds.other[floor(randomFloat(0, images.clouds.other.length))]
      })
    })
  for (let i = 0; i < round(randomFloat(100, 200)); i++)
    mainBG.insert({
      'name': 'stars',
      'object': new Star({
        'canvas': mainBG,
        'y': randomFloat(0, mainBG.ch / 1.25),
        'x': randomFloat(0, mainBG.cw),
        'twinkle': round(random()) ? true : false
      })
    })

  images.lands.other.reverse().forEach((land, index) => {
    mainBG.insert({
      'name': 'lands',
      'object': new Land({
        'canvas': mainBG,
        'y': mainBG.ch - 130 + (index * 10),
        'image': land
      })
    })
  })

  canvasArray.push(mainBG)

  //Animate all


  animation()

  window.addEventListener("resize", function() {
    handleResize()

    var toHandle = ["stars", "clouds", "cloudsFront", "sunAndMoon"]

    toHandle.forEach(obj => {
      mainBG.objects[obj].forEach(o => o.resetObject(true))
    })

  })

}

function wait(ms) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => resolve(true), ms)
  })
}

function setHide(el) {
  var y = el.getBoundingClientRect().y
  if (innerHeight > y)
    el.setAttribute("hide", "false")
  else
    el.setAttribute("hide", "true")
}

function getJSON(href){
  return fetch(href).then(value => value.json())
}

async function createVault() {
  const portfolio = new Containers.Portfolio(
    document.querySelector('.body'), 
    await getJSON('/JSON/Contents.json')
  )
  
  var withScrollEvents = [
    portfolio.myWorks.container,
    portfolio.contact.container,
    portfolio.stacks.container,
    portfolio.aboutMe.container
 ]

  
  portfolio.myWorks.works = (await getJSON('/JSON/Projects.json')).array //Replace with firebase soon

  portfolio.myWorks.loadWorks()

  window.addEventListener('scroll', function() {
    withScrollEvents.forEach(el => setHide(el))
    portfolio.myWorks.withScrollEvent.forEach(el => setHide(el))
    portfolio.aboutMe.withScrollEvent.forEach(el => setHide(el))
    toTop.button.setAttribute("hide", `${scrollY < 275}`)
  })
}

async function registerApp(script) {
  try {
    var status = await navigator.serviceWorker.register(script)
    return status
  } catch (e) {
    return e
  }
}