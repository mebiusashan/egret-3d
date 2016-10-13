module egret3d {
    export class QuenLoad extends EventDispatcher {
        static QUENLOAD_COMPLETE: string = "QUENLOAD_COMPLETE"; 

        private _loadList: URLLoader[];
        private _loadMap: { [url: string]: URLLoader }
        private _textures: { [name: string]: Texture };
        private _geometrys: { [name: string]: Geometry };
        private _string: {[name:string]:string};

        private _loadCount: number = 0; 
        constructor() {
            super();
            this._loadMap = {};
            this._textures = {}; 
            this._geometrys = {}; 
            this._loadList = []; 
            this._string = {}; 
        }

        public addLoaderQuen(url: string) {
            if (this._loadMap[url]) return;

            var load: URLLoader = new URLLoader();
            this._loadMap[url] = load; 
            load.addEventListener(LoaderEvent3D.LOADER_COMPLETE,  this.loadComplete , this );
            load.load(url);
            this._loadList.push(load);
        }

        public getTexture(url: string): ITexture {
            return this._textures[url];
        }

        public getModel(url: string): Geometry {
            return this._geometrys[url];
        }

        public getString(url: string): string {
            return this._string[url];
        }

        private loadComplete(e: LoaderEvent3D) {
            if (e.loader.data instanceof ITexture) {
                this._textures[e.loader.url] = <ITexture>e.loader.data;
            } else if (e.loader.data instanceof Geometry) {
                this._geometrys[e.loader.url] = <Geometry>e.loader.data;
            } else if (<string>e.loader.data) {
                this._string[e.loader.url] = e.loader.data;
            }
            this.checkAllComplete();
        }

        private checkAllComplete() {
            this._loadCount++;
            if (this._loadCount == this._loadList.length) {
                this.dispatchEvent(new LoaderEvent3D(QuenLoad.QUENLOAD_COMPLETE) );
            }
        }
    }
}