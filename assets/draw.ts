
import { _decorator, Component, Node, Graphics, log, EffectAsset, Material, Sprite, Animation} from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = draw
 * DateTime = Fri Feb 04 2022 11:57:26 GMT+0800 (中国标准时间)
 * Author = Steven_Greeard
 * FileBasename = draw.ts
 * FileBasenameNoExtension = draw
 * URL = db://assets/draw.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('draw')
export class draw extends Component {
    // [1]
    // dummy = '';

    start () {
        // this._drawSprite();
        this._playDissolveAnimate();
    }

    _playDissolveAnimate(){
        // let aniCom = this.getComponent(Animation);
        // console.log(aniCom);
        // aniCom.play("dissolve_green");
    }

    _drawSprite(){
        // let material = new Material();
        // material.initialize({effectAsset:this.effect,defines:{ USE_TEXTURE:true }});
        // let spriteCom = this.getComponent(Sprite);
        // spriteCom.material=material;
    }

    _drawRect(){
        let graphic = this.getComponent(Graphics);
        graphic!.fillRect(0,0,400,300);
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
