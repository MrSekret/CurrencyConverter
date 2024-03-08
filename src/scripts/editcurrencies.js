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


let staticwrapper = null
const copyelement = (prop) => {
    if(prop=="none"){
        staticwrapper = document.querySelector(".currencies__wrapper").cloneNode(true)
    }
}
let previousSectionsLength = null
buttonedit.addEventListener('click', () => {
    let computedStyles = window.getComputedStyle(buttondone)
    let propdisplay = computedStyles.getPropertyValue("display")
    let currentSectionsLength = document.querySelectorAll(".currencies").length
    
    copyelement(propdisplay)
    
    
    if(propdisplay=="none"){
        openSearcher()
        showdragmenu()
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
        previousSectionsLength = currentSectionsLength
    }
    else{
        let contentstaticwrapper = staticwrapper.innerHTML
        let lengthstaticwrapper = staticwrapper.querySelectorAll("section").length
        let lengthcurrencieswrapper = currencieswrapper.querySelectorAll("section").length
        closeSearcher()
        hidedragmenu()
        .then(() => {
            if(lengthstaticwrapper == lengthcurrencieswrapper && !comparewrappers(staticwrapper, currencieswrapper)){ 
                return Promise.resolve()
            }
            else{
                return new Promise(resolve => {
                    const currencies = document.querySelectorAll(".currencies")
                    let animationsCount = 0

                    currencies.forEach(elem => {
                        elem.classList.add("fadeOut")
                        elem.addEventListener('animationend', function animdrag(){
                            elem.classList.remove("fadeOut")
                            elem.style.display = 'none'
                            elem.removeEventListener("animationend", animdrag)
                            animationsCount++
                            if (animationsCount === currencies.length) {
                                resolve()
                            }
                        })
                    })
                })
            }
        })
        .then(() => {
            currencieswrapper.innerHTML = contentstaticwrapper
            const currencies = document.querySelectorAll(".currencies")
            currencies.forEach(elem => {
                elem.classList.add("fadeIn")
                elem.addEventListener('animationend', function animdrag(){
                    elem.classList.remove("fadeIn")
                    elem.removeEventListener("animationend", animdrag)
                })
            })
            currencieswrapper.querySelectorAll(".currencies__checkbox").forEach((elem, ind) => {
                elem.addEventListener('click', function deletesection(event){
                    event.target.closest('.currencies').remove()
                })
            })
        })

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
    return new Promise((resolve) => {
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
        resolve()
    })
}
function comparewrappers(container1, container2){
    let container1Div = container1.querySelectorAll(".currencies__currency")
    let container2Div = container2.querySelectorAll(".currencies__currency")
    const container1Countries = []
    const container2Countries = []
    container1Div.forEach(elem => {
        container1Countries.push(elem.innerHTML)
    })
    container2Div.forEach(elem => {
        container2Countries.push(elem.innerHTML)
    })
    console.log(container1Countries)
    console.log(container2Countries)
    return container1Countries.some(element => container2Countries.includes(element))
}
