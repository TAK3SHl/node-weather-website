const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.getElementById('msg1')
const msg2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit', e => {

    e.preventDefault()
    msg1.textContent = 'Loading...'
    msg2.textContent = ''    
    const location = search.value
    
    fetch('/weather?address=' + location).then(response => {
        response.json().then(data => {
            if(data.error){
                msg1.textContent = data.error
                return
            }
            msg1.textContent = 'Location: ' + data.location
            msg2.textContent = 'Forecast: ' + data.forecast      
        })
    })
})