module egret3d {

    export class RoleLoader extends MapLoader {

        public role: Role;

        public constructor(url: string = null) {
            super();
            this.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoaderComplete, this);
            if (url) {
                this.load(url);
            }
        }

        protected onLoaderComplete(e: LoaderEvent3D): void {

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