import { _decorator, Component, Node, UITransform, RenderTexture, isValid, Camera, color, v3, Layers, find, Sprite, SpriteFrame, Texture2D, view, ImageAsset, game } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CaptureScreen')
export class CaptureScreen extends Component {

    @property(Sprite)
    sprite:Sprite = null;

    private _renderTexture:RenderTexture = null;
    private _texture2D:Texture2D = null;
    private _buffer:Uint8Array = null;
    private _image:ImageAsset = null;

    start() {

    }

    update(deltaTime: number) {
        // if (!this._buffer){
            // let src = this._renderTexture;
            // if (src) {
                // let pbuffer = src.readPixels();
                // this._buffer = pbuffer;
                // const asset = new ImageAsset();
                // asset.reset({
                //     _data:this._buffer,
                //     _compressed:false,
                //     width: view.getVisibleSize().width,
                //     height: view.getVisibleSize().height,
                //     format:Texture2D.PixelFormat.RGBA8888,
                // })
                // this._image = asset;
                // this._texture2D.image = this._image;
                // console.log("1212");
                // this._texture2D.uploadData(this._buffer);
                // this.sprite.spriteFrame.texture = this._texture2D;
            // }
            
        // }

            
            // console.log("121212",this._buffer);

        // this.sp.texture = this.dstTexture;
        
    }

    onCapture(){
        // this._texture2D = new Texture2D();
        // this._texture2D.reset({
        //     width: view.getVisibleSize().width,
        //     height: view.getVisibleSize().height,
        //     format: Texture2D.PixelFormat.RGBA8888,
        //     mipmapLevel: 0
        // });
        // this._renderTexture = this.getRenderTexture();
        // this.sprite.spriteFrame.texture = this._renderTexture;

        // this._capture1();
        this._capture2();
    }

    private _capture1(){
        const spriteFrame = this.sprite.spriteFrame!;
        const sp = new SpriteFrame();
        sp.reset({
            originalSize: spriteFrame.originalSize,
            rect: spriteFrame.rect,
            offset: spriteFrame.offset,
            isRotate: spriteFrame.rotated,
        });
        this._renderTexture = this.getRenderTexture();
        sp.texture = this._renderTexture;

        this.sprite.spriteFrame = sp;
    }

    private _capture2(){
        // let texture = new RenderTexture();
        // const texture.reset(view.getVisibleSize());
        setTimeout(() => {
            const texture = this.getRenderTexture();
            let newSpFrame = new SpriteFrame();
            newSpFrame.texture = texture;
            this.sprite.spriteFrame = newSpFrame;
            game.step();
        }, 0);
  
        // this.camera.targetTexture = null;
    }

    /**
    * 获取节点的 RenderTexture
    * @param node 节点
    * @param out 输出
    * @see RenderUtil.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/utils/RenderUtil.ts
    */
    protected getRenderTexture(node: Node = null, out?: RenderTexture) {
        if (!node){
            node = find('Canvas');
        }
        // 检查参数
        if (!isValid(node)) {
            return null;
        }
        if (!out || !(out instanceof RenderTexture)) {
            out = new RenderTexture();
        }
        // 获取宽高
        const size = node.getComponent(UITransform).contentSize;
        const width = Math.floor(size.width),
        height = Math.floor(size.height);
        // 初始化 RenderTexture
        out.initialize({width, height});
        // 创建临时摄像机用于渲染目标节点
        const cameraNode = new Node();
        cameraNode.parent = node;

        const mainCamera = find('Canvas/Camera').getComponent(Camera);
        const camera = cameraNode.addComponent(Camera);
        camera.clearFlags |= Camera.ClearFlag.DEPTH_ONLY;//ClearFlags.COLOR;
        camera.clearColor = color(0, 0, 0, 0);
        camera.projection = Camera.ProjectionType.ORTHO;
        camera.orthoHeight = mainCamera.orthoHeight;
        camera.node.setPosition(v3(0,0,1000));

        // 将节点渲染到 RenderTexture 中
        camera.targetTexture = out;
        camera.visibility = Layers.Enum.UI_2D | Layers.Enum.UI_3D;
        camera.priority = mainCamera.priority + 1;
        // 销毁临时对象
        setTimeout(() => {
            cameraNode.destroy();
        }, 0);
        // 返回 RenderTexture
        return out;
    }
}

