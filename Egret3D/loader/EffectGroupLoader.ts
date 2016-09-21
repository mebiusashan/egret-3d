module egret3d {
    /**
    * @language zh_CN
    * @class egret3d.EffectGroupLoader
    * @classdesc
    * 加载egret特效
    * 用于加载和解析egret特效的类，继承自MapLoader.
    * 加载完毕后，会创建一个EffectGroup对象，用于从container中提取含有animation的节点
    * 通过控制EffectGroup达到控制动画播放的目的
    *
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class EffectGroupLoader extends MapLoader {
        private _effectGroup: EffectGroup;
        public constructor(url:string = null) {
            super(url);
            this.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onResourceLoaded, this);
       
        }

        private onResourceLoaded(e: LoaderEvent3D): void {
            this.removeEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onResourceLoaded, this);
            this._effectGroup = new EffectGroup(this.container);
        }

        /**
        * @language zh_CN
        * 获得EffectGroup对象引用
        * @return EffectGroup对象，可控制特效的播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get effectGroup(): EffectGroup {
            return this._effectGroup;
        }

    }
}