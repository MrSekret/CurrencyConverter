
function updateDate(date){
    const sorteddate = date.split("-")
    let monthNumberInt = parseInt(sorteddate[1], 10)
    let formatter = new Intl.DateTimeFormat('en', { month: 'short' })
    let monthText = formatter.format(new Date(2000, monthNumberInt - 1, 1))
    document.querySelector('.update-info__text span').textContent = sorteddate[2] + " " + monthText + " " + sorteddate[0]
}

function sendRequest(){
    return fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json`).then( response => {
        return response.json()
    })
    .catch((err) => console.log("Failed to load rate: " + err))
}

const selectAllText = data => { data.select() }

function handleInputChange(data) {
    const currencyarr = document.querySelectorAll(".currencies__currency")
    const inputarr = document.querySelectorAll(".currencies__number")
    let id
    inputarr.forEach((e, ind) => {
        if(e==data){ 
            id = ind
        }
    })
    inputarr.forEach((e, ind) => {
        if(ind!=id){
            sendRequest()
                .then( response => {
                    updateDate(response.date)
                    let currencyId = currencyarr[id].textContent.toLowerCase()
                    let otherId = currencyarr[ind].textContent.toLowerCase()
                    let dollars = data.value / response.usd[currencyId]
                    e.value = (response.usd[otherId] * dollars).toFixed(2)
                })
                .catch( err => console.log(err))
        }
    })
}

