const searcher = document.querySelector(".searcher")
const currencieswrapper = document.querySelector(".currencies__wrapper")

function sendRequest(){
    return fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`).then( response => {
        return response.json()
    })
    .catch((err) => console.log("Failed to load rate: " + err))
}
function sendRequestAboutCurrencies(){
    return fetch('https://restcountries.com/v3.1/all').then(response => {
        return response.json()
    })
    .catch(error => console.lgo('Error while requestiing:', error))
}
function checkInfo(elemplace,  elemplace2=false){
    if(elemplace2==false) return elemplace
    else if (!elemplace) return "None"
    else if(elemplace && elemplace[0]) return elemplace[0]
    else if(elemplace2 && elemplace2[0]) return elemplace2[0]
    else return "None"
}
function checkCountries(elem1, elem2){
    return elem1==undefined ? elem2 : elem1
}

sendRequestAboutCurrencies().then(response => {
    console.log(response)
    sendRequest().then((data) => {
        const datacca3 = []
        const responsecca3 = []
        Object.entries(data.usd).forEach(elem => {
            datacca3.push(elem[0])
        })
        Object.entries(response).forEach(([key, value], index) => {
            if(response[index].hasOwnProperty('currencies')){
                let curr = Object.keys(response[index].currencies)
                if(curr[0] !== undefined) responsecca3.push(curr[0].toLowerCase())
            }
        })
        let result = responsecca3.filter(item => datacca3.includes(item))

        let buttonindex = 0
        Object.entries(response).forEach(([key, value], index) => {
            if(!result.includes(responsecca3[index])) return;
            let title
            if(response[index].hasOwnProperty('currencies')){
                let curr = Object.keys(response[index].currencies)
                if(curr[0] !== undefined) title = curr[0]
            }
            let country = checkCountries(response[index].altSpellings[1], response[index].altSpellings[0])
            let context = checkInfo(response[index].capital, response[index].altSpellings)
            let flag = checkInfo(response[index].cca2)
    
            let block = document.createElement('li')
            block.classList.add('searcher__block')
            block.innerHTML = `
                <img style="width: 48px;" src="https://flagcdn.com/w40/${flag.toLowerCase()}.png" alt="${title}" class="searcher__block-img">
                <div class="searcher__block-text">
                    <h2 class="searcher__block-title">${title}</h2>
                    <p class="searcher__block-context">${country}</p>
                </div>
                <div class="searcher__space"></div>
                <a href="#" class="searcher__button">+</a>
            `
            const targetElement = document.querySelector(".searcher__list")
            targetElement.appendChild(block)
    
            const addbutton = document.querySelectorAll(".searcher__button")
            addbutton[buttonindex].addEventListener('click', function addcurrency(){
                if(currencieswrapper.querySelectorAll("section").length<12){
                    let currency = document.createElement('section')
                    currency.classList.add('currencies')
                    currency.innerHTML = `
                        <div class="currencies__container">
                            <a href="#" class="currencies__checkbox">
                                <svg class="currencies__checkbox-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#1b1b1b" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                            </a>
                            <img src="https://flagcdn.com/w40/${flag.toLowerCase()}.png" alt="${country}" class="currencies__img">
                            <div class="currencies__currency">${title}</div>
                            <input type="number" class="currencies__number" value="0" onclick="selectAllText(this)" oninput="handleInputChange(this)">
                            <div class="currencies__dragbutton glyphicon-move"><span></span><span></span><span></span></div>
                    </div>
                    `
                    const targetElement = document.querySelector(".currencies__wrapper")
                    targetElement.appendChild(currency)
                    const dragbuttons = document.querySelectorAll(".currencies__dragbutton")
                    const checkboxs = document.querySelectorAll(".currencies__checkbox")
                    currency.style.border = '2px dashed #838383'
                    dragbuttons[dragbuttons.length-1].style.display = 'flex'
                    checkboxs[checkboxs.length-1].style.display = 'flex'
                    currency.classList.add("fadeIn")
                    currency.addEventListener('animationend', function animdrag(){
                        currency.classList.remove("fadeIn")
                        currency.removeEventListener("animationend", animdrag)
                    })
                    checkboxs[checkboxs.length-1].addEventListener('click', function deletesection(){
                        currencieswrapper.removeChild(currency)
                        checkboxs[checkboxs.length-1].removeEventListener('click', deletesection)
                    })
                }
            })

            let options = {
                valueNames: [ 'searcher__block-title', 'searcher__block-context' ]
            }
            let userList = new List('currencies-list', options)
            
            buttonindex++
          })
    })    
})

export function openSearcher(){
    if(window.innerWidth>772) searcher.style.right = 0
    else searcher.style.top = "32vh"
}
export function closeSearcher(){
    if(window.innerWidth>772) searcher.style.right = -304 +"px"
    else searcher.style.top = "100vh"
}