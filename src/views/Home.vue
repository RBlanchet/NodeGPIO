<template>
    <div>
        <div style="background-color: black; width: 200px; height: 200px;" @mouseup="avancerUp" @mousedown="avancerDown"></div>
        <!--<button @click="gauche">Gauche</button>-->
        <!--<button @click="bas">Bas</button>-->
        <!--<button @click="haut">Haut</button>-->
    </div>
</template>

<script>
    export default {
        name: "Home",
        methods: {
            /**
             * Arrêt du mouvement (Avancer)
             */
            avancerUp() {
                this.socket.emit('STOP_AVANCER');
            },
            /**
             * Avance le robot
             */
            avancerDown() {
                this.socket.emit('AVANCER');
            }
        },
        computed: {
            socket () {
                return this.$store.state.Socket.socket
            }
        }
    }
</script>