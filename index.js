const express = require('express')
const path    = require("path")

const port = 8080
const app = express()

const server = app.listen(port, () => {
    console.log(`Le serveur statique Vue.js écoute sur le port ${port}`)
})
const io = require('socket.io')(server)

// Import du fichier de config
const config = require('./config.json')

// GPIO
const GPIO = require('onoff').Gpio
// Configuration des PINS
const avancer = new GPIO(config.PINS.AVANCER, 'out')
const moteur = new GPIO(config.PINS.MOTEUR, 'out')


// Vue.js
app.use('/dist', express.static('dist'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'))
})

// A la connection d'un utilisateur sur le serveur Sockets
io.on('connection', function(socket){
    console.log('Un utilisateur est connecté.')
    // GPIO
    /**
     * Fonction avancer
     */
    socket.on('AVANCER', () => {
        console.log('Avancer')
	moteur.writeSync(1)
        avancer.writeSync(1)
    })
    /**
     * Fonction stop avancer
     */
    socket.on('STOP_AVANCER', () => {
        console.log('Arrêt Avancer')
	moteur.writeSync(0)
        avancer.writeSync(0)
    })
})
