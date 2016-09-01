module egret3d.gui {
       /**
    * @private
    */
    export class BitmapFont {
        private static _fontTextures: any;
        constructor() {
        }

        static load(data: any) {
            this._fontTextures = data;
        }

        static getTexture(unicode: number): Texture {
            var texture: Texture = this._fontTextures[unicode]; 
            return texture;
        }
    }
}