module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.ParserEvent3D
    * @classdesc
    * ParserEvent3D 使用ParserUtils加载资源的事件返回对象
    * @see egret3d.Event3D
    * @see egret3d.EventDispatcher
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParserEvent3D extends Event3D {

        /**
         * @language zh_CN
         * PARSER_COMPLETE 常量定义 onParserComplete 事件对象的 type 属性的值。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static PARSER_COMPLETE: string = "onParserComplete";

        /**
        * @language zh_CN
        * 解析对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public parser: ParserUtils;
    }
} 