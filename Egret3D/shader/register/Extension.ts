module egret3d.GLSL {
    
    /**
    * @private
    * @class egret3d.Extension
    * @classdesc
    * 变量属性
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Extension extends VarRegister {
        
        /**
        * @language zh_CN
        * constructor
        * @param name
        * @param valueType
        */
        constructor(name: string) {
            super();
            this.name = name;
            this.computeVarName();
            this.key = "#extension";
        }
    }
} 