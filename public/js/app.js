console.log("Client side javascript file is loaded!")

    const weatherForm = document.querySelector('form')
    const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

    // messageOne.textContent = "HELLO!"

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const location = search.value

        fetch('http://localhost:3000/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                console.log("DATA", data)   
                if (data.error) {    
                    console.log("ERR",error)                
                    messageOne.textContent = data.error
                } else {                    
                    console.log(location)
                    console.log(data.forecast)
                    messageTwo.textContent = data.location + " (" + data.address + ")" + " , Forcast:" + data.forecast.current_temp + " deg, Feels like: " + data.forecast.feels_like + ", weather: " + data.forecast.weather
                }
            })
        })
    })


// F**** A((((()))))
