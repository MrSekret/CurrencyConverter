const buttondone = document.getElementById("header__done")
const buttonedit = document.getElementById("header__edit")
const dragbutton = document.getElementById("currencies__dragbutton0")

buttonedit.addEventListener('click', () => {
    let computedStyles = window.getComputedStyle(buttondone)
    let propdisplay = computedStyles.getPropertyValue("display")

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
    }else{
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
            buttonedit.style.color = "#8f8f8f"
            buttonedit.textContent = "Edit"
            buttondone.removeEventListener('animationend', animdone)
        })
    }
})
buttondone.addEventListener('click', () => {
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
        buttonedit.style.color = "#8f8f8f"
        buttonedit.textContent = "Edit"
        buttondone.removeEventListener('animationend', animdone)
    })
})

function showdragmenu(){
    const dragbuttons = document.querySelectorAll(".currencies__dragbutton")
    const inputs = document.querySelectorAll(".currencies__number")
    dragbuttons.forEach(elem => {
        elem.style.display = 'flex'
        elem.classList.add("fadeIn")
        elem.addEventListener('animationend', function animdrag(){
            elem.classList.remove("fadeIn")
            elem.removeEventListener("animationend", animdrag)
        })
    })


}
function hidedragmenu(){
    const dragbuttons = document.querySelectorAll(".currencies__dragbutton")
    dragbuttons.forEach(elem => {
        elem.classList.add("fadeOut")
        elem.addEventListener('animationend', function animdrag(){
            elem.classList.remove("fadeOut")
            elem.style.display = 'none'
            elem.removeEventListener("animationend", animdrag)
        })
    })
}