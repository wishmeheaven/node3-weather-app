const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forcast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define path for Express config
const publicDirecroty = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirecroty))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Am I dynamic enough for you?',
        title: 'HELPlease!',
        name: 'Andrew Mead'

    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address!"
        })
    } 
        geocode(req.query.address, (error, {lon, lat, location} = {}) => {
            // console.log("geocode", location)
            if (error) {
                return res.send({error})
            }
            forcast(lon, lat, (error, forcastData) => {
                if (error) {
                    return res.send({error})
                }
                res.send({
                    location,
                    address: req.query.address,
                    forecast: forcastData
                })
            })
        })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Andrew Mead', 
        errorMessage: 'Help article not found'
    })
})
 
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',    
        name: 'Andrew Mead',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server run 3000Kmh')
})











// const helpPage = path.join(publicDirecroty, 'help.html')
// const aboutPage = path.join(publicDirecroty, 'about.html')
// app.use(express.static(helpPage))
// app.use(express.static(aboutPage))



// -----------------------------------















// app.get('', (req, res) => {
//     res.send('<h1>Hello express!<h1>')
// })

// app.get('/help', (req, res) => {
//     res.send('Help page')
// })


// app.get('/about', (req, res) => {
//     res.send("About Page")
// })

