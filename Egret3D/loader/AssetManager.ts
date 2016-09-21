module egret3d {
    ///**
    //* @private
    //*/
    //export class AssetEvent {
    //    public callback: Function;
    //    public thisObject: any;
    //    public param: any;
    //}
    /**
    * @private
    */
    export class AssetManager {

        private static _instance: AssetManager;
        public static get instance(): AssetManager {
            if (!AssetManager._instance) {
                AssetManager._instance = new AssetManager();
            }
            return AssetManager._instance;
        }

        private _loaderDict: any = {};

        private _loaderEvent: LoaderEvent3D = new LoaderEvent3D();


        public loadAsset(url: string, callback: Function, thisObject: any, param: any = null): URLLoader {
            var loader: URLLoader = this._loaderDict[url];
            if (!loader) {
                loader = new URLLoader(url);
                this._loaderDict[url] = loader;
                loader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, callback, thisObject, param);
            }
            else {
                if (loader.data) {
                    this._loaderEvent.eventType = LoaderEvent3D.LOADER_COMPLETE;
                    this._loaderEvent.loader = loader;
                    this._loaderEvent.data = loader.data;
                    this._loaderEvent.param = param;
                    callback.call(thisObject, this._loaderEvent);
                }
                else {
                    loader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, callback, thisObject, param);
                }
            }

            return this._loaderDict[url];
        }

        public findAsset(url: string): URLLoader {
            return this._loaderDict[url];
        }

    }
}