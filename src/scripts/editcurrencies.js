import { openSearcher, closeSearcher } from './searchcurrencies.js'

const buttondone = document.getElementById("header__done")
const buttonedit = document.getElementById("header__edit")
const currencysections = document.querySelectorAll(".currencies")
const currencieswrapper = document.querySelector(".currencies__wrapper")
const checkboxs = document.querySelectorAll(".currencies__checkbox")

checkboxs.forEach((elem, ind) => {
    elem.addEventListener('click', function deletesection(){
        currencieswrapper.removeChild(currencysections[ind])
        elem.removeEventListener('click', deletesection)
    })
})

Sortable.create(currencies__wrapper, {
    handle: '.currencies__dragbutton',
    animation: 350,
    swap: true
})


let previousSectionsLength = null
let staticwrapper = null
buttonedit.addEventListener('click', () => {
    let computedStyles = window.getComputedStyle(buttondone)
    let propdisplay = computedStyles.getPropertyValue("display")
    let currentSectionsLength = document.querySelectorAll(".currencies").length
    
    openSearcher()
    showdragmenu()


    if(propdisplay=="none"){
        buttonedit.classList.remove("fadeIn")
        buttonedit.classList.add("fadeOut")
        buttonedit.addEventListener('animationend', function animedit(){
            buttonedit.classList.remove("fadeOut")
            buttonedit.style.color = "#f59797"
            buttonedit.textContent = "Cancel"
            buttondone.style.display="block"
            buttondone.classList.add("fadeIn")
            buttonedit.classList.add("fadeIn")
            buttonedit.removeEventListener('animationend', animedit)
        })
        staticwrapper = currencieswrapper.cloneNode(true)
        previousSectionsLength = currentSectionsLength
    }
    else{
        // currencieswrapper.innerHTML = ""
        // currencieswrapper.appendChild(staticwrapper.cloneNode(true))

        for(let i=currentSectionsLength-1; i>previousSectionsLength-1; i--){
            currencieswrapper.removeChild(currencysections[i])
        }

        closeSearcher()
        hidedragmenu()

        buttondone.classList.remove("fadeIn")
        buttonedit.classList.remove("fadeIn")
        buttondone.classList.add("fadeOut")
        buttonedit.classList.add("fadeOut")

        buttondone.addEventListener("animationend", function animdone(){
            buttondone.style.display = "none"
            buttonedit.classList.remove("fadeOut")
            buttondone.classList.remove("fadeOut")
            buttonedit.classList.add("fadeIn")
            buttonedit.style.color = "#67edff"
            buttonedit.textContent = "Edit"
            buttondone.removeEventListener('animationend', animdone)
        })
        previousSectionsLength = currentSectionsLength
    }
})
buttondone.addEventListener('click', () => {
    closeSearcher()
    hidedragmenu()

    buttondone.classList.remove("fadeIn")
    buttonedit.classList.remove("fadeIn")
    buttondone.classList.add("fadeOut")
    buttonedit.classList.add("fadeOut")

    buttondone.addEventListener("animationend", function animdone(){
        buttondone.style.display = "none"
        buttonedit.classList.remove("fadeOut")
        buttondone.classList.remove("fadeOut")
        buttonedit.classList.add("fadeIn")
        buttonedit.style.color = "#67edff"
        buttonedit.textContent = "Edit"
        buttondone.removeEventListener('animationend', animdone)
    })
})


function showdragmenu(){
    const currencies = document.querySelectorAll(".currencies")
    const dragbuttons = document.querySelectorAll(".currencies__dragbutton")
    const checkboxs = document.querySelectorAll(".currencies__checkbox")
    function show(elem){
        elem.style.display = 'flex'
        elem.classList.add("fadeIn")
        elem.addEventListener('animationend', function animdrag(){
            elem.classList.remove("fadeIn")
            elem.removeEventListener("animationend", animdrag)
        })
    }

    currencies.forEach(elem => {
        elem.style.border = '2px dashed #838383'
    })
    checkboxs.forEach(elem => {
        show(elem)
    })
    dragbuttons.forEach(elem => {
        show(elem)
    })
}
function hidedragmenu(){
    const currencies = document.querySelectorAll(".currencies")
    const dragbuttons = document.querySelectorAll(".currencies__dragbutton")
    const checkboxs = document.querySelectorAll(".currencies__checkbox")
    function hide(elem){
        elem.classList.add("fadeOut")
        elem.addEventListener('animationend', function animdrag(){
            elem.classList.remove("fadeOut")
            elem.style.display = 'none'
            elem.removeEventListener("animationend", animdrag)
        })
    }

    currencies.forEach(elem => {
        elem.style.border = 'none'
    })
    checkboxs.forEach(elem => {
        hide(elem)
    })
    dragbuttons.forEach(elem => {
        hide(elem)
    })
}