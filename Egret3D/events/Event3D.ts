module egret3d {
    /**
   * @language zh_CN
   * @class egret3d.Event3D
   * @classdesc
   * Event3D 类作为创建 Event3D 对象的基类，当发生事件时，Event3D 对象将作为参数传递给事件侦听器。Event3D 类的属性包含有关事件的基本信息，例如事件的类型。对于许多事件（如由 Event3D 类常量表示的事件），此基本信息就足够了。但其他事件可能需要更详细的信息。例如，与鼠标单击关联的事件需要包括有关单击事件的位置以及在单击事件期间是否按下了任何键的其他信息。您可以通过扩展 Event3D 类（MouseEvent 类执行的操作）将此类其他信息传递给事件侦听器。
   * @version Egret 3.0
   * @platform Web,Native
   */
    export class Event3D {

        ///**
        //* @language zh_CN
        //* COMPLETE 常量定义 相关完成事件。
        //* @version Egret 3.0
        //* @platform Web,Native
        //*/
        //static COMPLETE: string = "complete";

        ///**
        //* @language zh_CN
        //* CHANGE_PROPERTY 常量定义 changeProperty 事件对象的 type 属性的值。
        //* @version Egret 3.0
        //* @platform Web,Native
        //*/
        //static CHANGE: string = "change";

        /**
        * @language zh_CN
        * ENTER_FRAME 定义 时实 更新tick。
        * @version Egret 3.0
        * @platform Web,Native
        */
        static ENTER_FRAME: string = "enter_frame";

        /**
        * @language zh_CN
        * RESIZE 定义 修改大小时发生。
        * @version Egret 3.0
        * @platform Web,Native
        */
        static RESIZE: string = "resize";

        //----------------------------------------------------
        //----------------------------------------------------
        //----------------------------------------------------


        /**
        * @language zh_CN
        * 事件目标。
        * @param value {any}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public target: any;

        /**
        * @language zh_CN
        * 3D引擎中的事件的类型
        * @returns {any}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public eventType: string;

        /**
        * @language zh_CN
        * 附加数据。
        * @returns {string}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public data: any;
         
        /**
        * @language zh_CN
        * 当前时间。
        * @returns {number}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public time: number = 0;
      
        /**
        * @language zh_CN
        * 每帧延时。
        * @returns {number}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public delay: number = 0;

        /**
        * @language zh_CN
        * 创建一个作为参数传递给事件侦听器的 Event3D 对象。
        * @param typeName string 事件类型
        * @param data {any}附加数据(可选)
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(eventType: string = null, data: any = null) {
            this.eventType = eventType;
            this.data = data;
        }
    }
}