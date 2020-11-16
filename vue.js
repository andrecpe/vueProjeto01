new Vue({
    el: '#app',
    data: {
        running: false,
        playerLife: 100,
        monsterLife: 100,
        logs: [],
        stack: [],
    },
    computed: {
        hasResult() {
            return this.playerLife === 0 || this.monsterLife === 0
        }
    },
    methods: {
        startGame() {
            this.running = true
            this.playerLife = 100
            this.monsterLife = 100
            this.logs = []
        },
        attack(especial) {
            this.hurt('monsterLife', 5, 10, especial, 'Jogador', 'Monstro', 'list-group-item-success')
            if (this.monsterLife > 0)
                this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'list-group-item-danger')
        },
        hurt(prop, min, max, especial, source, target, cls) {
            const plus = especial ? 5 : 0
            const hurt = this.getRandom(min + plus, max + plus)
            this[prop] = Math.max(this[prop] - hurt, 0)
            this.registerLog(`${source} atingiu ${target} com ${hurt}.`, cls)
        },
        healAndHurt() {
            this.heal(10, 15)
            this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'list-group-item-danger')
        },
        heal(min, max) {
            const heal = this.getRandom(min, max)
            this.playerLife = Math.min(this.playerLife + heal, 100)
            this.registerLog(`Jogador ganhou força de ${heal}.`, 'list-group-item-success')
        },
        getRandom(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min
        },
        registerLog(text, cls) {
            this.logs.unshift({text, cls})
        },
    },
    watch: {
        hasResult(value) {
            this.running = !value
        },
    }
})