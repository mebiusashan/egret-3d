module egret3d {
    /**
    * @private
    */
    export class AssetEvent {
        public callback: Function;
        public thisObject: any;
        public param: any;
    }
    /**
    * @private
    */
    export class AssetManager {
        private _loaderDict: any = {};

        public findAsset(url: string): URLLoader {
            return this._loaderDict[url];
        }

        public dispatchTask(url: string, dataformat: string = null): URLLoader {
            if (!this._loaderDict[url]) {
                var loader: URLLoader = new URLLoader(url, dataformat);
                loader.addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onComplete, this);
                this._loaderDict[url] = loader;
            }
            return this._loaderDict[url];
        }

        public dispatchEvent(loader:URLLoader, callback: Function, thisObject: any, param: any) {
            var assetEvent: AssetEvent = new AssetEvent();
            assetEvent.callback = callback;
            assetEvent.thisObject = thisObject;
            assetEvent.param = param;
            var assetEventList: Array<AssetEvent> = loader["assetEventList"];
            if (!assetEventList) {
                assetEventList = new Array<AssetEvent>();
                loader["assetEventList"] = assetEventList;
            }

            assetEventList.push(assetEvent);
        }

        private onComplete(e: LoaderEvent3D) {
            e.loader.removeEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onComplete, this);
            var assetEventList: Array<AssetEvent> = e.loader["assetEventList"];
            if (assetEventList) {
                for (var i: number = 0; i < assetEventList.length; ++i) {
                    var assetEvent: AssetEvent = assetEventList[i];
                    assetEvent.callback.call(assetEvent.thisObject, e.loader, assetEvent.param);
                }
                assetEventList.length = 0;
            }
        }
    }
}