import { _decorator, Component, Node, Sprite, Material, RenderTexture, v2, UITransform, SpriteFrame, isValid, Camera, color, Layers, view, v3, Canvas, find, Texture2D } from 'cc';
import { DEV } from 'cc/env';


/**
 * 实例：Kawase 模糊（多 Pass）
 * @author 陈皮皮 (ifaswind)
 * @version 20211208
 * @see Case_MultipassKawaseBlur.ts https://gitee.com/ifaswind/eazax-cases/blob/master/assets/cases/multipassKawaseBlur/scripts/Case_MultipassKawaseBlur.ts
 * @see eazax-kawase-blur.effect https://gitee.com/ifaswind/eazax-ccc/blob/master/resources/effects/eazax-kawase-blur.effect
 * @see RenderUtil.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/utils/RenderUtil.ts
 */

const { ccclass, property } = _decorator;
@ccclass('MultipassKawaseBlur')
export class MultipassKawaseBlur extends Component {


    @property({ type: Sprite, tooltip: DEV && '精灵组件' })
    protected sprite: Sprite = null;

    @property({ type: Material, tooltip: DEV && '渲染用的材质' })
    protected material: Material = null;

    @property(Camera)
    camera:Camera = null;

    @property(RenderTexture)
    public render: RenderTexture = null!;
    /**
     * 正在使用的 RenderTexture
     */
    protected renderTexture: RenderTexture = null;

    private _spriteFrame:SpriteFrame = null;
    private dstTexture: Texture2D;
    private sp : SpriteFrame;

    // update (deltaTime: number) {
    //     let src = this.renderTexture;
    //     if (src) {
    //         let pbuffer = src.readPixels();
    //         console.log("121212",pbuffer);
    //         this.dstTexture.uploadData(pbuffer);
    //     }
    //     // this.sp.texture = this.dstTexture;
    //     this.sprite.spriteFrame.texture = this.dstTexture;
    //     // this.sprite.updateMaterial();
    // }

    onCapture(){
        console.log("1212121",this._spriteFrame);
        this.sprite.getComponent(UITransform).contentSize = view.getVisibleSize();
        this.sprite.spriteFrame = this._spriteFrame;
    }

    /**
     * 生命周期：开始（首次 update 前）
     */
    protected start() {
        // 目标节点
        const sprite = this.sprite,
        node = this.sprite.node;

        // const renderTex = this.renderTexture = new RenderTexture();
        // const size = view.getVisibleSize();
        // renderTex.reset({
        //     width: size.width,
        //     height: size.height,
        // });

        // const cameraComp = this.camera!;
        // cameraComp.targetTexture = renderTex;

        // this.renderTexture = this.getRenderTexture(find('Canvas'));
        // sp.texture = this.renderTexture;
        // this.sprite.spriteFrame = this.renderTexture;

        // this.dstTexture = new Texture2D();
        // this.dstTexture.reset({
        //     width: sp.width,
        //     height: sp.height,
        //     format: Texture2D.PixelFormat.RGBA8888,
        //     mipmapLevel: 0
        // });

        // cameraComp.targetTexture = null;

        
        
        // 设置材质
        // const material = this.material;
        // const size = node.getComponent(UITransform).contentSize;
        // material.setProperty('resolution', v2(size.width, size.height));
        // // 创建临时 RenderTexture
        // // const srcRT = new RenderTexture(),
        // let dstRT = this.renderTexture = new RenderTexture();
        // dstRT.reset({
        //     width:view.getVisibleSize().width,
        //     height:view.getVisibleSize().height
        // });

        // const sp = new SpriteFrame();
        // const spriteFrame = this.sprite.spriteFrame!;
        // sp.reset({
        //     originalSize: spriteFrame.originalSize,
        //     rect: spriteFrame.rect,
        //     offset: spriteFrame.offset,
        //     isRotate: spriteFrame.rotated,
        //     borderTop: spriteFrame.insetTop,
        //     borderLeft: spriteFrame.insetLeft,
        //     borderBottom: spriteFrame.insetBottom,
        //     borderRight: spriteFrame.insetRight,
        // })
        // // this.renderTexture = dstRT;
  
        // this.camera.targetTexture = dstRT;
        // sp.texture = dstRT;
        // sprite.spriteFrame = sp;
        // 获取初始 RenderTexture
        // this.getRenderTexture(node, srcRT);
        // 多 Pass 处理
        // 注：由于 OpenGL 中的纹理是倒置的，所以双数 Pass 的出的图像是颠倒的
        // this.renderWithMaterial(srcRT, dstRT, material);
        // this.renderWithMaterial(dstRT, srcRT, material);
        // this.renderWithMaterial(srcRT, dstRT, material);
        // this.renderWithMaterial(dstRT, srcRT, material);
        // this.renderWithMaterial(srcRT, dstRT, material);
        // 使用经过处理的 RenderTexture
        // console.log("srcRT",srcRT);
        // this.renderTexture = dstRT;
        // sprite.spriteFrame = new SpriteFrame();
        // sprite.spriteFrame.texture = this.renderTexture;
        // 销毁不用的临时 RenderTexture
        // srcRT.destroy();
    }

