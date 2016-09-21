module egret3d {

    /**
    * @private
    */
    export class QuadMesh extends Mesh {
        public startQuad: number = 0;
        public numberQuad: number = 0;

        public id: number; 
        public quadList: Quad[] = [];
        public finalList: Quad[] ;


        public uiMaterial: TextureMaterial;
        public guiMethod: GUIMethod;
        constructor(start :number ) {
            super(new Geometry(), new TextureMaterial());

            this.startQuad = start;
            this.numberQuad = QuadStage.moreQuad;

            this.geometry.drawType = Context3DProxy.gl.DYNAMIC_DRAW;
            QuadData.buildGeometry(this.geometry, start , QuadStage.moreQuad);

            this.guiMethod = new GUIMethod();
            this.enableCulling = false;
            this.uiMaterial = this.material as TextureMaterial;
            this.uiMaterial.blendMode = BlendMode.ALPHA;
            this.uiMaterial.repeat = true ;
            this.uiMaterial.diffusePass.addMethod(this.guiMethod);

     

            this.canPick = false;
            this.tag.name = "gui";
        }

     
        //改变贴图
        public setTexture(index: number,texture:ITexture) {
            this.guiMethod.setTextures(index, texture);
        }



    } 
}