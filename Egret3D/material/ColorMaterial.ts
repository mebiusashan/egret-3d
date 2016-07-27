module egret3d {
    
    /**
    * @private
    */
    export class ColorMaterial extends MaterialBase {

        constructor( color:number = 0xcccccc ) {
            super();
            this.color = color;
            this.diffuseTexture = CheckerboardTexture.texture;
            this.initMatPass();
        }

        protected initMatPass() {
            this.addPass(PassType.diffusePass);
            this.diffusePass.addMethod(new ColorMethod());
        }

        public set color( value:number ) {
            this.materialData.diffuseColor = value; 
        }

        public get color(): number {
            return this.materialData.diffuseColor;
        }

        public set alpha(value: number) {
            this.materialData.alpha = value; 
        }

        public get alpha(): number {
            return this.materialData.alpha; 
        }
    }
}