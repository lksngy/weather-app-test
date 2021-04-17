// load express, configure, start to load 
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const mapbox = require('./utils/mapbox')
const weatherstack = require('./utils/weatherstack')

console.log(__dirname)

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
//Modify the 'views' folder for hbs and use 'templates' instead
const viewPath = path.join(__dirname, '../templates/views')
// Modify the 'partials' folder for hbs and use 'templates' instead
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Lukas Nagy',
        text: 'Insert a place down below to get the weather forecas from the API.'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Johnny Cash'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Johnny Cash'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        console.log('error 1')
        return res.send('Please insert the address. /weather?address=******')
    }
    mapbox(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                console.log('error2')
                return res.send({error})
            }
            weatherstack(latitude, longitude, (error, forecastData) => {
                if (error) {
                    //console.log('error3')
                    console.log(error)
                    return res.send({error})
                }
                console.log('error4')
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address,
                    latitude,
                    longitude
                })
            })
        })
})

app.get('/products', (req, res) => {
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help article not found.',
        name: 'Johnny Cash'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404: Page not found',
        name: 'Johnny Cash'
    })
})

app.listen(port, () => {
    console.log('Server is up and running on port ' + port)
})

