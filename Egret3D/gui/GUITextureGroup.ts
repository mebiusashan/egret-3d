module egret3d {

    /**
    * @private
    */
    export class GUITextureGroup {
        private _textures: ITexture[];
        private _nextIndex: number = 0;
        public static MAX_COUNT: Number = 8;
        constructor() {
            this._textures = [];
            for (var i: number = 0; i < GUITextureGroup.MAX_COUNT; i++) {
                this._textures[i] = CheckerboardTexture.texture;
            }
        }


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

        public replace(texture: Texture, index: number): Texture {
            if (index < 0 || index >= GUITextureGroup.MAX_COUNT)
                throw new Error("index error");
            var last: Texture = this._textures[index];
            this._textures[index] = texture;
            return last;
        }

        public activeTexture(mesh: QuadMesh): void {
            for (var i: number = 0; i < GUITextureGroup.MAX_COUNT; i++) {
                mesh.setTexture(i, this._textures[i]);
            }
        }










    }

}