    /**
     * 生命周期：销毁
     */
    protected onDestroy(): void {
        // 销毁不用的 RenderTexture
        this.renderTexture && this.renderTexture.destroy();
    }

    /**
     * 获取节点的 RenderTexture
     * @param node 节点
     * @param out 输出
     * @see RenderUtil.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/utils/RenderUtil.ts
     */
    protected getRenderTexture(node: Node, out?: RenderTexture) {
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
        const camera = cameraNode.addComponent(Camera);
        camera.clearFlags |= Camera.ClearFlag.SOLID_COLOR;//ClearFlags.COLOR;
        camera.clearColor = color(0, 0, 0, 0);
        camera.projection = Camera.ProjectionType.ORTHO;
        const pos = node.position;
        camera.node.setPosition(v3(pos.x,pos.y,1000))
        // 将节点渲染到 RenderTexture 中
        camera.targetTexture = out;
        camera.visibility = Layers.Enum.ALL;
        // 销毁临时对象
        cameraNode.destroy();
        // 返回 RenderTexture
        return out;
    }

    /**
     * 使用指定材质来将 RenderTexture 渲染到另一个 RenderTexture
     * @param srcRT 来源
     * @param dstRT 目标
     * @param material 材质
     * @see RenderUtil.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/utils/RenderUtil.ts
     */
    protected renderWithMaterial(srcRT: RenderTexture, dstRT: RenderTexture | Material, material?: Material) {
        // 检查参数
        if (dstRT instanceof Material) {
            material = dstRT;
            dstRT = new RenderTexture();
        }
        // 创建临时节点（用于渲染 RenderTexture）
        const tempNode = new Node();
        tempNode.setParent(find('Canvas'));
        const tempSprite = tempNode.addComponent(Sprite);
        tempSprite.sizeMode = Sprite.SizeMode.RAW;
        tempSprite.trim = false;
        tempSprite.spriteFrame = new SpriteFrame();
        tempSprite.spriteFrame.texture = srcRT;
        // 获取图像宽高
        const width = srcRT.width,
            height = srcRT.height;
        // 初始化 RenderTexture
        dstRT.initialize({width, height});
        // 更新材质
        if (material instanceof Material) {
            tempSprite.setMaterial(material,0);
        }
        // 创建临时摄像机（用于渲染临时节点）
        const cameraNode = new Node();
        cameraNode.setParent(tempNode);
        const camera = cameraNode.addComponent(Camera);
        camera.clearFlags |= Camera.ClearFlag.SOLID_COLOR;
        camera.clearColor = color(0, 0, 0, 0);
        // camera.zoomRatio = winSize.height / height;
        const winSize = view.getVisibleSize();
        const pos = camera.node.position;
        camera.node.setPosition(v3(pos.x,pos.y,1000))
        // 将临时节点渲染到 RenderTexture 中
        camera.targetTexture = dstRT;
        // camera.render(tempNode);
        // camera.visibility=Layers.Enum.UI_2D;
        // tempNode.layer = Layers.Enum.UI_2D;
        // 销毁临时对象
        cameraNode.destroy();
        tempNode.destroy();
        // 返回 RenderTexture
        return dstRT;
    }
}

