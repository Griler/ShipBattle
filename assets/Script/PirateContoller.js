const Emitter = require("EventEmitter")
var StateMachine = require('javascript-state-machine');
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad(){
        this._onAttack = this.onAttack.bind(this)
        this._onAttackAfter = this.onAttackAfter.bind(this)
        this._onFinal = this.onFinal.bind(this)
        this.fsm = new StateMachine({
            init: 'init',
            transitions: [
                { name: 'attack',     from: 'init',  to: 'attackState' },
                { name: 'AttackAfter',   from: 'attackState', to: 'afterAttackState'},
                { name: 'final', from: 'afterAttackState', to: 'changeScene'    },
            ],
            methods: {
                onAttack:     function() { console.log('I melted')    },
                onAttackAfter:   function() { console.log('I froze')     },
                onFinal: function() { console.log('I vaporized') },
                onCondense: function() { console.log('I condensed') }
            }
        });
        this.fsm.attack();
    },
    onAttack(){

    },
    onAttackAfter(){

    },
    onFinal(){

    },
});
