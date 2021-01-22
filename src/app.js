const express = require('express')
const path = require('path')
const hbs = require('hbs')
const requet = require('request')
const port = process.env.PORT || '3000'


const app = express()
const viewsPath = path.join(__dirname,'../templates/views')
app.set('views',viewsPath)
const partialsPath = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)
app.set('view engine','hbs')

const appPath = path.join(__dirname,'../public')
app.use(express.static(appPath)) 
// This line tells node to get all html files from the public foldero

const geocode = require('./utils/geocode')
const weather = require('./utils/weather')
const { response } = require('express')


//weather 
app.get('',(req,res) => {
    geocode (req.query.address,(error,{latitude,longitude} = {}) => {
        // console.log(data)
        weather(latitude + ','+ longitude,(error,{city,currTemp,feelsLike} = {}) => {
            if (!error) {
                res.render('index',{
                title: 'Weather App',
                name: 'Rajesh Valluri',
                company: 'Trending Thoughts',
                currTemp: currTemp,
                feelsLike: feelsLike,
                city: city
                })
        console.log(currTemp,feelsLike,error)
            }
            else {
                res.rebder('index', {
                    error: 'Please enter a valid location'
                })
            }
         
    })
})

 })



//help route
app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Weather App',
        name: 'Rajesh Valluri',
        company: 'Trending Thoughts',
        helpText: 'This is just a whole bunch, of rubbish. This is not an original help document'
    })
})
//About
app.get('/about',(req,res) => {

    res.render('about',{
        title: 'Weather App',
        name: 'Rajesh Valluri',
        company: 'Trending Thoughts'
    })
})

app.get('/products', (req,res) => {
    console.log(req.query)
    if (!req.query.search) {
        return res.send ({
        error: "You must enter a search query"
        })
    }
    res.send( {
        products: []
    })
})

//weather 
app.get('/weather',(req,res) => {
    if (!req.query.address) {
        return res.send( {
            error: "Please provide am address for the weather app"
        })
    }
    geocode (req.query.address,(error,{latitude,longitude} = {}) => {
        // console.log(data)
        weather(latitude + ','+ longitude,(error,{city,currTemp,feelsLike} = {}) => {
            if (!error) {
                res.send({
                title: 'Weather App',
                name: 'Rajesh Valluri',
                company: 'Trending Thoughts',
                currTemp: currTemp,
                feelsLike: feelsLike,
                city: city
                })
        console.log(currTemp,feelsLike,error)
            }
            else {
                res.send( {
                    error: 'Please enter a valid location'
                })
            }
         
    })
})

 })

app.get('/help/*',(req,res) => {
    res.render('404',
    {
        title: 'Weather App',
        name: 'Rajesh Valluri',
        company: 'Trending Thoughts',
        errorMessage: 'Help article Page not found'
    })
})

app.get('*',(req,res) => {
    res.render('404',
    {
        title: 'Weather App',
        name: 'Rajesh Valluri',
        company: 'Trending Thoughts',
        errorMessage: 'Page not found'
    })
})

//set the listening port for the app
app.listen(port, () => {
    console.log('Server is up and running')
})