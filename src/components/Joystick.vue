<template>
    <div>
        <div id="zone_joystick" @click="getPosition" style="width:100px; height: 100px;"></div>
    </div>
</template>

<script>
    // Lib du joystick
    const nippleJS = require('nipplejs')

    export default {
        name: "Joystick",
        data() {
            return {
                options: {},
                joystick: null,
                position: {}
            }
        },
        methods: {
            /**
             * Initalise les options pour le joystick et retourne une promesse une fois que c'est initialisé
             *
             * @returns {Promise<any>}
             */
            initJoystick() {
                return new Promise(((resolve, reject) => {
                    if (Object.keys(this.options).length === 0 && this.options.constructor === Object) {
                        let size = 150
                        if (window.innerWidth < 1000) {
                            size = 500
                        } else {
                            size = 150
                        }
                        this.options = {
                            zone: document.getElementById('zone_joystick'),
                            mode: 'static',
                            position: {left: '50%', top: '50%'},
                            color: 'red',
                            size: size
                        }
                        this.joystick = nippleJS.create(this.options)

                        resolve(true)
                    }
                }))

            },
            getPosition() {
                console.log(this.joystick[0].frontPosition)
            }
        },
        computed: {
            socket () {
                return this.$store.state.Socket.socket
            }
        },
        watch: {
            position: function (nouvelleValeur) {
                if (nouvelleValeur.x && nouvelleValeur.y && nouvelleValeur.angle) {
                    // x => droite ou gauche
                    // y => haut ou bas
                    console.log(nouvelleValeur.y)
                    if (nouvelleValeur.y === 'down') {
                        this.socket.emit('STOP_AVANCER')
                        this.socket.emit('RECULER')
                    }
                    if (nouvelleValeur.y === 'up')  {
                        this.socket.emit('STOP_RECULER')
                        this.socket.emit('AVANCER')
                    }

                    if (nouvelleValeur.x === 'left') {
                        this.socket.emit('STOP_DROITE')
                        this.socket.emit('GAUCHE')
                    }

                    if (nouvelleValeur.x === 'right') {
                        this.socket.emit('STOP_GAUCHE')
                        this.socket.emit('DROITE')
                    }
                } else {
                    this.socket.emit('ARRET')
                }
            }
        },
        mounted() {
            this.initJoystick()
                .then(r => {
                    let _this = this
                    this.joystick.on('move', function(evt, data) {
                            _this.position = data.direction
                        })
                        // A l'arrêt du mouvement du joystick
                        .on('end', function (evt, data) {
                            _this.position = {}
                        })
                })
        }
    }
</script>