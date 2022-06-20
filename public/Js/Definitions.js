const {random, floor, round, ceil, PI} = Math

function randomFloat(min,max){
  return random() * (max - min) + min
}
var create = {
  'element': function (tagName, attributes){
    var el = document.createElement(tagName)
    
    for(let attr in attributes){
      var value = attributes[attr]
      switch (attr){
        case 'event':
          const events = value
          for (let event in events) {
            el.addEventListener(event, events[event])
          }
        break;
        case 'innerHTML': el.innerHTML = value
        break;
        case 'innerText': el.innerText = value
        break;
        case 'append': value.append(el) 
        break;
        case 'insertAt': 
          value.target.insertBefore(
            el,
            value.target.childNodes[value.index]
          )
        break;
        default: el.setAttribute(attr, value)
        break;
      }
    }
    
    return el
  },
  'textNode': function (text, parent){
    return parent.append(document.createTextNode(text))
  }
}

function collided(obj1, obj2, aRange) {
  return (Math.hypot(obj2.x - obj1.x, obj2.y - obj1.y) - (aRange ? aRange : obj1.radius + obj2.radius)) < 1
}

const filters = {
  'even': function(number){
    return !(number % 2)
  },
  'odd': function(number){
    return !(number % 0) && number
  }
}
function toCurrency(number) {
  var fn = number.toFixed(2).split(".")
  var number = fn[0]
  var newNum = ""
  
  number.split("").reverse().forEach((n, i) => {
    if (!(i % 3) && (i != 0)) newNum += ","
    newNum += n
  })
  return newNum.split("").reverse().join("") + "." + fn[1]
}

function setMediaThumbnail (title, artist, album, artwork, events){
  navigator.mediaSession.metadata = new MediaMetadata({
    title,
    artist,
    album,
    artwork// Object array of {src, type, sizes}
  });
  
  for(var key in events){
    navigator.mediaSession.setActionHandler(key, events[key])
  }
  //Key list [play, pause, seekbackward, seekforward, previoustrack, nexttrack]
}

function counter(){
  var delay = 0;
function startCounting( target ) {
  var number = target;
  if(!number.getAttribute('counter-started') ) {
  var counterStart = 0;
  var counterEnd = number.innerText;
  var counterSpeed = 25;
  var currentCount = counterStart;
  var hasDecimal = counterEnd.indexOf(".") >= 0;
  number.innerText = '0';
  number.setAttribute('data-counter-started', 'true');
  setTimeout(function(){
  
    var numberCounterInterval = setInterval( function() {
    if( currentCount < counterEnd ) {
      currentCount += counterEnd / 100;
      number.innerText = (Math.floor(currentCount).toLocaleString());
      if(hasDecimal) number.innerText = (currentCount.toFixed(1).toLocaleString());
    } else { 
      number.innerText = (Number(counterEnd).toLocaleString());
      clearInterval(numberCounterInterval); 
    }
    
  }, counterSpeed);
    
  }, delay += 250)
  
  
  }
}

  var numberCounters = document.querySelectorAll("*[count]");

  var numberCounterOptions = { 
      root: null,
      threshold: 0,
      rootMargin: "0px"
  };

  var numberCounterObserver = new IntersectionObserver( 
  function(entries, observer) { 
      entries.forEach( entry => {
      var targetIsIntersecting = entry.isIntersecting; 
      if( targetIsIntersecting ) {
        startCounting( entry.target );
      } else if( !targetIsIntersecting ) {}
    });
  }
  , numberCounterOptions );
  numberCounters.forEach( section => {
    numberCounterObserver.observe(section); 
  })
}

function shuffleLetters() {
  var targets = document.querySelectorAll('*[shuffle]')
  for(let i = 0; i < targets.length; i++) {
    shuffleLetter(targets[i])
  }
}

function typeWritters(){
  var targets = document.querySelectorAll('*[typewritting]')
  for(let i = 0; i < targets.length; i++) {
    typewritter(targets[i])
  }
}

function typewritter(target){
  const origText = target.innerText.split("")
  target.innerText = ""
  var ctr = 0
  var length = origText.length
  var typer = setInterval(function(){
    var txt = origText[ctr++]
    target.innerHTML += txt
    if(ctr == length) clearInterval(typer)
  }, 100)

}



function shuffleLetter(target){
  const parentText = target.innerText.split("")
  console.log(parentText)

  var letters = convertToSpan()
  target.innerHTML = ""
  letters.forEach(l => {
    target.append(l)
    beginShuffle(l)
  })
  
  function beginShuffle(el){
    const orig = el.innerText
    var shuffler = setInterval(()=>{
      el.innerText = parentText[
        Math.floor(
          Math.random() * 
          parentText.length
        )]
      if (orig == ""){
        el.innerText = " "
        clearInterval(shuffler)
      } else if (el.innerText == orig){
        clearInterval(shuffler)
      }
    }, Math.random() * 100 + 50)
  }
 
  function convertToSpan(){
    var spans = []
    var txt = target.innerText.split("")
    txt.forEach(t => {
      var span = document.createElement("span")
      span.innerText = t
      spans.push(span)
    })
     return spans
  }
}

function getMyAge(){
  var today = new Date();
  today.setHours(0,0,0,0)
  var birthdate = new Date('10-01-98')
  return Math.floor((today - birthdate)/1000/60/60/24/365)
}
function daysSinceRelationship(){
  var today = new Date();
  today.setHours(0,0,0,0)
  var date = new Date('12-28-21')
  return Math.floor((today - date)/1000/60/60/24)
}