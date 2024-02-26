const API = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/pln.json"

function updateDate(date){
    const sorteddate = date.split("-")
    let monthNumberInt = parseInt(sorteddate[1], 10)
    let formatter = new Intl.DateTimeFormat('en', { month: 'short' })
    let monthText = formatter.format(new Date(2000, monthNumberInt - 1, 1))
    document.querySelector('.update-info__text span').textContent = sorteddate[2] + " " + monthText + " " + sorteddate[0]
}

function sendRequest(from, to){
    from = from.toLowerCase()
    to = to.toLowerCase()
    return fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}/${to}.json`).then( response => {
        return response.json()
    })
}

const selectAllText = data => { data.select() }
const currencyarr = document.querySelectorAll(".currencies__currency")
const inputarr = document.querySelectorAll(".currencies__number")

function handleInputChange(data) {
    const id = (data.id).split("")[10]

    inputarr.forEach((e, ind) => {
        if(ind!=id){
            sendRequest(currencyarr[id].textContent, currencyarr[ind].textContent)
                .then( responce => {
                    updateDate(responce.date)
                    e.value = (responce[`${currencyarr[ind].textContent.toLowerCase()}`] * data.value).toFixed(2)
                })
                .catch( err => console.log(err))
        }
    })
}