
const weatherForm = document.querySelector('form')
const searchelement = document.querySelector('input') //data in the searchbox
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector("#message-2")

messageOne.textContent ="This is generated in javascript"

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'loading....'
    messageTwo.textContent = ''
    const location = searchelement.value
    var url = '/weather?address=' + encodeURIComponent(location)
    fetch(url).then(response => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = 'There has been an error, please see below'
            messageTwo.textContent =  data.error
        }
        else {
            messageOne.textContent = data.city
            messageTwo.innerHTML = 'The current temperature is:' + data.currTemp +  '<br>It actually feels like:' + data.feelsLike
        }
    })
})
})