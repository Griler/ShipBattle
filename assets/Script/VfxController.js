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
const EVENT_NAME = require("NAME_EVENT")
cc.Class({
    extends: cc.Component,

    properties: {
        bomPrefab: cc.Prefab,
        missPrefab: cc.Prefab,
        explosionShip: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.isHit = false;
        Emitter.instance.registerEvent(EVENT_NAME.PLAY_ANI, this.playAnimation.bind(this));
        this.animation = null;
    },
    playAnimation(data) {
        cc.log(data)
        if (data.isHit) {
            this.isHit = data.isHit
            let bom = cc.instantiate(this.bomPrefab)
            this.animation = bom.getComponent(cc.Animation);
            this.animation.on('finished', function (a) {
                cc.log(a)
                Emitter.instance.emit(EVENT_NAME.IS_SHOOT_SHIP, true);
                //else Emitter.instance.emit(EVENT_NAME.IS_SHOOT_SHIP, false)
                bom.destroy();
            });
            bom.setParent(this.node.parent.parent);
            bom.position = data.worldPosition;
            bom.getComponent(cc.Animation).play('explosion');
            //Emitter.instance.emit(EVENT_NAME.IS_SHOOT_SHIP, true);
        } else {
            let bom = cc.instantiate(this.bomPrefab)
            this.animation = bom.getComponent(cc.Animation);
            this.animation.on('finished', function (a) {
                cc.log(a)
                Emitter.instance.emit(EVENT_NAME.IS_SHOOT_SHIP, false)
                //else Emitter.instance.emit(EVENT_NAME.IS_SHOOT_SHIP, false)
                bom.destroy();
            });
            bom.setParent(this.node.parent.parent);
            bom.position = data.worldPosition;
            bom.getComponent(cc.Animation).play('explosion');
        }
    },
    onAnimationFinished() {
        cc.log(this)
        //this.isHit = data.isHit
        if (this.isHit) Emitter.instance.emit(EVENT_NAME.IS_SHOOT_SHIP, true);
        else Emitter.instance.emit(EVENT_NAME.IS_SHOOT_SHIP, false)
    },
    onDestroy() {
        this.animation.off('finished', this.onAnimationFinished, this);

    },
    start() {

    },

    // update (dt) {},
});
