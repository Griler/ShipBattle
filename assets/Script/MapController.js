// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const Emitter = require("./EventEmitter");
const EVENT_NAME = require("./NAME_EVENT");
cc.Class({
    extends: cc.Component,

    properties: {
        clickCounter: 1,
        coldDownTime: 10,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Emitter.instance.registerEvent(EVENT_NAME.RESET_TURN, this.resetTurn.bind(this))
        cc.tween(this.node)
            .to(2, {scaleX: 2})
            .start()
        cc.tween(this.node)
            .sequence(
            cc.tween().delay(1),
            cc.tween().call(()=>{
                cc.log('data')
                Emitter.instance.emit(EVENT_NAME.COLD_DOWN_CLOCK)})
            ).repeat(10).start()
    },
    resetTurn() {
        cc.log("da rs")
        this.clickCounter = 1;
        this.coldDownTime = 10;
    },
    onEnable() {
        this.clickCounter = 1;
        this.coldDownTime = 10;

    },
    // update (dt) {},
});
