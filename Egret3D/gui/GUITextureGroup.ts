module egret3d {

    /**
    * @private
    */
    export class GUITextureGroup {
        private _textures: ITexture[];
        private _nextIndex: number = 0;
        public static MAX_COUNT: Number = 7;
        constructor() {
            this._textures = [];
            for (var i: number = 0; i < GUITextureGroup.MAX_COUNT; i++) {
                this._textures[i] = CheckerboardTexture.texture;
            }
        }



        /**
        * @language zh_CN
        * 注册一张UI贴图，最多支持7张
        * @param texture 将要注册的贴图
        * @return boolean 是否注册成功
        * @version Egret 3.0
        * @platform Web,Native
        */
        public register(texture: Texture): boolean {
            if (this._nextIndex >= GUITextureGroup.MAX_COUNT)
                return false;
            if (this._textures.indexOf(texture) >= 0)
                return false;
            this._textures[this._nextIndex] = texture;
            texture.guiIndex = this._nextIndex;
            this._nextIndex++;
            return true;
        }

        /**
        * @language zh_CN
        * 替换一张UI贴图至指定下标位置
        * @param texture 将要注册的贴图
        * @param index 指定下标位置
        * @return boolean 是否注册成功
        * @version Egret 3.0
        * @platform Web,Native
        */
        public replace(texture: Texture, index: number): Texture {
            if (index < 0 || index >= GUITextureGroup.MAX_COUNT)
                throw new Error("index error");
            var last: Texture = this._textures[index];
            this._textures[index] = texture;
            return last;
        }

        /**
        * @language zh_CN
        * 渲染之前，将贴图信息绑定至mesh中
        * @param mesh 绑定至目标mesh对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public activeTexture(mesh: QuadMesh): void {
            for (var i: number = 0; i < GUITextureGroup.MAX_COUNT; i++) {
                mesh.setTexture(i, this._textures[i]);
            }
        }










    }

}