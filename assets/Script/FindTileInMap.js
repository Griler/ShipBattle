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
        spritePrefab: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.on("mousedown", this.onMouseDown, this)
        this.hasShotInTile = false;
        this.clickCount = 1;
        this.mousePosition = cc.v2(0, 0);
        for (let i = 1; i < 82; i++) {
            let childNode = cc.instantiate(this.spritePrefab);
            if (i % 2 === 0) {
                childNode.getComponent("Tile").hasShip = true;
            }
            childNode.setParent(this.node)
        }
        for (let child of this.node.getChildren()) {
            child.on(cc.Node.EventType.MOUSE_ENTER, this.onHoverChild, this);
            child.on(cc.Node.EventType.MOUSE_LEAVE, this.onLeftHoverChild, this);
        }
        //Emitter.instance.registerEvent("takePosition", this.onClick.bind(this));
        cc.tween(this.node)
            .to(2, {scaleX: 1.5})
            .start()
    },

    onClick(data) {
        if (this.hasShotInTile) return;
        if (this.node.getBoundingBoxToWorld().contains(data)) {
            let clickedChildNode = this.findClickedChildNode(this.node, data);
            if (clickedChildNode === null) return;
            if (clickedChildNode.getComponent("Tile").hasShoot) return;
            else {
                let worldPosition = clickedChildNode.parent.convertToWorldSpaceAR(clickedChildNode.position);
                cc.log("tile " + worldPosition)
                let targetNode = {
                    positionToTarget: worldPosition,
                    targetTile: clickedChildNode
                }
                clickedChildNode.getComponent("Tile").hasShoot = true;
                Emitter.instance.emit("spawnPrefab")
                Emitter.instance.emit("attackToPosition", targetNode)
            }

        }
    },

    onHoverChild(data) {
        let isShoot = data.currentTarget.getComponent("Tile").hasShoot;
        if (!isShoot) data.currentTarget.color = cc.Color.GREEN;

    },

    onLeftHoverChild(data) {
        cc.log(data.currentTarget.getComponent("Tile").hasShoot);
        let isShoot = data.currentTarget.getComponent("Tile").hasShoot;
        if (isShoot) return;
        data.currentTarget.color = cc.Color.WHITE;
    },

    findClickedChildNode(parentNode, localPos) {
        for (let i = 0; i < parentNode.children.length; i++) {
            let childNode = parentNode.children[i];
            if (childNode.getBoundingBoxToWorld().contains(localPos)) {
                return childNode;
            }
        }
        return null;
    },

    onMouseDown(event) {
        if (event.getButton() !== cc.Event.EventMouse.BUTTON_LEFT || this.clickCount === 0) return;
        this.mousePosition = event.getLocation();
        this.clickCount = 0;
        this.onClick(this.mousePosition)
        event.stopPropagation();
    },

    onEnable(){
        this.clickCount = 1;
    }
});
