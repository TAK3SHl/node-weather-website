const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

const partialsPath = path.join(__dirname, '../templates/partials')

// o caminho no qual o express olha por padrão é a pasta views
// para customizar esse caminho padrão, use o seguinte comando
// sendo o 'templates' no lugar de views
const viewsPath = path.join(__dirname, '../templates/views')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Igor Takeshi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Bots',
        name: 'Igor Takeshi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpMessage: 'Help Message',
        name: 'Igor Takeshi'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Your must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({ error })
        }
        forecast(longitude, latitude, (error, forecast) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast,
                location,
                address: req.query.address
            })
        })
    })    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

