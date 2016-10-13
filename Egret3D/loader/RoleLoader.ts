module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.RoleLoader
    * @classdesc
    * 加载角色
    * @see egret3d.MapLoader
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class RoleLoader extends MapLoader {

        public role: Role;

        /**
        * @language zh_CN
        * 构造
        * @param url 角色文件路径
        * @version Egret 3.0
        * @platform Web,Native
        */
        public constructor(url: string = null) {
            super(url);
        }

        /**
        * @language zh_CN
        * 加载角色
        * @param url 角色文件路径
        * @version Egret 3.0
        * @platform Web,Native
        */
        public load(url: string) {
            super.load(url);
            this.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoaderComplete, this);
        }

        protected onLoaderComplete(e: LoaderEvent3D): void {
            this.removeEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoaderComplete, this);

            this.role = new Role();

            for (var id in this.skinClipDict) {

                this.role.skeletonAnimation = this.skinClipDict[id];

                break;
            }

            var childs: Object3D[] = this.container.childs;

            for (var i: number = 0; i < childs.length; ) {

                var obj: Object3D = childs[i];

                this.container.removeChild(obj);

                this.role.addChild(obj);
            }
        }
    }
}