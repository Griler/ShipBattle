// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const Emitter = require("EventEmitter")
cc.Class({
    extends: cc.Component,

    properties: {
        ballCannon: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Emitter.instance.registerEvent("spawnPrefab", this.spawnPrefab.bind(this))
    },
    spawnPrefab() {
        let cannonBall = cc.instantiate(this.ballCannon);
        cannonBall.setParent(this.node.parent.parent);
        cannonBall.position = cc.v2(450,0);
    },
    start() {

    },

    // update (dt) {},
});
