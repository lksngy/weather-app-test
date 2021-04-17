console.log('javascript file is loaded!');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errorMessage = document.querySelector('.errorMessage')
const forecastMessage = document.querySelector('.forecastMessage')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    errorMessage.innerHTML = 'Loading...'
    const location = search.value
        fetch(`/weather?address=${location}`).then((response) => {
            response.json().then((data) => {
            if (data.error) {
                //console.log(data.error)
                const text = String(data.error)
                console.log(text)
                errorMessage.innerHTML = text
                forecastMessage.innerHTML = ''

            } else {
                //console.log(data.location)
                //console.log(data.forecast)
                const text = String(data.location) + ": " + "<br /><br />" + String(data.forecast)
                console.log(text)
                errorMessage.innerHTML = ''
                forecastMessage.innerHTML = text
            }
        })
    })  
})