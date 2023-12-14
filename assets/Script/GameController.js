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
        ballCannon: cc.Prefab,
        mapPlayer:cc.Node,
        mapEnemy:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Emitter.instance.registerEvent("spawnPrefab", this.spawnPrefab.bind(this))
        Emitter.instance.registerEvent(EVENT_NAME.FINISH_SHOOT,this.checkShootHitShip.bind(this))
        Emitter.instance.registerEvent(EVENT_NAME.CHANGE_SCENE,this.changeScene.bind(this))
    },
    spawnPrefab() {
        let cannonBall = cc.instantiate(this.ballCannon);
        cannonBall.setParent(this.node.parent.parent);
        cannonBall.position = cc.v2(450,0);
    },
    checkShootHitShip(data){
        if(data){
            Emitter.instance.emit(EVENT_NAME.RESET_TURN,this)
        }else{

        }
    },
    changeScene(){
        if(this.mapPlayer.active === true){
            this.mapPlayer.active = false;
            this.mapEnemy.active = true;
        }else{
            this.mapPlayer.active = true;
            this.mapEnemy.active = false;
        }
    }
    // update (dt) {},
});
