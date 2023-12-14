const Emitter = require("EventEmitter")
var StateMachine = require('javascript-state-machine');
cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad() {
        this._onAttack = this.onAttack.bind(this)
        this._onAttackAfter = this.onAttackAfter.bind(this)
        this._onFinal = this.onFinal.bind(this)
        this.fsm = new StateMachine({
            init: 'init',
            transitions: [
                {name: 'attack', from: 'init', to: 'attackState'},
                {name: 'AttackAfter', from: 'attackState', to: 'afterAttackState'},
                {name: 'final', from: 'afterAttackState', to: 'changeScene'},
            ],
            methods: {
                onAttack: this._onAttack,
                onAttackAfter:this._onAttackAfter,
                onFinal: this._onFinal,
            }
        });
        this.fsm.attack();
    },
    onAttack() {
        cc.log("hello")
    },
    onAttackAfter() {

    },
    onFinal() {

    },
});
