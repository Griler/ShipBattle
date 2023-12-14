// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
//const Emitter = require("EventEmitter")
cc.Class({
    extends: cc.Component,

    properties: {
        hasShoot: {
            default: false
        },
        hasShip: false,
    },
    onLoad() {
    },
    // LIFE-CYCLE CALLBACKS:

    start() {
        // Emitter.instance.registerEvent('playAnimation',this.playAnimationAndSound.bind(this));
    },
    playAnimationAndSound() {
        //cc.log(this.hasShip)
        if (this.hasShip) {
            let animation = this.node.children[0].getComponent(cc.Animation)
            animation.play('explosion')
        }
        else{
            let animation = this.node.children[0].getComponent(cc.Animation)
            //animation.play('water')
        }

    },
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // update (dt) {},
});
