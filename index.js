// Système
const express = require('express')
const path    = require("path")
const fs = require('fs')
const port = 8080
const app = express()

// Recup IP
const ip = require('ip')

// Lancement du serveur sur le port définie plus haut
const server = app.listen(port, () => {
    let configData = fs.readFileSync('./config.json')
    let configJSON = JSON.parse(configData)

    let ipAddress = ip.address()
    configJSON.IP_ADDRESS = ipAddress

    fs.writeFileSync('config.json', JSON.stringify(configJSON))
    console.log(`
    - Le serveur statique Vue.js écoute sur le port ${port}
    - Le site est herbergé sur l'addresse ${configJSON.IP_ADDRESS}
    `)
})

// Socket
const io = require('socket.io')(server)

// Import du fichier de config
const config = require('./config.json')

// GPIO
const GPIO = require('onoff').Gpio
// Configuration des PINS
const avancer = new GPIO(config.PINS.AVANCER, 'out')
const reculer = new GPIO(config.PINS.RECULER, 'out')
const moteur = new GPIO(config.PINS.MOTEUR, 'out')

// Vue.js
app.use('/dist', express.static('dist'))

// Route de base
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
        moteur.writeSync(1)
        avancer.writeSync(1)
    })
    /**
     * Fonction stop avancer
     */
    socket.on('STOP_AVANCER', () => {
        moteur.writeSync(1)
        avancer.writeSync(0)
    })
    /**
     * Fonction reculer
     */
    socket.on('RECULER', () => {
        moteur.writeSync(1)
        reculer.writeSync(1)
    })
    /**
     * Fonction stop reculer
     */
    socket.on('STOP_RECULER', () => {
        moteur.writeSync(1)
        reculer.writeSync(0)
    })
    /**
     * Fonction droite
     */
    socket.on('DROITE', () => {
        // moteur.writeSync(1)
        // reculer.writeSync(0)
    })
    /**
     * Fonction stop droite
     */
    socket.on('STOP_DROITE', () => {
        console.log('STOP_DROITE')
        //moteur.writeSync(0)
        //avancer.writeSync(0)
    })
    /**
     * Fonction gauche
     */
    socket.on('GAUCHE', () => {
        console.log('GAUCHE')
        //moteur.writeSync(1)
        //avancer.writeSync(1)
    })
    /**
     * Fonction stop gauche
     */
    socket.on('STOP_GAUCHE', () => {
        console.log('STOP_GAUCHE')
        //moteur.writeSync(0)
        //avancer.writeSync(0)
    })
    /**
     * Fonction Arrêt
     */
    socket.on('ARRET', () => {
        moteur.writeSync(0)
    })
})
