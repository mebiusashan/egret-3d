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
            var asset: any = this._loaderDict[url];

            if (!asset) {
                asset = {};
                this._loaderDict[url] = asset;
                asset.loader = new URLLoader(url);
                asset.objects = [];
            }

            var loader: URLLoader = asset.loader;
            if (loader.data) {
                this._loaderEvent.eventType = LoaderEvent3D.LOADER_COMPLETE;
                this._loaderEvent.target = loader;
                this._loaderEvent.loader = loader;
                this._loaderEvent.data = loader.data;
                this._loaderEvent.param = param;

                callback.call(thisObject, this._loaderEvent);

                this._loaderEvent.target = null;
                this._loaderEvent.loader = null;
                this._loaderEvent.data = null;
                this._loaderEvent.param = null;
            }
            else {
                loader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, callback, thisObject, param);
            }

            if (asset.objects.indexOf(thisObject) < 0) {
                asset.objects.push(thisObject);
            }
            return loader;
        }

        public findAsset(url: string): URLLoader {
            var asset: any = this._loaderDict[url];
            if (asset) {
                return asset.loader;
            }
            return null;
        }

        public dispose(object: any) {

            var keys: any[] = [];

            for (var key in this._loaderDict) {
                var data: any = this._loaderDict[key];
                var index: number = data.objects.indexOf(object);
                if (index >= 0) {
                    data.objects.splice(index, 1);
                }

                if (data.objects.length <= 0) {
                    keys.push(key);
                }
            }

            for (var i: number = 0; i < keys.length; ++i) {
                var data: any = this._loaderDict[keys[i]];
                data.loader.dispose();
                data.loader = null;
                data.objects = null;
                delete this._loaderDict[keys[i]];
            }
            keys = null;
        }
    }
}