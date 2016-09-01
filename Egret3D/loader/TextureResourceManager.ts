module egret3d {
       /**
    * @private
    * @class egret3d.gui.TextureResourceManager
    * @classdesc
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class TextureResourceManager extends egret3d.EventDispatcher {
        private static _instance: TextureResourceManager;
        private _textureDic: Object;
        private _count: number;
        constructor() {
            super();
            this._textureDic = {};
            this._count = 0;
        }

        public loadTexture(jsonUrl: string, bitmapUrl: string, gui: QuadStage) {

            var jsonArrayParser:Function = (sourceTexture:Texture, jsonData) => {
                var frames = jsonData["frames"];
                for (var i: number = 0; i < frames.length; i++) {
                    var frame = frames[i];
                    var name = frame["filename"];
                    var frameRect = frame["frame"];
                    var tex: Texture = new Texture();
                    tex.copyFromTexture(sourceTexture, frameRect["x"] / sourceTexture.width,
                        frameRect["y"]/sourceTexture.height, frameRect["w"]/sourceTexture.width, frameRect["h"]/sourceTexture.height);
                    tex.width = frameRect['w'];
                    tex.height = frameRect["h"];
                    if (this._textureDic[name]) {
                        console.log("TextureResourceManager::loadTexture, 贴图缓存池里已经有相同名字的贴图. 请检查 ");
                    }
                    this._textureDic[name] = tex;
                }
            }

            this._count++;
            var loadJsonFun: Function = (sourceTex: ITexture) => {

                var jsonLoader: URLLoader = new URLLoader(jsonUrl);
                jsonLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE,
                    e => {
                        sourceTex.useMipmap = false;
                        if (gui) {
                            gui.registerTexture(sourceTex);
                        }
                        jsonArrayParser(sourceTex, JSON.parse(jsonLoader.data));
//                        var jsonData = JSON.parse(jsonLoader.data);
//                        var frames = jsonData['s'];
//                        for (var i: number = 0; i < frames.length; i++) {
//                            var frame = frames[i];
//                            var name: string = frame[0];
//                            var tex: Texture = new Texture();
//                            tex.copyFromTexture(sourceTex, frame[1] / sourceTex.width, frame[2] / sourceTex.height, frame[3] / sourceTex.width, frame[4] / sourceTex.height);
//                            tex.width = frame[3];
//                            tex.height = frame[4];
//                            if (this._textureDic[name]) {
//                                console.log("TextureResourceManager::loadTexture, 贴图缓存池里已经有相同名字的贴图. 请检查 ");
//                            }
//                            this._textureDic[name] = tex;
//                        }
                        this._count--;
                        if (this._count === 0) {
                            this.dispatchEvent(new LoaderEvent3D(LoaderEvent3D.LOADER_COMPLETE));
                        }
                    },
                    this);
            };


            var texLoader: URLLoader = new URLLoader(bitmapUrl);
            texLoader.addEventListener(LoaderEvent3D.LOADER_COMPLETE,
                e => {
                    loadJsonFun(<ITexture>texLoader.data);
                },
                this);
        }

        public getTextureDic(): Object {
            return this._textureDic;
        }

        public getTexture(name: string): Texture {
            return <Texture>this._textureDic[name];
        }

        public static getInstance(): TextureResourceManager {
            if (!this._instance) {
                this._instance = new TextureResourceManager();
            }
            return this._instance;
        }
    }
}
