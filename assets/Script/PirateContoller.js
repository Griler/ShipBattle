const Emitter = require("EventEmitter")
var StateMachine = require('javascript-state-machine');
const EVENT_NAME = require("NAME_EVENT")
cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad() {
        this._onAttack = this.onAttack.bind(this)
        //this._onAttackAfter = this.onAttackAfter.bind(this)
        //._onFinal = this.onFinal.bind(this)
        this._onAttackToAttack = this.onAttackToAttack.bind(this)
        Emitter.instance.registerEvent(EVENT_NAME.IS_SHOOT_SHIP, this.handleState.bind(this))
        this.fsm = new StateMachine({
            init: 'init',
            transitions: [
                {name: 'attack', from: ['init', 'changeScene'], to: 'attackState'},
                {name: 'attackAfter', from: 'attackState', to: 'afterAttackState'},
                //{name: 'final', from: 'attackState', to: 'changeScene'},
                {name: 'attackToAttack', from: 'attackState', to: 'attackState'},
            ],
            methods: {
                onAttack: this._onAttack,
                //onAttackAfter: this._onAttackAfter,
                onFinal: this._onFinal,
                onAttackToAttack: this._onAttackToAttack,
                //onLeaveChangeScene: this.onLeaveChangeScene.bind(this)
            }
        });
        this.fsm.attack();
    },
    onAttack() {
        let talkString = this.node.children[0].children[0].getComponent(cc.Label);
        talkString.string = "SHOOTING SHIP ENEMY"
    }, onAttackAfter() {

    },
    onFinal() {
        let talkString = this.node.children[0].children[0].getComponent(cc.Label);
        let arrayTalking = {CB: "CHICKEN BOYS", YT: "YOURS TURN HAS FINISHED"}
        cc.tween(talkString.node)
            .call(() => {
                talkString.string = arrayTalking.CB
            })
            .delay(1)
            .call(() => {
                talkString.string = arrayTalking.YT
            })
            .delay(1)
            .call(() => {
                //Emitter.instance.emit(EVENT_NAME.CHANGE_SCENE, true)
                this.fsm.attack();
            })
            .start()
    },
    /*onLeaveChangeScene() {
        cc.log(this.fsm.state);
        this.fsm.attack();

    },*/
    onAttackToAttack() {
        cc.log(this.node.children[0].children[0])
        let talkString = this.node.children[0].children[0].getComponent(cc.Label);
        let arrayTalking = {GB: "GOOD BOYS", HASHIT: "U HAS HIT ENEMY SHIP", SA: "SHOOT AGAIN"};
        cc.tween(talkString.node)
            .call(() => {
                talkString.string = arrayTalking.GB
            })
            .delay(1)
            .call(() => {
                talkString.string = arrayTalking.HASHIT
            })
            .delay(1)
            .call(() => {
                talkString.string = arrayTalking.SA
            })
            .start()
    },

    handleState(data) {
        cc.log("pre" + data)
        if (data) {
            this.fsm.attackToAttack();
        } else {
            cc.log("hello")
            this.fsm.final();
        }
    }
});
