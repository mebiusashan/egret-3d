module egret3d.GLSL {

    /**
    * @private
    * @class egret3d.ConstVar
    * @classdesc
    * shader中常量类型变量的所有数据
    * 包含变量类型，变量名，变量的值
    *
    * @see egret3d.DefineVar
    *
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class DefineVar extends VarRegister {

        /**
        * @language zh_CN
        * 构造
        * @param name 常量名
        * @param value 常量的值
        */
        constructor(name: string, value: string) {
            super();
            this.name = name;
            this.computeVarName();
            this.key = "#define";
            this.value = value;
        }
    }
}  